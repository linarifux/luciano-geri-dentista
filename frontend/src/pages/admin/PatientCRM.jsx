import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../../store/slices/patientSlice';
import { Search, UserCircle, Phone, Calendar, Mail, Download, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const PatientCRM = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredPatients = list.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    p._id.toString().includes(searchTerm)
  );

  return (
    <div className="animate-in fade-in duration-500 p-4 md:p-8 lg:p-10 min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Anagrafica Pazienti</h1>
          <p className="text-gray-500 italic mt-1 font-medium">Database storico clienti Studio Geri</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Download size={18} /> Esporta CSV
             </button>
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all">
                <UserPlus size={18} /> Nuovo Paziente
             </button>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Cerca per nome, email o telefono..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* --- Patients List --- */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-6"></div>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Caricamento archivio...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
                <UserCircle size={48} className="text-gray-300" />
            </div>
            <h3 className="text-dark font-bold text-lg">Nessun paziente trovato</h3>
            <p className="text-gray-400 max-w-xs mx-auto mt-2">Prova a modificare i termini di ricerca.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div 
              key={patient._id} 
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-lg hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              {/* Decorative Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Profile Info */}
              <div className="flex items-center gap-5 relative z-10 w-full lg:w-1/3">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm shrink-0">
                  <span className="text-2xl font-black">{patient.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors truncate">
                    {patient.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Mail size={12} className="shrink-0" />
                    <span className="truncate">{patient.email || 'Nessuna email'}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Contacts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full lg:w-auto text-sm relative z-10">
                
                {/* Contact */}
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1.5">Telefono</span>
                  <div className="flex items-center gap-2 text-dark font-bold bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                    <Phone size={14} className="text-primary" /> 
                    {patient.phone}
                  </div>
                </div>
                
                {/* Visits */}
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1.5">Visite</span>
                  <div className="flex items-center gap-2 text-dark font-bold bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                    <UserCircle size={14} className="text-primary" /> 
                    {patient.visitCount} {patient.visitCount === 1 ? 'visita' : 'visite'}
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex flex-col col-span-2 md:col-span-1">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1.5">Ultimo Appunt.</span>
                  <div className="flex items-center gap-2 text-dark font-bold bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                    <Calendar size={14} className="text-primary" />
                    {format(new Date(patient.lastAppointment), 'd MMM yyyy', { locale: it })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full lg:w-auto relative z-10 bg-dark text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 whitespace-nowrap">
                Apri Cartella
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientCRM;