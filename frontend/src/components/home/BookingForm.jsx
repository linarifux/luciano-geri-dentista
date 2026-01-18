import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Calendar as CalendarIcon, User, Phone, Mail, MessageSquare } from 'lucide-react';
import API from '../../services/api';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: 'Controllo', date: '', message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const services = ['Igiene e Prevenzione', 'Controllo Generale', 'Ortodonzia', 'Estetica Dentale', 'Implantologia', 'Altro'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    try {
      await API.post('/appointments', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', service: 'Controllo', date: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Errore durante l'invio. Riprova più tardi." });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
            <h4 className="text-3xl font-black text-dark mb-4 uppercase tracking-tighter">Richiesta Ricevuta!</h4>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Grazie per la fiducia. La nostra segreteria ti contatterà al più presto per definire l'orario perfetto.
            </p>
            <button 
              onClick={() => setStatus({ ...status, success: false })}
              className="text-primary font-bold uppercase tracking-widest text-xs hover:underline"
            >
              Invia un'altra richiesta
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-10 md:p-14 border border-gray-50"
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
                  className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                  <Phone size={12} className="text-primary" /> Telefono
                </label>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+39"
                  className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
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
                className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 block">Prestazione Desiderata</label>
                <div className="relative">
                  <select 
                    name="service" value={formData.service} onChange={handleChange}
                    className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all appearance-none font-medium cursor-pointer"
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
                  <CalendarIcon size={12} className="text-primary" /> Data Preferita
                </label>
                <input 
                  type="date" name="date" required value={formData.date} onChange={handleChange}
                  className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-medium cursor-text"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 mb-10">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                <MessageSquare size={12} className="text-primary" /> Note Aggiuntive (Opzionale)
              </label>
              <textarea 
                name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Scrivi qui eventuali necessità..."
                className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all resize-none font-medium"
              ></textarea>
            </div>

            <button 
              disabled={status.loading}
              className="group w-full bg-dark text-white py-6 rounded-2xl font-black text-lg tracking-widest hover:bg-primary transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {status.loading ? 'INVIANDO...' : (
                <>
                  PRENOTA VISITA <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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