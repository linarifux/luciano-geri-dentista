import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import AppointmentTable from '../../components/admin/AppointmentTable';
import { Search, Filter, Calendar as CalendarIcon, Download } from 'lucide-react';

const Appointments = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tutti');

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Filtering Logic
  const filteredItems = items.filter((appt) => {
    const matchesSearch = appt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appt.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tutti' || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Registro Appuntamenti</h1>
          <p className="text-gray-500 italic mt-1">Gestione completa delle richieste di visita</p>
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Download size={18} /> Esporta
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all">
            <CalendarIcon size={18} /> Nuovo Appuntamento
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cerca paziente o email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 ml-2" />
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Tutti">Tutti gli stati</option>
            <option value="In attesa">In attesa</option>
            <option value="Confermato">Confermati</option>
            <option value="Annullato">Annullati</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-400 font-medium">Caricamento appuntamenti...</p>
          </div>
        ) : (
          <AppointmentTable data={filteredItems} /> 
        )}
      </div>

      {/* Counter Summary */}
      <div className="flex justify-end text-xs text-gray-400 font-medium px-4">
        Mostrando {filteredItems.length} di {items.length} richieste totali
      </div>
    </motion.div>
  );
};

export default Appointments;