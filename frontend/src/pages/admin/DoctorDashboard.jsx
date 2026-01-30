import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { motion } from 'framer-motion';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import { 
  Clock, Calendar, FileText, AlertTriangle, 
  CheckCircle2, Activity, Image as ImageIcon, Phone 
} from 'lucide-react';
import { isSameDay, parseISO, format } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorDashboard = ({ appointments, userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Fetch data on mount (if not passed from parent or to ensure freshness)
  useEffect(() => {
    if (!appointments) {
        dispatch(fetchAppointments());
    }
  }, [dispatch, appointments]);

  // --- 1. LOGIC: Get Today's Schedule ---
  const todaySchedule = useMemo(() => {
    if (!appointments) return [];
    const today = new Date();
    
    return appointments
      .filter(appt => appt.date && isSameDay(parseISO(appt.date), today) && appt.status !== 'Cancelled')
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments]);

  // --- 2. LOGIC: Find "Current/Active" Patient ---
  const { currentPatient, remainingCount } = useMemo(() => {
    const now = new Date();
    const currentTimeStr = format(now, 'HH:mm');
    
    let active = null;
    let pending = 0;

    todaySchedule.forEach(appt => {
        if(appt.status === 'Pending' || appt.status === 'Confirmed') pending++;

        // Logic: If status is Confirmed and time is >= now, or just the next available
        // For simplicity, we pick the first Confirmed/Pending one as "Next" if none are "In Progress"
        if (!active && appt.time >= currentTimeStr && appt.status !== 'Completed') {
            active = appt;
        }
    });

    return { currentPatient: active, remainingCount: pending };
  }, [todaySchedule]);

  // --- Navigation Handlers ---
  const handleOpenRecord = () => {
    navigate('/admin/clinical-record');
  };

  const handleEndVisit = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    toast.success("Visita terminata. Cartella salvata.");
    // Logic to update status to 'Completed' would go here
  };

  return (
    <div className="space-y-8">
        
      {/* --- Header --- */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-dark">Bentornato, {userInfo?.name}.</h1>
          <p className="text-gray-500 font-medium mt-1">Ecco il tuo programma clinico di oggi.</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-3xl font-black text-primary">{remainingCount}</div>
          <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Pazienti Rimasti</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COL: The "Active Patient" Card (2/3 Width) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. CURRENT PATIENT CARD */}
          {currentPatient ? (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleOpenRecord} // Entire card is clickable
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/10 relative overflow-hidden cursor-pointer hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
                {/* Status Badge */}
                <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:bg-dark transition-colors">
                  <Activity size={14} className="animate-pulse" /> 
                  {currentPatient.status === 'Confirmed' ? 'Prossimo Ingresso' : 'In Poltrona'}
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-black text-gray-400 border-4 border-white shadow-lg shrink-0">
                      {currentPatient.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-4 w-full">
                      <div>
                          <div className="flex justify-between items-start">
                              <h2 className="text-3xl font-bold text-dark group-hover:text-primary transition-colors">{currentPatient.name}</h2>
                              <span className="text-2xl font-black text-primary/20">{currentPatient.time}</span>
                          </div>
                          <p className="text-primary font-bold text-lg">{currentPatient.service}</p>
                          
                          {/* Contact Info */}
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><Phone size={14} /> {currentPatient.phone}</span>
                          </div>
                      </div>

                      {/* Alerts / Notes */}
                      {currentPatient.message && (
                          <div className="bg-yellow-50 text-yellow-700 border border-yellow-100 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2">
                              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                              <p className="italic line-clamp-1">"{currentPatient.message}"</p>
                          </div>
                      )}

                      {/* Quick Actions Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-50 mt-4" onClick={(e) => e.stopPropagation()}>
                          <ActionButton icon={<FileText size={18} />} label="Anamnesi" onClick={handleOpenRecord} />
                          <ActionButton icon={<ImageIcon size={18} />} label="Lastre/RX" onClick={handleOpenRecord} />
                          <ActionButton icon={<Activity size={18} />} label="Odontogramma" highlight onClick={handleOpenRecord} />
                          <ActionButton icon={<CheckCircle2 size={18} />} label="Fine Visita" color="green" onClick={handleEndVisit} />
                      </div>
                  </div>
                </div>
            </motion.div>
          ) : (
            // Empty State
            <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-bold text-dark">Tutto fatto per oggi!</h3>
                <p className="text-gray-400">Nessun altro paziente in programma.</p>
            </div>
          )}

          {/* 2. QUICK NOTES */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-dark flex items-center gap-2">
                <FileText size={18} className="text-gray-400" /> Note Cliniche (Rapide)
              </h3>
              <span className="text-xs text-gray-400 italic">Salvataggio automatico...</span>
            </div>
            <textarea 
              className="w-full h-32 p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 resize-none text-sm leading-relaxed outline-none transition-all"
              placeholder="Scrivi qui i dettagli dell'intervento, materiali usati, ecc..."
            ></textarea>
          </div>

        </div>

        {/* --- RIGHT COL: The Agenda Timeline --- */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-full min-h-[500px]">
            <h3 className="font-bold text-dark mb-6 flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Agenda di Oggi
            </h3>
            
            {todaySchedule.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">Nessun appuntamento oggi.</div>
            ) : (
                <div className="space-y-0 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                    {todaySchedule.map((appt) => {
                    const isDone = appt.status === 'Completed';
                    const isCurrent = currentPatient?._id === appt._id;
                    
                    return (
                        <div key={appt._id} className={`relative flex gap-4 pb-8 last:pb-0 group ${isCurrent ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity'}`}>
                        {/* Dot */}
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm transition-all ${
                            isCurrent ? 'bg-primary text-white scale-110' : 
                            isDone ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                            {isDone ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 p-4 rounded-2xl transition-all ${isCurrent ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50 border border-transparent'}`}>
                            <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-dark text-sm">{appt.time}</span>
                            {isCurrent && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase">Now</span>}
                            </div>
                            <div className="font-bold text-base mb-0.5 leading-tight">{appt.name}</div>
                            <div className="text-xs text-gray-500 font-medium">{appt.service}</div>
                        </div>
                        </div>
                    );
                    })}
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper for Quick Action Buttons
const ActionButton = ({ icon, label, highlight, color, onClick }) => {
  const baseClasses = "flex flex-col items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all active:scale-95";
  const styles = highlight 
    ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-dark"
    : color === 'green' 
      ? "bg-green-50 text-green-600 hover:bg-green-100 border border-green-100"
      : "bg-white border border-gray-100 text-gray-600 hover:border-primary/30 hover:text-primary shadow-sm";

  return (
    <button onClick={onClick} className={`${baseClasses} ${styles}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default DoctorDashboard;