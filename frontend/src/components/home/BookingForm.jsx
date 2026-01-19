import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Calendar as CalendarIcon, User, Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import API from '../../services/api';

const BookingForm = () => {
  // Define services list first so we can use it in initial state
  const services = [
    'Igiene e Prevenzione', 
    'Controllo Generale', 
    'Ortodonzia', 
    'Estetica Dentale', 
    'Implantologia', 
    'Altro'
  ];

  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    service: services[0], // FIX: Default to valid enum, NOT 'Controllo'
    date: '', 
    time: '', 
    message: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Fetch slots when date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.date) return;
      
      setLoadingSlots(true);
      // Reset time when date changes to prevent invalid slot selection
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
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.time) {
      setStatus({ loading: false, success: false, error: "Seleziona un orario disponibile." });
      return;
    }

    setStatus({ loading: true, success: false, error: null });
    
    try {
      await API.post('/appointments', formData);
      setStatus({ loading: false, success: true, error: null });
      // Reset form on success
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        service: services[0], 
        date: '', 
        time: '', 
        message: '' 
      });
      setAvailableSlots([]);
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || "Errore durante l'invio. Riprova." 
      });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status.success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-16 text-center"
          >
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
              <CheckCircle2 size={40} />
            </div>
            <h4 className="text-3xl font-black text-dark mb-4 uppercase tracking-tighter">Richiesta Confermata!</h4>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Il tuo appuntamento è stato registrato. Ti aspettiamo in studio.
            </p>
            <button 
              onClick={() => setStatus({ ...status, success: false })}
              className="text-primary font-bold uppercase tracking-widest text-xs hover:underline"
            >
              Prenota di nuovo
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 md:p-14 border border-gray-50"
          >
            {status.error && (
              <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                <AlertCircle size={20} />
                <span className="text-sm font-bold uppercase tracking-tight">{status.error}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  <User size={12} className="text-primary" /> Nome e Cognome
                </label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Mario Rossi"
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  <Phone size={12} className="text-primary" /> Telefono
                </label>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+39"
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 mb-8">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                <Mail size={12} className="text-primary" /> Email
              </label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="mario@esempio.it"
                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 block">Prestazione</label>
                <div className="relative">
                  <select 
                    name="service" value={formData.service} onChange={handleChange}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all appearance-none font-medium cursor-pointer"
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  <CalendarIcon size={12} className="text-primary" /> Data
                </label>
                <input 
                  type="date" name="date" required value={formData.date} onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium cursor-text"
                />
              </div>
            </div>

            {/* --- Time Slots Selection --- */}
            <div className="mb-10 space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                <Clock size={12} className="text-primary" /> Orari Disponibili
              </label>
              
              {!formData.date ? (
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                  Seleziona prima una data per vedere gli orari.
                </div>
              ) : loadingSlots ? (
                <div className="flex justify-center p-6"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
              ) : availableSlots.length === 0 ? (
                 <div className="p-6 bg-red-50 text-red-500 rounded-2xl text-center text-sm font-medium">
                   Nessun orario disponibile per questa data.
                 </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSelect(slot)}
                      className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${
                        formData.time === slot
                          ? 'bg-primary border-primary text-white shadow-lg scale-105'
                          : 'bg-white border-gray-100 text-gray-600 hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2 mb-10">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                <MessageSquare size={12} className="text-primary" /> Note
              </label>
              <textarea 
                name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="..."
                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all resize-none font-medium"
              ></textarea>
            </div>

            <button 
              disabled={status.loading || !formData.time}
              className="group w-full bg-dark text-white py-5 rounded-2xl font-black text-lg tracking-widest hover:bg-primary transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              {status.loading ? 'REGISTRAZIONE...' : (
                <>
                  CONFERMA APPUNTAMENTO <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingForm;