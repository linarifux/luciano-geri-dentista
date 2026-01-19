import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import AppointmentTable from '../../components/admin/AppointmentTable';
import EditAppointmentModal from '../../components/admin/EditAppointmentModal';
import { Search, Filter, Calendar as CalendarIcon, Download } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Appointments = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const filteredItems = items.filter((appt) => {
    const matchesSearch = appt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appt.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    dispatch(fetchAppointments());
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo appuntamento? Questa azione non può essere annullata.')) {
      try {
        await API.delete(`/appointments/${id}`);
        toast.success('Appuntamento eliminato con successo');
        dispatch(fetchAppointments());
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast.error('Errore durante l\'eliminazione');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-8" // Added padding for better mobile spacing if not provided by layout
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark">Registro Appuntamenti</h1>
          <p className="text-gray-500 italic mt-1 text-sm md:text-base">Gestione completa delle richieste di visita</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} /> <span className="hidden sm:inline">Esporta</span><span className="sm:hidden">Export</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all">
            <CalendarIcon size={18} /> <span className="whitespace-nowrap">Nuovo Appuntamento</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cerca paziente o email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2 w-full">
            <Filter size={18} className="text-gray-400 ml-1 flex-shrink-0" />
            <select 
                className="w-full md:w-auto bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">Tutti gli stati</option>
                <option value="Pending">In Attesa</option>
                <option value="Confirmed">Confermati</option>
                <option value="Completed">Completati</option>
                <option value="Cancelled">Annullati</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-400 font-medium">Caricamento appuntamenti...</p>
          </div>
        ) : (
          // Wrapper to allow horizontal scrolling on small screens
          <div className="overflow-x-auto">
            <AppointmentTable 
                data={filteredItems} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteClick} 
            /> 
          </div>
        )}
      </div>

      {/* Counter Summary */}
      <div className="flex justify-end text-xs text-gray-400 font-medium px-4">
        Mostrando {filteredItems.length} di {items.length} richieste totali
      </div>

      {/* Edit Modal */}
      <EditAppointmentModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        appointment={selectedAppointment}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </motion.div>
  );
};

export default Appointments;