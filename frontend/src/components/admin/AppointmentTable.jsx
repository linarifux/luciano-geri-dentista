import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format, isSameDay, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  MoreVertical, User, Mail, Calendar, 
  Clock, Phone, CheckCircle2, XCircle, AlertCircle 
} from 'lucide-react';

const AppointmentTable = ({ filter = 'all' }) => {
  const { items: reduxItems, loading } = useSelector((state) => state.appointments);

  // --- Robust Filtering Logic ---
  const filteredData = useMemo(() => {
    if (!reduxItems) return [];

    const today = new Date();
    
    return reduxItems.filter(appt => {
      const apptDate = new Date(appt.date);
      
      switch (filter) {
        case 'today':
          return isSameDay(apptDate, today);
        case 'pending':
          return appt.status === 'In attesa'; // Ensure this matches your DB value
        case 'all':
        default:
          return true;
      }
    }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
  }, [reduxItems, filter]);

  // --- Helper for Status Styling ---
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Confermato': 
        return { 
          style: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
          icon: <CheckCircle2 size={12} />,
          label: 'Confermato'
        };
      case 'In attesa': 
        return { 
          style: 'bg-amber-50 text-amber-700 border-amber-100', 
          icon: <AlertCircle size={12} />,
          label: 'In Attesa'
        };
      case 'Annullato': 
        return { 
          style: 'bg-rose-50 text-rose-700 border-rose-100', 
          icon: <XCircle size={12} />,
          label: 'Annullato'
        };
      default: 
        return { 
          style: 'bg-gray-50 text-gray-600 border-gray-100', 
          icon: <Clock size={12} />,
          label: status 
        };
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-100"></div>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-4">Sincronizzazione...</p>
      </div>
    );
  }

  // --- Empty State ---
  if (filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <Calendar size={32} />
        </div>
        <h3 className="text-dark font-bold text-lg">Nessun appuntamento</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">
          {filter === 'today' 
            ? 'Nessun appuntamento in programma per oggi.' 
            : 'Non ci sono appuntamenti che corrispondono ai criteri di ricerca.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100">
          <tr>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Paziente</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Trattamento</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Orario</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Stato</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-right">Opzioni</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-50">
          {filteredData.map((appt) => {
            const statusConfig = getStatusConfig(appt.status);
            
            return (
              <tr key={appt._id} className="group hover:bg-gray-50/80 transition-all duration-200">
                {/* 1. Patient Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar with Initials */}
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {appt.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-dark text-sm leading-tight">{appt.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-gray-100">
                          <Phone size={10} /> {appt.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Service */}
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-700">
                    {appt.service}
                  </span>
                  {/* Optional: Add note indicator if message exists */}
                  {appt.message && (
                    <div className="text-[10px] text-gray-400 mt-1 truncate max-w-[150px]">
                      Note: {appt.message}
                    </div>
                  )}
                </td>

                {/* 3. Date & Time */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-dark flex items-center gap-2">
                       {format(new Date(appt.date), 'HH:mm')}
                    </span>
                    <span className="text-[11px] text-gray-400 capitalize">
                      {format(new Date(appt.date), 'EEE, d MMM', { locale: it })}
                    </span>
                  </div>
                </td>

                {/* 4. Status Badge */}
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.style}`}>
                    {statusConfig.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{statusConfig.label}</span>
                  </div>
                </td>

                {/* 5. Actions */}
                <td className="px-6 py-4 text-right relative">
                  <button className="p-2 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;