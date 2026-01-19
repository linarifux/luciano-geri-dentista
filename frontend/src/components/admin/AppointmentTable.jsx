import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  Pencil, Trash2, Phone, CheckCircle2, 
  XCircle, AlertCircle, Clock, Calendar 
} from 'lucide-react';

// Added onDelete prop
const AppointmentTable = ({ filter = 'all', data, onEdit, onDelete }) => {
  const { items: reduxItems, loading } = useSelector((state) => state.appointments);

  // Use passed data if available, otherwise fallback to Redux
  const itemsToUse = data || reduxItems;

  const filteredData = useMemo(() => {
    if (!itemsToUse) return [];

    const today = new Date();
    
    return itemsToUse.filter(appt => {
      // Safety check
      if (!appt.date) return false;

      const apptDate = new Date(appt.date);
      
      switch (filter) {
        case 'today':
          return isSameDay(apptDate, today);
        case 'pending':
          return appt.status === 'Pending';
        case 'all':
        default:
          return true;
      }
    }).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA - dateB !== 0) return dateA - dateB;

      const timeA = a.time || ''; 
      const timeB = b.time || '';
      return timeA.localeCompare(timeB);
    });
  }, [itemsToUse, filter]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Confirmed': 
        return { style: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle2 size={12} />, label: 'Confermato' };
      case 'Pending': 
        return { style: 'bg-amber-50 text-amber-700 border-amber-100', icon: <AlertCircle size={12} />, label: 'In Attesa' };
      case 'Cancelled': 
        return { style: 'bg-rose-50 text-rose-700 border-rose-100', icon: <XCircle size={12} />, label: 'Annullato' };
      case 'Completed':
        return { style: 'bg-blue-50 text-blue-700 border-blue-100', icon: <CheckCircle2 size={12} />, label: 'Completato' };
      default: 
        return { style: 'bg-gray-50 text-gray-600 border-gray-100', icon: <Clock size={12} />, label: status || 'Sconosciuto' };
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizzazione...</p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <Calendar size={32} />
        </div>
        <h3 className="text-dark font-bold text-lg">Nessun appuntamento</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">Nessun risultato trovato.</p>
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
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Data & Ora</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Stato</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-right">Opzioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {filteredData.map((appt) => {
            const statusConfig = getStatusConfig(appt.status);
            return (
              <tr key={appt._id} className="group hover:bg-gray-50/80 transition-all duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
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
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-700">{appt.service}</span>
                  {appt.message && <div className="text-[10px] text-gray-400 mt-1 truncate max-w-[150px]">Note: {appt.message}</div>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-dark flex items-center gap-2">
                      {appt.time || '--:--'}
                    </span>
                    <span className="text-[11px] text-gray-400 capitalize">
                      {appt.date ? format(new Date(appt.date), 'EEE, d MMM yyyy', { locale: it }) : 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.style}`}>
                    {statusConfig.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{statusConfig.label}</span>
                  </div>
                </td>
                {/* ACTIONS COLUMN */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(appt)} 
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Modifica"
                    >
                      <Pencil size={18} />
                    </button>
                    
                    <button 
                      onClick={() => onDelete(appt._id)} // Trigger Delete
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Elimina"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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