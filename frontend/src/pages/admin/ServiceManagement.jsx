import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, addService, deleteService } from '../../store/slices/serviceSlice';
import { Plus, Trash2, Edit3, Activity, Clock, Euro, X, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.services);
  const [showForm, setShowForm] = useState(false);
  
  const [newService, setNewService] = useState({
    title: '', description: '', basePrice: '', duration: ''
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newService.title || !newService.basePrice) {
        toast.error("Titolo e Prezzo sono obbligatori");
        return;
    }

    try {
        await dispatch(addService(newService)).unwrap();
        toast.success("Prestazione aggiunta al listino!");
        setShowForm(false);
        setNewService({ title: '', description: '', basePrice: '', duration: '' });
    } catch (error) {
        toast.error("Errore durante il salvataggio");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Sei sicuro di voler rimuovere questa prestazione?")) {
        try {
            await dispatch(deleteService(id)).unwrap();
            toast.success("Prestazione rimossa");
        } catch (error) {
            console.error(error);
            toast.error("Impossibile eliminare");
        }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 p-4 md:p-8 lg:p-10"
    >
      {/* --- Page Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Gestione Prestazioni</h1>
          <p className="text-gray-500 italic mt-1 font-medium">Configura il listino servizi dello Studio Geri</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Download size={18} /> Esporta Listino
            </button>
            <button 
                onClick={() => setShowForm(!showForm)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                    showForm 
                    ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                    : 'bg-primary text-white hover:bg-dark shadow-primary/20'
                }`}
            >
                {showForm ? <X size={20} /> : <Plus size={20} />}
                {showForm ? 'Annulla' : 'Nuova Prestazione'}
            </button>
        </div>
      </div>

      {/* --- Add Service Form --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-secondary/10 mb-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Titolo Prestazione</label>
                  <input 
                    type="text" required value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-dark"
                    placeholder="es: Igiene Orale Completa"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Prezzo (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number" required value={newService.basePrice}
                      onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Durata (Min)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number" required value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold"
                      placeholder="30"
                    />
                  </div>
                </div>

                {/* Description - Full Width */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Descrizione (Opzionale)</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-4 text-gray-400" size={18} />
                        <textarea 
                            value={newService.description}
                            onChange={(e) => setNewService({...newService, description: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary outline-none transition-all resize-none h-32"
                            placeholder="Descrivi brevemente in cosa consiste il trattamento..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
                  <button type="submit" className="w-full md:w-auto bg-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-dark/10 active:scale-95 flex items-center justify-center gap-2">
                    <Plus size={20} /> Salva nel Listino
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Services Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Aggiornamento listino...</p>
          </div>
        ) : items.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-gray-100">
                <p className="text-gray-400">Nessuna prestazione presente nel listino.</p>
            </div>
        ) : (
          items.map((service) => (
            <div key={service._id} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden flex flex-col justify-between h-full">
              
              <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-secondary/10 p-4 rounded-2xl text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Activity size={24} />
                    </div>
                    {/* Actions - Always visible on mobile, hover on desktop */}
                    <div className="flex gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:transform lg:translate-x-4 lg:group-hover:translate-x-0">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-lg hover:bg-primary/10"><Edit3 size={18} /></button>
                    <button 
                        onClick={() => handleDelete(service._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 size={18} />
                    </button>
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-dark mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {service.description || "Nessuna descrizione disponibile."}
                </p>
              </div>
              
              <div className="flex items-center gap-6 border-t border-gray-50 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-dark font-black text-xl">
                  <span className="text-primary text-sm font-bold">€</span>
                  {service.basePrice}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock size={14} />
                  {service.duration} min
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-primary/10 to-transparent rounded-bl-[4rem] -z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ServiceManagement;