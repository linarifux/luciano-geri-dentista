import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Clock, User, FileText, Stethoscope } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const EditAppointmentModal = ({ isOpen, onClose, appointment, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    doctor: '', // Added Doctor
    date: '',
    time: '',
    status: '',
    message: ''
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Services List matching BookingForm
  const ALL_SERVICES = [
    'Igiene Dentale', 
    'Visita di Controllo', 
    'Visita Ortodontica', 
    'Implantologia', 
    'Estetica Dentale',
    'Altro'
  ];

  const DOCTORS = [
    'Dr. Riccardo Rosselli Del Turco',
    'Dott.ssa Cecilia Geri',
    'Dr. Luciano Geri'
  ];

  useEffect(() => {
    if (appointment) {
      setFormData({
        name: appointment.name || '',
        phone: appointment.phone || '',
        email: appointment.email || '',
        service: appointment.service || '',
        doctor: appointment.doctor || '', // Load Doctor
        date: appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '',
        time: appointment.time || '',
        status: appointment.status || 'Pending',
        message: appointment.message || ''
      });
    }
  }, [appointment]);

  // Fetch Slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.date) return;
      
      setLoadingSlots(true);
      try {
        const res = await API.get(`/appointments/slots?date=${formData.date}`);
        let slots = res.data;

        // Ensure current time is available
        if (appointment && appointment.date) {
            const originalDate = new Date(appointment.date).toISOString().split('T')[0];
            const originalTime = appointment.time;
            if (formData.date === originalDate && originalTime) {
                if (!slots.includes(originalTime)) {
                    slots = [...slots, originalTime].sort();
                }
            }
        }
        setAvailableSlots(slots);
      } catch (err) {
        console.error("Error fetching slots", err);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [formData.date, appointment]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleTimeSelect = (time) => setFormData({ ...formData, time });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/appointments/${appointment._id}`, formData);
      toast.success('Appuntamento aggiornato!');
      onUpdateSuccess(); 
      onClose(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Errore durante l'aggiornamento.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
            <h3 className="text-lg font-bold text-dark flex items-center gap-2">
              <FileText size={18} className="text-primary" /> Modifica Appuntamento
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Row 1: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Paziente</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefono</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
            </div>

            {/* Row 2: Service & Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trattamento</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none">
                        {ALL_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dottore</label>
                    <div className="relative">
                        <Stethoscope size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none">
                            <option value="">Qualsiasi</option>
                            {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Row 3: Status */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stato Attuale</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none">
                    <option value="Pending">In Attesa</option>
                    <option value="Confirmed">Confermato</option>
                    <option value="Completed">Completato</option>
                    <option value="Cancelled">Annullato</option>
                </select>
            </div>

            {/* Row 4: DATE & TIME */}
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 space-y-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <Calendar size={14} /> Data Appuntamento
                </label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/30 outline-none font-medium text-dark" />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <Clock size={14} /> Orario ({formData.time || 'Seleziona'})
                </label>
                
                {loadingSlots ? (
                    <div className="flex justify-center p-4"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                ) : availableSlots.length === 0 ? (
                    <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-xl border border-gray-100">Nessun orario disponibile.</div>
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {availableSlots.map((slot) => (
                            <button key={slot} type="button" onClick={() => handleTimeSelect(slot)} className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border ${formData.time === slot ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'}`}>
                                {slot}
                            </button>
                        ))}
                    </div>
                )}
              </div>
            </div>

            {/* Row 5: Notes */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Note Aggiuntive</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors">Annulla</button>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all flex items-center gap-2">
                {loading ? 'Salvataggio...' : <><Save size={18} /> Salva Modifiche</>}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditAppointmentModal;