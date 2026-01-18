import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon/Graphic */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[120px] font-black text-secondary/20 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🦷</span>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Pagina non trovata
          </h1>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Spiacenti, la pagina che stai cercando non esiste o è stata spostata. 
            Il tuo sorriso è importante, non lasciarti distrarre!
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-dark transition-all transform hover:-translate-y-1"
            >
              <Home size={20} /> Torna alla Home
            </Link>
            
            <Link 
              to="/#booking" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-secondary text-dark px-8 py-4 rounded-full font-bold hover:bg-secondary/10 transition-all"
            >
              <Calendar size={20} /> Prenota Visita
            </Link>
          </div>

          <button 
            onClick={() => window.history.back()}
            className="mt-12 text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto text-sm font-medium"
          >
            <ArrowLeft size={16} /> Torna alla pagina precedente
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;