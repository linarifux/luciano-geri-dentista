import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[100dvh] min-h-[550px] lg:h-[95vh] lg:min-h-[750px] w-full overflow-hidden flex items-center">
      
      {/* --- Video Background Container --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-105"
        >
          <source src="/6528843-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* --- High-Contrast Overlays --- */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
      </div>

      {/* --- Content Area --- */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-20 text-white">
        {/* Added padding top to clear the mobile navbar visual area */}
        <div className="max-w-4xl pt-16 sm:pt-0"> 
          
          {/* Top Badge - Compact & Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4 sm:mb-8"
          >
            <span className="h-[2px] w-6 sm:w-12 bg-primary shadow-[0_0_15px_rgba(94,174,180,0.8)]"></span>
            <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] text-primary-light drop-shadow-md">
              Pisa • Dal 1980
            </span>
          </motion.div>

          {/* Main Headline - Professional Mobile Scaling */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-6xl md:text-8xl font-black leading-[1.1] md:leading-[0.95] mb-4 sm:mb-10 tracking-tight drop-shadow-2xl"
          >
            Il tuo sorriso, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-white drop-shadow-none">
              la nostra missione.
            </span>
          </motion.h1>

          {/* Subtext - Clean & Legible */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-[90%] sm:max-w-2xl font-normal drop-shadow-lg"
          >
            Tecnologie d'avanguardia e cuore pulsante nel centro di Pisa. 
            Affida la tua salute dentale a chi ha fatto della cura un'arte.
          </motion.p>

          {/* Action Buttons - Professional & Compact on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6"
          >
            <Link
              to="/prenota"
              className="group flex items-center justify-center gap-3 bg-primary hover:bg-white hover:text-dark px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_10px_30px_rgba(94,174,180,0.2)] active:scale-95 w-full sm:w-auto"
            >
              <Calendar size={18} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
              PRENOTA ORA
              <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
            
            <Link to={'/servizi'} className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white hover:text-dark px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all active:scale-95">
                I NOSTRI SERVIZI
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators - Tighter Layout */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 sm:mt-20 flex flex-row gap-6 sm:gap-12 border-t border-white/10 pt-6 sm:pt-10"
          >
            <div className="flex items-center gap-3 group">
              <div className="p-1.5 sm:p-3 rounded-full bg-primary/10 border border-primary/20">
                <Award className="text-primary-light w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight text-gray-300">
                40+ Anni di <br /> <span className="text-white">Esperienza</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group">
              <div className="p-1.5 sm:p-3 rounded-full bg-primary/10 border border-primary/20">
                <ShieldCheck className="text-primary-light w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-tight text-gray-300">
                Protocolli <br /> <span className="text-white">Certificati</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Aesthetic Side Progress Line (Hidden on Mobile) */}
      <div className="absolute right-12 bottom-0 h-1/2 w-px bg-white/20 hidden lg:block">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full bg-primary"
        />
      </div>

    </section>
  );
};

export default Hero;