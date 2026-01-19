import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingForm from '../components/home/BookingForm'; // Ensure this path matches your structure
import { ShieldCheck, Clock, Phone, ArrowLeft, Star, MapPin } from 'lucide-react';

const BookingPage = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* --- Fixed Aesthetic Background Elements --- */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-24 relative z-10"
      >
        {/* Back Navigation */}
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-primary transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Torna alla Home
          </Link>
        </div>

        {/* --- Main Split Layout --- */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT COLUMN: Info & Context (Sticky) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-10">
            
            {/* 1. Headline Area */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-primary"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Prenotazione Rapida
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-dark leading-[0.95] tracking-tighter mb-6">
                Il tuo sorriso <br />
                <span className="text-primary italic">inizia qui.</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Compila il modulo a lato. Il nostro team ti ricontatterà entro 24 ore per confermare l'orario perfetto per te.
              </p>
            </motion.div>

            {/* 2. Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-gray-100 shadow-sm"
            >
              <h3 className="text-sm font-black text-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                <Star size={14} className="text-primary fill-primary" />
                Perché sceglierci
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: <ShieldCheck size={20} />, text: "Protocolli igienici ospedalieri certificati." },
                  { icon: <Clock size={20} />, text: "Zero attese: rispettiamo il tuo tempo." },
                  { icon: <Phone size={20} />, text: "Linea diretta per urgenze e supporto." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-primary">{item.icon}</div>
                    <p className="text-sm text-gray-600 font-medium leading-tight">{item.text}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3. Contact Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0F172A] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-2">Preferisci chiamare?</p>
                <a href="tel:+39050123456" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors block mb-4">
                  +39 050 123456
                </a>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-widest">
                  <MapPin size={12} className="text-primary" /> Pisa • Lungarno Pacinotti 26
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: The Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 relative"
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent blur-3xl rounded-[3rem] -z-10"></div>
            
            {/* Component */}
            <BookingForm />
            
            <p className="text-center text-xs text-gray-400 mt-6 max-w-md mx-auto">
              Inviando il modulo accetti il trattamento dei dati personali secondo la nostra <a href="#" className="underline hover:text-dark">Privacy Policy</a>.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default BookingPage;