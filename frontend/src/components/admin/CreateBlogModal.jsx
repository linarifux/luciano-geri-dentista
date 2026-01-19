import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon, Type, User, Clock, Tag, UploadCloud } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';

const CreateBlogModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '', category: '', author: 'Dr. Luciano Geri', readTime: '5 min'
  });
  const [imageFile, setImageFile] = useState(null); // Store the file object
  const [content, setContent] = useState(''); 
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!content || content === '<p></p>') return toast.error("Il contenuto è obbligatorio");
    if(!imageFile) return toast.error("L'immagine di copertina è obbligatoria");

    setLoading(true);
    
    try {
      // Create FormData to send file + text
      const data = new FormData();
      data.append('image', imageFile); // Must match backend upload.single('image')
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('author', formData.author);
      data.append('readTime', formData.readTime);
      data.append('content', content);

      // Axios automatically sets 'Content-Type': 'multipart/form-data' for FormData
      await API.post('/blogs', data);
      
      toast.success('Articolo pubblicato!');
      
      // Reset form
      setFormData({ title: '', category: '', author: 'Dr. Luciano Geri', readTime: '5 min' });
      setImageFile(null);
      setContent('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Errore durante la pubblicazione");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
            <h3 className="text-lg font-bold text-dark">Nuovo Articolo Blog</h3>
            <button onClick={onClose}><X size={20} className="text-gray-500 hover:text-red-500" /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Title & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Titolo</label>
                <div className="relative">
                  <Type size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input required type="text" placeholder="Titolo dell'articolo" className="w-full pl-10 p-2.5 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                    value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
              </div>
              
              {/* File Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Immagine Copertina</label>
                <div className="relative">
                  <ImageIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full pl-10 p-2 text-sm text-gray-500 bg-gray-50 rounded-xl border-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {imageFile && (
                    <span className="absolute right-3 top-3 text-xs text-green-600 font-bold flex items-center gap-1">
                      <UploadCloud size={12} /> Pronto
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Meta Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="relative">
                  <Tag size={16} className="absolute left-3 top-3 text-gray-400" />
                  <select required className="w-full pl-10 p-2.5 bg-gray-50 rounded-xl border-none"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="">Seleziona Categoria</option>
                      <option value="Prevenzione">Prevenzione</option>
                      <option value="Chirurgia">Chirurgia</option>
                      <option value="Estetica">Estetica</option>
                      <option value="News">News Studio</option>
                  </select>
               </div>
               <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input required type="text" className="w-full pl-10 p-2.5 bg-gray-50 rounded-xl border-none"
                    value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
               </div>
               <div className="relative">
                  <Clock size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input required type="text" className="w-full pl-10 p-2.5 bg-gray-50 rounded-xl border-none"
                    value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} />
               </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Contenuto</label>
              <RichTextEditor 
                content={content} 
                onChange={setContent} 
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-500 font-bold hover:bg-gray-100">Annulla</button>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-dark flex items-center gap-2">
                {loading ? 'Caricamento...' : <><Save size={18} /> Pubblica</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default CreateBlogModal;