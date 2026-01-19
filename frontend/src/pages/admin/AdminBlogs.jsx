import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBlogs } from '../../store/slices/blogSlice';
import BlogTable from '../../components/admin/BlogTable';
import CreateBlogModal from '../../components/admin/CreateBlogModal';
import { Search, Filter, Plus, Download } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // --- Filtering Logic ---
  const filteredItems = items.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // --- Delete Handler ---
  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo articolo?')) {
      try {
        await API.delete(`/blogs/${id}`);
        toast.success('Articolo eliminato con successo');
        dispatch(fetchBlogs()); // Refresh list
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error('Errore durante l\'eliminazione');
      }
    }
  };

  const handleSuccess = () => {
    dispatch(fetchBlogs()); // Refresh after create
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-8 lg:p-10"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Gestione Blog</h1>
          <p className="text-gray-500 italic mt-1 font-medium">Pubblica notizie e aggiornamenti per i pazienti</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Download size={18} /> Esporta
            </button>
            <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all"
            >
                <Plus size={18} /> Nuovo Articolo
            </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cerca per titolo o autore..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 ml-1 flex-shrink-0" />
          <select 
            className="w-full md:w-auto bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">Tutte le categorie</option>
            <option value="Prevenzione">Prevenzione</option>
            <option value="Chirurgia">Chirurgia</option>
            <option value="Estetica">Estetica</option>
            <option value="News">News Studio</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-400 font-medium">Caricamento...</p>
          </div>
        ) : (
          <BlogTable 
            data={filteredItems} 
            onDelete={handleDelete} 
          /> 
        )}
      </div>

      <div className="flex justify-end text-xs text-gray-400 font-medium px-4">
        Totale articoli: {filteredItems.length}
      </div>

      {/* Create Modal */}
      <CreateBlogModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </motion.div>
  );
};

export default AdminBlogs;