import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUsers, createUser, deleteUser } from '../../store/slices/userSlice';
import { 
  Plus, Search, Trash2, Shield, User, Stethoscope, Mail, X, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

const StaffManagement = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'staff'
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = list.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password) {
        return toast.error("Compila tutti i campi");
    }
    
    try {
        await dispatch(createUser(formData)).unwrap();
        toast.success("Nuovo membro aggiunto al team!");
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '', role: 'staff' });
    } catch (err) {
        toast.error(err || "Errore creazione utente");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Sei sicuro di voler rimuovere questo utente?")) {
        try {
            await dispatch(deleteUser(id)).unwrap();
            toast.success("Utente rimosso");
        } catch (err) {
            toast.error(err);
        }
    }
  };

  // Helper to render role badge
  const RoleBadge = ({ role }) => {
    const config = {
        admin: { color: 'bg-purple-100 text-purple-700', icon: <Shield size={12} /> },
        doctor: { color: 'bg-blue-100 text-blue-700', icon: <Stethoscope size={12} /> },
        staff: { color: 'bg-gray-100 text-gray-700', icon: <User size={12} /> },
    };
    const style = config[role] || config.staff;

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${style.color}`}>
            {style.icon} {role}
        </span>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Gestione Team</h1>
          <p className="text-gray-500 font-medium mt-1">Amministra gli accessi di Dottori e Segreteria.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all"
        >
          <Plus size={20} /> Aggiungi Membro
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cerca per nome o email..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
            <div className="col-span-full py-20 text-center text-gray-400">Caricamento team...</div>
        ) : filteredUsers.map((user) => (
            <div key={user._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-start justify-between group hover:shadow-lg transition-all">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-dark text-lg leading-tight">{user.name}</h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1 mb-3">
                            <Mail size={12} /> {user.email}
                        </div>
                        <RoleBadge role={user.role} />
                    </div>
                </div>
                {user.role !== 'admin' && ( // Prevent deleting Admins easily
                    <button 
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                >
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-dark"><X /></button>
                    
                    <h2 className="text-2xl font-black text-dark mb-6">Nuovo Account</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nome Completo</label>
                            <input className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Email</label>
                            <input type="email" className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" 
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Password Provvisoria</label>
                            <input type="password" className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" 
                                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Ruolo</label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                                {['staff', 'doctor', 'admin'].map(role => (
                                    <button 
                                        key={role} type="button"
                                        onClick={() => setFormData({...formData, role})}
                                        className={`py-3 rounded-xl text-xs font-bold uppercase transition-all border-2 ${
                                            formData.role === role ? 'border-primary text-primary bg-primary/5' : 'border-transparent bg-gray-50 text-gray-400'
                                        }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-dark text-white py-4 rounded-xl font-bold mt-4 hover:bg-primary transition-colors flex items-center justify-center gap-2">
                            <Check size={18} /> Crea Account
                        </button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default StaffManagement;