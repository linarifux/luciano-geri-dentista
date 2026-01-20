import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import StatsGrid from '../../components/admin/StatsGrid';
import AppointmentTable from '../../components/admin/AppointmentTable';
import { 
  Search, Bell, Plus, UserPlus, FileText, 
  Clock, Settings, Filter, Download
} from 'lucide-react';
import { format, isAfter, setHours, setMinutes } from 'date-fns';
import { it } from 'date-fns/locale';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { items: appointments, loading } = useSelector((state) => state.appointments);
  
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // --- 1. FILTERING LOGIC (Search) ---
  // Filters data BEFORE passing it to the Table (which handles the Tab filtering)
  const filteredData = useMemo(() => {
    if (!appointments) return [];
    
    return appointments.filter(appt => {
      const searchLower = searchTerm.toLowerCase();
      return (
        appt.name.toLowerCase().includes(searchLower) ||
        (appt.email && appt.email.toLowerCase().includes(searchLower)) ||
        (appt.doctor && appt.doctor.toLowerCase().includes(searchLower))
      );
    });
  }, [appointments, searchTerm]);

  // --- 2. NEXT PATIENT WIDGET LOGIC ---
  const nextPatient = useMemo(() => {
    if (!appointments) return null;
    
    const now = new Date();
    
    // Find upcoming appointments (today or future) that are not cancelled
    const upcoming = appointments.filter(appt => {
      if (appt.status === 'Cancelled' || !appt.date || !appt.time) return false;
      
      const apptDate = new Date(appt.date);
      const [hours, minutes] = appt.time.split(':').map(Number);
      const apptDateTime = setMinutes(setHours(apptDate, hours), minutes);
      
      return isAfter(apptDateTime, now);
    });

    // Sort by nearest date/time
    upcoming.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA - dateB !== 0) return dateA - dateB;
      return a.time.localeCompare(b.time);
    });

    return upcoming[0] || null;
  }, [appointments]);

  // --- 3. RECENT ACTIVITY LOGIC ---
  const recentActivity = useMemo(() => {
    if (!appointments) return [];
    // Sort by createdAt (newest first) and take top 3
    // Fallback to 'date' if 'createdAt' is missing
    return [...appointments]
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
        .slice(0, 3);
  }, [appointments]);

  const currentDate = new Date().toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-10 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto space-y-6 md:space-y-8"
      >
        {/* --- Top Bar --- */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="w-full xl:w-auto flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-dark tracking-tight">
                Dashboard
              </h1>
              <p className="text-gray-400 text-xs md:text-sm font-medium capitalize mt-1">
                {currentDate}
              </p>
            </div>
            {/* Mobile Profile Icon */}
            <div className="xl:hidden w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-inner">
               {userInfo?.name?.charAt(0)}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:flex-1 xl:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cerca paziente..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button className="relative p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-colors text-gray-500 hover:text-primary">
                  <Bell size={20} />
                  {appointments.some(a => a.status === 'Pending') && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>

                <div className="hidden xl:flex items-center gap-3 bg-dark text-white p-2 pr-4 rounded-2xl shadow-lg shadow-dark/10">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-inner">
                      {userInfo?.name?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">{userInfo?.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {userInfo?.role === 'admin' ? 'Admin' : 'Staff'}
                      </span>
                  </div>
                </div>
            </div>
          </div>
        </header>

        {/* --- Stats Grid --- */}
        <section className="w-full overflow-x-auto pb-2 md:pb-0">
           <StatsGrid />
        </section>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Table */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            
            {/* Table Controls */}
            <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-wrap gap-2 items-center justify-between sm:justify-start">
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  {['today', 'pending', 'all'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                        activeTab === tab 
                          ? 'bg-dark text-white shadow-md' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {tab === 'today' && 'Oggi'}
                      {tab === 'pending' && 'Richieste'}
                      {tab === 'all' && 'Tutti'}
                    </button>
                  ))}
              </div>
              
              <div className="flex gap-2 ml-auto mt-2 sm:mt-0">
                  <button className="p-3 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors">
                    <Filter size={18} />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                    <Download size={18} />
                  </button>
              </div>
            </div>

            {/* Table Wrapper */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
              <div className="overflow-x-auto">
                 {/* Pass filteredData so the table renders the search results */}
                 <AppointmentTable filter={activeTab} data={filteredData} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Widgets */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            
            {/* Widget: Next Patient */}
            <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Clock size={100} />
              </div>
              <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Prossimo Paziente</h3>
              
              {nextPatient ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl font-bold text-dark">
                      {nextPatient.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-2xl font-black text-dark">{nextPatient.time}</div>
                      <div className="text-sm font-medium text-gray-600 truncate max-w-[150px]">{nextPatient.name}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 rounded-xl p-3 mb-6">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Trattamento</div>
                    <div className="text-dark font-bold text-sm truncate">{nextPatient.service}</div>
                  </div>

                  <button 
                    onClick={() => navigate('/admin/appointments')}
                    className="w-full bg-primary hover:bg-dark text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20"
                  >
                    Vedi Calendario
                  </button>
                </>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm font-medium">Nessun appuntamento imminente.</p>
                </div>
              )}
            </div>

            {/* Widget: Quick Actions */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark mb-4">Azioni Rapide</h3>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton icon={<Plus size={18} />} label="Nuovo Appunt." onClick={() => navigate('/admin/appointments')} />
                <ActionButton icon={<UserPlus size={18} />} label="Paziente" onClick={() => navigate('/admin/patients')} />
                <ActionButton icon={<FileText size={18} />} label="Fattura" onClick={() => toast('Funzione Fatturazione in arrivo!')} />
                <ActionButton icon={<Settings size={18} />} label="Opzioni" onClick={() => toast('Impostazioni in arrivo!')} />
              </div>
            </div>

            {/* Widget: Recent Activity */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hidden md:block">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-dark">Attività Recenti</h3>
              </div>
              <ul className="space-y-4">
                {recentActivity.map((appt) => (
                  <li key={appt._id} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-dark">{appt.name}</span> ha prenotato: {appt.service}.
                      </p>
                      <span className="text-[10px] text-gray-400 capitalize">
                        {format(new Date(appt.createdAt || appt.date), 'd MMM HH:mm', { locale: it })}
                      </span>
                    </div>
                  </li>
                ))}
                {recentActivity.length === 0 && (
                    <li className="text-xs text-gray-400 italic">Nessuna attività recente.</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Component for Buttons
const ActionButton = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group"
  >
    <div className="text-gray-400 group-hover:text-primary transition-colors">{icon}</div>
    <span className="text-xs font-bold text-gray-500 group-hover:text-primary text-center leading-tight">{label}</span>
  </button>
);

export default Dashboard;