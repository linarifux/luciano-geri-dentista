import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, addService } from '../../store/slices/serviceSlice';
import { Plus, Trash2, Edit3, Activity, Clock, Euro, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addService(newService));
    setShowForm(false);
    setNewService({ title: '', description: '', basePrice: '', duration: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Gestione Prestazioni</h1>
          <p className="text-gray-500 italic">Configura il listino servizi dello Studio Geri</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
            showForm 
            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
            : 'bg-primary text-white hover:bg-dark shadow-primary/20'
          }`}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Annulla' : 'Nuova Prestazione'}
        </button>
      </div>

      {/* Add Service Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/20">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Titolo Prestazione</label>
                  <input 
                    type="text" required value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="es: Igiene Orale Completa"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Prezzo (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="number" required value={newService.basePrice}
                      onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                      className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Durata (Min)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="number" required value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                      className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary outline-none transition-all"
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <button type="submit" className="bg-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl active:scale-95">
                    Salva nel Listino
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-primary font-bold animate-pulse">
            Aggiornamento listino...
          </div>
        ) : (
          items.map((service) => (
            <div key={service._id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-secondary/20 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Activity size={24} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit3 size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-dark mb-4">{service.title}</h3>
              
              <div className="flex items-center gap-6 border-t border-gray-50 pt-4">
                <div className="flex items-center gap-2 text-dark font-bold">
                  <span className="text-primary text-lg">€</span>
                  {service.basePrice}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} />
                  {service.duration} min
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ServiceManagement;