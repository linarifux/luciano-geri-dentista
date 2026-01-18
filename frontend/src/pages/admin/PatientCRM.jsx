import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../../store/slices/patientSlice';
import { Search, UserCircle, Phone, Calendar, Mail } from 'lucide-react';
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
    p._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Anagrafica Pazienti</h1>
          <p className="text-gray-500 italic mt-1">Database storico pazienti Studio Geri</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cerca per nome o email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none shadow-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="text-primary font-bold">Caricamento anagrafica...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400">
            Nessun paziente trovato per questa ricerca.
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div 
              key={patient._id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-md hover:border-primary/30 transition-all group"
            >
              {/* Profile Info */}
              <div className="flex items-center gap-5">
                <div className="bg-secondary/20 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <UserCircle size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                    {patient.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail size={12} />
                    <span>{patient._id}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Contacts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full lg:w-auto text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">Contatto</span>
                  <div className="flex items-center gap-2 text-dark font-medium">
                    <Phone size={14} className="text-primary" /> 
                    {patient.phone}
                  </div>
                </div>
                
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">Visite Totali</span>
                  <div className="bg-secondary/20 text-primary px-3 py-1 rounded-lg font-bold text-xs">
                    {patient.visitCount} {patient.visitCount === 1 ? 'visita' : 'visite'}
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end col-span-2 md:col-span-1">
                  <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">Ultima Attività</span>
                  <div className="flex items-center gap-2 text-dark font-medium">
                    <Calendar size={14} className="text-primary" />
                    {format(new Date(patient.lastAppointment), 'dd MMM yyyy', { locale: it })}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button className="w-full lg:w-auto bg-dark text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                Visualizza Cartella
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientCRM;