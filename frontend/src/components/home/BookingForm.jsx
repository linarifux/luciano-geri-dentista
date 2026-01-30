import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, Calendar as CalendarIcon
} from 'lucide-react';
import API from '../../services/api';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  eachDayOfInterval, isSameMonth, isSameDay, isToday, 
  isBefore, startOfToday, getDay 
} from 'date-fns';
import { it } from 'date-fns/locale';

const DOCTORS_DATA = [
  { id: 'dr-riccardo', name: 'Dr. Riccardo Rosselli Del Turco', avatar: 'RR', services: ['Igiene Dentale', 'Visita di Controllo'] },
  { id: 'dr-cecilia', name: 'Dott.ssa Cecilia Geri', avatar: 'CG', services: ['Visita Ortodontica'] },
  { id: 'dr-luciano', name: 'Dr. Luciano Geri', avatar: 'LG', services: ['Implantologia', 'Estetica Dentale', 'Altro'] }
];

const ALL_SERVICES = ['Igiene Dentale', 'Visita di Controllo', 'Visita Ortodontica', 'Implantologia', 'Estetica Dentale'];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    service: '', doctor: null, date: '', time: '',
    name: '', email: '', phone: '', message: ''
  });

  // Calendar View State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Filter Doctors
  const availableDoctors = DOCTORS_DATA.filter(doc => doc.services.includes(formData.service));

  // Fetch Slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.date || !formData.doctor) return;
      setLoadingSlots(true);
      setFormData(prev => ({ ...prev, time: '' })); 
      try {
        // Simulating API delay for UI testing
        setTimeout(() => setAvailableSlots(['09:00', '09:30', '10:00', '11:30', '15:00', '16:30']), 500);
      } catch (err) {
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [formData.date, formData.doctor]);

  // Handlers
  const nextStep = () => { setDirection(1); setStep(p => p + 1); };
  const prevStep = () => { setDirection(-1); setStep(p => p - 1); };

  const handleSelectService = (service) => {
    setFormData({ ...formData, service, doctor: null, date: '', time: '' });
    nextStep();
  };

  const handleSelectDoctor = (doctor) => {
    setFormData({ ...formData, doctor });
    nextStep();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    try {
      await API.post('/appointments', { ...formData, doctor: formData.doctor?.name });
      setStatus({ loading: false, success: true, error: null });
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Errore durante la prenotazione." });
    }
  };

  // --- CALENDAR LOGIC ---
  const renderCalendar = () => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    const firstDayIndex = getDay(startOfMonth(currentMonth));
    const emptyDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1; 
    const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-dark transition-colors">
                <ChevronLeft size={18} />
            </button>
            <h4 className="font-black text-dark capitalize text-lg">
                {format(currentMonth, 'MMMM yyyy', { locale: it })}
            </h4>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-dark transition-colors">
                <ChevronRight size={18} />
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                    {day}
                </div>
            ))}
            
            {Array.from({ length: emptyDays }).map((_, i) => <div key={`empty-${i}`} />)}

            {daysInMonth.map((day) => {
                const isSelected = formData.date === format(day, 'yyyy-MM-dd');
                const isPast = isBefore(day, startOfToday());
                
                return (
                    <button
                        key={day.toString()}
                        disabled={isPast}
                        onClick={() => setFormData({ ...formData, date: format(day, 'yyyy-MM-dd') })}
                        className={`
                            h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                            ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 z-10' : ''}
                            ${!isSelected && !isPast ? 'text-gray-700 hover:bg-primary/10 hover:text-primary' : ''}
                            ${isPast ? 'text-gray-200 cursor-not-allowed' : ''}
                            ${isToday(day) && !isSelected ? 'border border-primary text-primary' : ''}
                        `}
                    >
                        {format(day, 'd')}
                        {isSelected && <motion.div layoutId="selectedDay" className="absolute inset-0 rounded-full border-2 border-white/20" />}
                    </button>
                );
            })}
        </div>
      </div>
    );
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -50 : 50, opacity: 0 })
  };

  // --- SUCCESS VIEW ---
  if (status.success) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-16 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/30">
          <CheckCircle2 size={40} />
        </motion.div>
        <h4 className="text-3xl font-black text-dark mb-4 uppercase tracking-tighter">Prenotazione Confermata!</h4>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Grazie {formData.name}, ti aspettiamo il <strong>{format(new Date(formData.date), 'd MMMM', {locale:it})}</strong> alle <strong>{formData.time}</strong>.
        </p>
        <button onClick={() => window.location.reload()} className="text-primary font-bold uppercase tracking-widest text-xs hover:underline">
          Nuova Prenotazione
        </button>
      </div>
    );
  }

  return (
    // FIX: Increased min-height from 650px to 700px/750px to fit content
    <div className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-6 md:p-10 border border-gray-50 min-h-[750px] md:min-h-[700px] flex flex-col relative overflow-hidden">
      
      {/* Progress Bar */}
      <div className="flex justify-between mb-8 px-2 relative z-10">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= i ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white border-2 border-gray-100 text-gray-300'}`}>
            {i}
          </div>
        ))}
      </div>

      <div className="flex-grow relative">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col">
              <h3 className="text-2xl font-black text-dark mb-2">Seleziona Prestazione</h3>
              <p className="text-gray-400 text-sm mb-6">Di cosa hai bisogno oggi?</p>
              <div className="space-y-3 overflow-y-auto pr-2 max-h-[400px]">
                {ALL_SERVICES.map((srv) => (
                  <button key={srv} onClick={() => handleSelectService(srv)} className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group flex justify-between items-center">
                    <span className="font-bold text-dark group-hover:text-primary">{srv}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DOCTOR */}
          {step === 2 && (
            <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col">
              <h3 className="text-2xl font-black text-dark mb-2">Scegli lo Specialista</h3>
              <p className="text-gray-400 text-sm mb-6">Chi preferisci per {formData.service}?</p>
              <div className="space-y-4 overflow-y-auto pr-2">
                {availableDoctors.length > 0 ? (
                  availableDoctors.map((doc) => (
                    <button key={doc.id} onClick={() => handleSelectDoctor(doc)} className="w-full p-4 rounded-2xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 text-left group">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm group-hover:bg-white group-hover:text-primary shadow-sm">
                        {doc.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-dark group-hover:text-primary">{doc.name}</div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Disponibile</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 bg-yellow-50 text-yellow-700 rounded-2xl text-center text-sm">
                    Nessuno specialista specifico assegnato.
                    <button onClick={() => handleSelectService(formData.service)} className="block w-full mt-3 font-bold underline">Procedi con un medico generico</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: DATE & CALENDAR */}
          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col overflow-y-auto pr-1">
              <h3 className="text-2xl font-black text-dark mb-2">Data e Ora</h3>
              <p className="text-gray-400 text-sm mb-6">Seleziona una data dal calendario.</p>
              
              <div className="space-y-6">
                {/* Custom Calendar */}
                {renderCalendar()}

                {/* Time Slots */}
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                     <Clock size={14} /> Orari Disponibili
                   </label>
                   
                   {!formData.date ? (
                      <div className="p-4 bg-gray-50 rounded-2xl text-center text-sm text-gray-400 italic">
                        Seleziona prima una data sopra.
                      </div> 
                   ) : loadingSlots ? (
                      <div className="flex justify-center py-6">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div> 
                   ) : availableSlots.length === 0 ? (
                      <div className="p-4 bg-red-50 text-red-500 text-sm font-bold rounded-2xl text-center flex items-center justify-center gap-2">
                        <AlertCircle size={16} /> Nessuno slot libero per questa data.
                      </div> 
                   ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 animate-in fade-in slide-in-from-bottom-2">
                        {availableSlots.map(slot => (
                          <button 
                            key={slot} 
                            onClick={() => setFormData({...formData, time: slot})} 
                            className={`
                              py-2.5 rounded-xl text-sm font-bold border transition-all
                              ${formData.time === slot 
                                ? 'bg-dark border-dark text-white shadow-lg scale-105' 
                                : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}
                            `}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                   )}
                </div>
              </div>

              <div className="mt-8 pb-4">
                <button 
                  disabled={!formData.time} 
                  onClick={nextStep} 
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark transition-all shadow-lg shadow-primary/20"
                >
                  Continua
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRM */}
          {/* FIX: Added pb-20 to ensure scrolling reaches the bottom */}
          {step === 4 && (
            <motion.div key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col overflow-y-auto pb-20">
              <h3 className="text-2xl font-black text-dark mb-2">I tuoi Dati</h3>
              <p className="text-gray-400 text-sm mb-6">Ultimo passo per confermare.</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* FIX: Reduced padding from p-4 to p-3 to save vertical space */}
                  <input name="name" placeholder="Nome" value={formData.name} onChange={handleInputChange} required className="w-full p-3 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                  <input name="phone" placeholder="Telefono" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea name="message" rows="2" placeholder="Note aggiuntive (opzionale)" value={formData.message} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>

              {/* Summary Card */}
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-100 text-sm space-y-3 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Riepilogo</span>
                    </div>
                    <div className="flex justify-between"><span className="text-gray-500">Trattamento</span> <span className="font-bold text-dark">{formData.service}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Dottore</span> <span className="font-bold text-dark">{formData.doctor?.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Data</span> <span className="font-bold text-primary">{formData.date}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Ora</span> <span className="font-bold text-primary">{formData.time}</span></div>
                </div>
              </div>

              {status.error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2"><AlertCircle size={14} /> {status.error}</div>}
              
              <div className="mt-auto pt-6">
                <button onClick={handleSubmit} disabled={status.loading || !formData.name || !formData.phone} className="w-full bg-dark text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    {status.loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : 'CONFERMA PRENOTAZIONE'}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {step > 1 && !status.success && (
        <div className="absolute bottom-6 left-6 z-20">
          <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest transition-colors">
            <ChevronLeft size={14} /> Indietro
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;