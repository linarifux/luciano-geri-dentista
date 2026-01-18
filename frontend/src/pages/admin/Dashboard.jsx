import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import StatsGrid from '../../components/admin/StatsGrid';
import AppointmentTable from '../../components/admin/AppointmentTable';
import { 
  Search, Bell, Calendar, Plus, 
  UserPlus, FileText, Clock, ChevronRight, 
  Settings, Filter, Download
} from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Mock data for the "Next Patient" widget (In real app, derive from appointments)
  const nextPatient = {
    name: "Giulia Bianchi",
    time: "14:30",
    treatment: "Igiene Professionale",
    status: "Confirmed"
  };

  const currentDate = new Date().toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* --- 1. Top Bar: Search & Profile --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-dark tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm font-medium capitalize mt-1">
              {currentDate}
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cerca paziente..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-colors text-gray-500 hover:text-primary">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Pill */}
            <div className="flex items-center gap-3 bg-dark text-white p-2 pr-4 rounded-2xl shadow-lg shadow-dark/10">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-inner">
                {userInfo?.name?.charAt(0)}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold leading-tight">{userInfo?.name}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {userInfo?.role === 'admin' ? 'Admin' : 'Staff'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* --- 2. Stats Grid (Existing Component) --- */}
        <section>
           <StatsGrid />
        </section>

        {/* --- 3. Main Layout Grid --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Appointments Table (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Table Header & Filters */}
            <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-wrap gap-2">
              {['today', 'pending', 'all'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
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
              <div className="flex-grow"></div>
              <button className="p-3 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors">
                <Filter size={18} />
              </button>
              <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                <Download size={18} />
              </button>
            </div>

            {/* The Table Component Wrapper */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
              <AppointmentTable filter={activeTab} />
            </div>
          </div>

          {/* RIGHT COLUMN: Widgets & Quick Actions (1/3 width) */}
          <div className="space-y-8">
            
            {/* Widget: Next Patient */}
            <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Clock size={100} />
              </div>
              <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Prossimo Paziente</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl font-bold text-dark">
                  {nextPatient.name.charAt(0)}
                </div>
                <div>
                  <div className="text-2xl font-black text-dark">{nextPatient.time}</div>
                  <div className="text-sm font-medium text-gray-600">{nextPatient.name}</div>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-3 mb-6">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Trattamento</div>
                <div className="text-dark font-bold text-sm">{nextPatient.treatment}</div>
              </div>

              <button className="w-full bg-primary hover:bg-dark text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                Apri Cartella Clinica
              </button>
            </div>

            {/* Widget: Quick Actions */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark mb-4">Azioni Rapide</h3>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton icon={<Plus size={18} />} label="Nuovo Appunt." />
                <ActionButton icon={<UserPlus size={18} />} label="Paziente" />
                <ActionButton icon={<FileText size={18} />} label="Fattura" />
                <ActionButton icon={<Settings size={18} />} label="Opzioni" />
              </div>
            </div>

            {/* Widget: Recent Activity Log */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-dark">Attività Recenti</h3>
                <button className="text-primary hover:underline text-xs font-bold">Vedi tutte</button>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-dark">Marco R.</span> ha prenotato una visita di controllo.
                      </p>
                      <span className="text-[10px] text-gray-400">10 min fa</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Component for Buttons
const ActionButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
    <div className="text-gray-400 group-hover:text-primary transition-colors">{icon}</div>
    <span className="text-xs font-bold text-gray-500 group-hover:text-primary">{label}</span>
  </button>
);

export default Dashboard;