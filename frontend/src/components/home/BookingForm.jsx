import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, User, CheckCircle2, 
  ChevronRight, ChevronLeft, AlertCircle, 
} from 'lucide-react';
import API from '../../services/api';

const DOCTORS_DATA = [
  {
    id: 'dr-riccardo',
    name: 'Dr. Riccardo Rosselli Del Turco',
    avatar: 'RR',
    services: ['Igiene Dentale', 'Visita di Controllo']
  },
  {
    id: 'dr-cecilia',
    name: 'Dott.ssa Cecilia Geri',
    avatar: 'CG',
    services: ['Visita Ortodontica']
  },
  {
    id: 'dr-luciano',
    name: 'Dr. Luciano Geri',
    avatar: 'LG',
    services: ['Implantologia', 'Estetica Dentale', 'Altro']
  }
];

const ALL_SERVICES = [
  'Igiene Dentale', 
  'Visita di Controllo', 
  'Visita Ortodontica', 
  'Implantologia', 
  'Estetica Dentale'
];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  const [formData, setFormData] = useState({
    service: '',
    doctor: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Filter Doctors based on Service
  const availableDoctors = DOCTORS_DATA.filter(doc => 
    doc.services.includes(formData.service)
  );

  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.date || !formData.doctor) return;
      
      setLoadingSlots(true);
      setFormData(prev => ({ ...prev, time: '' })); 
      
      try {
        const res = await API.get(`/appointments/slots?date=${formData.date}`);
        setAvailableSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots", err);
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
      // Clean payload for backend
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        doctor: formData.doctor?.name // Send simple string
      };

      await API.post('/appointments', payload);
      setStatus({ loading: false, success: true, error: null });
    } catch (err) {
      console.error(err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || "Errore durante la prenotazione." 
      });
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -50 : 50, opacity: 0 })
  };

  if (status.success) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-16 text-center h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/30">
          <CheckCircle2 size={40} />
        </div>
        <h4 className="text-3xl font-black text-dark mb-4 uppercase tracking-tighter">Prenotazione Confermata!</h4>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Grazie {formData.name}, ti aspettiamo il {formData.date} alle {formData.time} con {formData.doctor?.name}.
        </p>
        <button onClick={() => window.location.reload()} className="text-primary font-bold uppercase tracking-widest text-xs hover:underline">
          Nuova Prenotazione
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-6 md:p-10 border border-gray-50 min-h-[600px] flex flex-col relative overflow-hidden">
      
      {/* Progress Bar */}
      <div className="flex justify-between mb-8 px-2 relative z-10">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= i ? 'bg-primary text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
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

          {/* STEP 3: DATE */}
          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col overflow-y-auto">
              <h3 className="text-2xl font-black text-dark mb-2">Data e Ora</h3>
              <p className="text-gray-400 text-sm mb-6">Quando vuoi fissare l'appuntamento?</p>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Seleziona Data</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none font-bold text-dark cursor-pointer" />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Orari Disponibili</label>
                   {!formData.date ? <div className="text-sm text-gray-400 italic">Seleziona prima una data.</div> 
                   : loadingSlots ? <div className="flex justify-center py-4"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div> 
                   : availableSlots.length === 0 ? <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl text-center">Nessuno slot libero.</div> 
                   : <div className="grid grid-cols-3 gap-2">{availableSlots.map(slot => (
                        <button key={slot} onClick={() => setFormData({...formData, time: slot})} className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${formData.time === slot ? 'bg-primary border-primary text-white shadow-lg' : 'bg-white border-gray-100 text-gray-600 hover:border-primary/30'}`}>{slot}</button>
                      ))}</div>}
                </div>
              </div>
              <div className="mt-auto pt-6"><button disabled={!formData.time} onClick={nextStep} className="w-full bg-dark text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-primary transition-colors">Continua</button></div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRM */}
          {step === 4 && (
            <motion.div key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col overflow-y-auto">
              <h3 className="text-2xl font-black text-dark mb-2">I tuoi Dati</h3>
              <p className="text-gray-400 text-sm mb-6">Ultimo passo per confermare.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" placeholder="Nome Completo" value={formData.name} onChange={handleInputChange} required className="w-full p-4 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                  <input name="phone" placeholder="Telefono" value={formData.phone} onChange={handleInputChange} required className="w-full p-4 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full p-4 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea name="message" rows="2" placeholder="Descrivi il problema (opzionale)" value={formData.message} onChange={handleInputChange} className="w-full p-4 rounded-xl bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div className="mt-6 bg-primary/5 p-4 rounded-2xl border border-primary/10 text-xs space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Trattamento:</span> <span className="font-bold text-dark">{formData.service}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Dottore:</span> <span className="font-bold text-dark">{formData.doctor?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Quando:</span> <span className="font-bold text-dark">{formData.date} @ {formData.time}</span></div>
              </div>
              {status.error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2"><AlertCircle size={14} /> {status.error}</div>}
              <div className="mt-auto pt-6"><button onClick={handleSubmit} disabled={status.loading || !formData.name || !formData.phone} className="w-full bg-dark text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-primary transition-all shadow-xl active:scale-95">{status.loading ? 'Conferma in corso...' : 'CONFERMA PRENOTAZIONE'}</button></div>
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