import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    // Changed height to 100dvh for mobile (handles browser address bars better) and kept 95vh for desktop
    <section className="relative h-[100dvh] min-h-[600px] lg:h-[95vh] lg:min-h-[750px] w-full overflow-hidden flex items-center">
      
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
        {/* Adjusted gradient for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      </div>

      {/* --- Content Area --- */}
      {/* Reduced padding for mobile (px-4) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 text-white">
        <div className="max-w-4xl pt-10 sm:pt-0"> {/* Added pt-10 for mobile spacing from top */}
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="h-[2px] w-8 md:w-12 bg-primary shadow-[0_0_15px_rgba(94,174,180,0.8)]"></span>
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-primary-light drop-shadow-md">
              Pisa • Dal 1980
            </span>
          </motion.div>

          {/* Main Headline - Responsive Text Sizes */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] md:leading-[0.95] mb-6 md:mb-10 tracking-tighter drop-shadow-2xl"
          >
            Il tuo sorriso, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-white drop-shadow-none">
              la nostra missione.
            </span>
          </motion.h1>

          {/* Subtext - Adjusted for readability on small screens */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed max-w-xl md:max-w-2xl font-medium drop-shadow-lg"
          >
            Tecnologie d'avanguardia e cuore pulsante nel centro di Pisa. 
            Affida la tua salute dentale a chi ha fatto della cura un'arte.
          </motion.p>

          {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6"
          >
            <Link
              to="/prenota"
              className="group flex items-center justify-center gap-4 bg-primary hover:bg-white hover:text-dark px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all shadow-[0_20px_50px_rgba(94,174,180,0.3)] hover:scale-105 w-full sm:w-auto"
            >
              <Calendar size={20} className="md:w-6 md:h-6" strokeWidth={3} />
              PRENOTA ORA
              <ChevronRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
            
            <button className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:bg-white/100 hover:text-dark px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all w-full sm:w-auto">
              I NOSTRI SERVIZI
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 md:mt-20 flex flex-row flex-wrap gap-x-8 gap-y-6 border-t border-white/20 pt-8 md:pt-10"
          >
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="p-2 md:p-3 rounded-full bg-primary/20 border border-primary/30">
                <Award className="text-primary-light w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">
                40+ Anni di <br /> <span className="text-primary-light">Esperienza</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="p-2 md:p-3 rounded-full bg-primary/20 border border-primary/30">
                <ShieldCheck className="text-primary-light w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">
                Protocolli <br /> <span className="text-primary-light">Certificati</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Aesthetic Side Progress Line (Hidden on Mobile/Tablet) */}
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