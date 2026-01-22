import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsGrid from '../StatsGrid'; // Adjust import path as needed
import AppointmentTable from '../AppointmentTable';
import { 
  Search, Bell, Plus, UserPlus, FileText, 
  Clock, Settings, Filter, Download
} from 'lucide-react';
import { format, isAfter, setHours, setMinutes } from 'date-fns';
import { it } from 'date-fns/locale';
import toast from 'react-hot-toast';

const AdminDashboard = ({ appointments, userInfo }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  // --- FILTERING ---
  const filteredData = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(appt => {
      const term = searchTerm.toLowerCase();
      return (
        appt.name.toLowerCase().includes(term) ||
        (appt.email && appt.email.toLowerCase().includes(term)) ||
        (appt.doctor && appt.doctor.toLowerCase().includes(term))
      );
    });
  }, [appointments, searchTerm]);

  // --- NEXT PATIENT ---
  const nextPatient = useMemo(() => {
    if (!appointments) return null;
    const now = new Date();
    const upcoming = appointments.filter(appt => {
      if (appt.status === 'Cancelled' || !appt.date || !appt.time) return false;
      const apptDate = new Date(appt.date);
      const [hours, minutes] = appt.time.split(':').map(Number);
      const apptDateTime = setMinutes(setHours(apptDate, hours), minutes);
      return isAfter(apptDateTime, now);
    });
    upcoming.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA - dateB !== 0) return dateA - dateB;
      return a.time.localeCompare(b.time);
    });
    return upcoming[0] || null;
  }, [appointments]);

  // --- RECENT ACTIVITY ---
  const recentActivity = useMemo(() => {
    if (!appointments) return [];
    return [...appointments]
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
        .slice(0, 3);
  }, [appointments]);

  const currentDate = new Date().toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Dashboard Amministratore</h1>
          <p className="text-gray-400 text-sm font-medium capitalize mt-1">{currentDate}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
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
        </div>
      </header>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Table */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-wrap gap-2 items-center justify-between sm:justify-start">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['today', 'pending', 'all'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === tab ? 'bg-dark text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'today' ? 'Oggi' : tab === 'pending' ? 'Richieste' : 'Tutti'}
                  </button>
                ))}
            </div>
            <div className="flex gap-2 ml-auto">
                <button className="p-3 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors"><Filter size={18} /></button>
                <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"><Download size={18} /></button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
            <div className="overflow-x-auto">
                <AppointmentTable filter={activeTab} data={filteredData} />
            </div>
          </div>
        </div>

        {/* Right: Widgets */}
        <div className="space-y-6 order-1 lg:order-2">
          {/* Next Patient */}
          <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Clock size={100} /></div>
            <h3 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Prossimo Paziente</h3>
            {nextPatient ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl font-bold text-dark">{nextPatient.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="text-2xl font-black text-dark">{nextPatient.time}</div>
                    <div className="text-sm font-medium text-gray-600 truncate max-w-[150px]">{nextPatient.name}</div>
                  </div>
                </div>
                <div className="bg-white/60 rounded-xl p-3 mb-6">
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Trattamento</div>
                  <div className="text-dark font-bold text-sm truncate">{nextPatient.service}</div>
                </div>
                <button onClick={() => navigate('/admin/appointments')} className="w-full bg-primary hover:bg-dark text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20">Vedi Cartella</button>
              </>
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm font-medium">Nessun appuntamento imminente.</div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">Azioni Rapide</h3>
            <div className="grid grid-cols-2 gap-3">
              <ActionButton icon={<Plus size={18} />} label="Nuovo Appunt." onClick={() => navigate('/admin/appointments')} />
              <ActionButton icon={<UserPlus size={18} />} label="Paziente" onClick={() => navigate('/admin/patients')} />
              <ActionButton icon={<FileText size={18} />} label="Fattura" onClick={() => toast('In arrivo!')} />
              <ActionButton icon={<Settings size={18} />} label="Opzioni" onClick={() => toast('In arrivo!')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
    <div className="text-gray-400 group-hover:text-primary transition-colors">{icon}</div>
    <span className="text-xs font-bold text-gray-500 group-hover:text-primary text-center leading-tight">{label}</span>
  </button>
);

export default AdminDashboard;