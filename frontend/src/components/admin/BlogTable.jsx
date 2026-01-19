import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  Trash2, ExternalLink, Calendar, 
  User, Clock, Tag 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogTable = ({ data, onDelete }) => {
  const { items: reduxItems, loading } = useSelector((state) => state.blogs);

  // Use passed data if available, otherwise fallback to Redux
  const itemsToUse = data || reduxItems;

  const sortedData = useMemo(() => {
    if (!itemsToUse) return [];
    // Sort by Date Descending (Newest first)
    return [...itemsToUse].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [itemsToUse]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Caricamento Articoli...</p>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <Calendar size={32} />
        </div>
        <h3 className="text-dark font-bold text-lg">Nessun articolo</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">Non hai ancora pubblicato nessun articolo sul blog.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100">
          <tr>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Articolo</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Categoria</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Autore</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Data</th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-right">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sortedData.map((post) => (
            <tr key={post._id} className="group hover:bg-gray-50/80 transition-all duration-200">
              {/* 1. Title & Image */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-dark text-sm leading-tight line-clamp-1 max-w-[200px]">{post.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              {/* 2. Category */}
              <td className="px-6 py-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/10">
                  <Tag size={10} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                </div>
              </td>

              {/* 3. Author */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                   <User size={14} className="text-gray-400" />
                   {post.author}
                </div>
              </td>

              {/* 4. Date */}
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-gray-500 capitalize">
                  {format(new Date(post.createdAt), 'd MMM yyyy', { locale: it })}
                </span>
              </td>

              {/* 5. Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link 
                    to={`/blog/${post._id}`} 
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    title="Vedi anteprima"
                  >
                    <ExternalLink size={18} />
                  </Link>
                  
                  <button 
                    onClick={() => onDelete(post._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Elimina"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;