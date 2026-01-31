import { useRef } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Calendar, ChevronRight, Award, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const ref = useRef(null);
  
  // --- Parallax Mouse Logic (Only active on desktop) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    // Only calculate parallax on larger screens to save mobile resources
    if (window.innerWidth >= 1024) {
      let { left, top, width, height } = currentTarget.getBoundingClientRect();
      let x = (clientX - left) / width;
      let y = (clientY - top) / height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center perspective-1000 bg-black"
    >
      
      {/* --- Video Background --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-110 filter brightness-[0.6] blur-[2px]" // Darkened slightly for better text readability on mobile
        >
          <source src="/6528843-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/40 lg:to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10 mix-blend-overlay"></div>
      </div>

      {/* --- Floating Interactive Elements (Desktop Only) --- */}
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={20} className="top-[15%] left-[10%] text-primary/80 hidden lg:block">
        <Sparkles size={48} />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={40} className="bottom-[20%] right-[10%] text-secondary/80 hidden lg:block">
        <ShieldCheck size={64} />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={10} className="top-[20%] right-[20%] text-white/50 hidden lg:block">
        <Smile size={32} />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={30} className="bottom-[15%] left-[15%] text-pink-400/60 hidden lg:block">
        <Heart size={40} />
      </FloatingIcon>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 relative z-20 text-white flex flex-col justify-center h-full pt-20 lg:pt-0"> {/* Added pt-20 for mobile navbar clearance */}
        <div className="max-w-4xl mx-auto lg:mx-0 w-full text-center lg:text-left flex flex-col items-center lg:items-start"> 
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
              Studio Geri • Pisa
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] sm:leading-[1] mb-6 tracking-tight drop-shadow-2xl"
          >
            Odi andare <br className="hidden sm:block"/>
            dal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">dentista?</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-xl lg:text-2xl text-gray-200 font-medium max-w-xl lg:max-w-2xl leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0"
          >
            Siamo qui per farti cambiare idea. <br className="hidden sm:block"/>
            <span className="text-primary-light font-bold">Niente dolore</span>, zero stress e (quasi) nessuna predica sul filo interdentale.
          </motion.p>

          {/* Buttons Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/prenota" className="w-full sm:w-auto">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-[0_0_40px_-10px_rgba(94,174,180,0.6)] hover:shadow-[0_0_60px_-15px_rgba(94,174,180,0.8)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Calendar size={18} className="relative z-10 sm:w-5 sm:h-5" />
                <span className="relative z-10">PRENOTA ORA</span>
                <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
              </motion.button>
            </Link>
            
            <Link to={'/servizi'} className="w-full sm:w-auto">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all"
              >
                Scopri Servizi
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof (Responsive Grid) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 sm:mt-16 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 border-t border-white/10 pt-8 w-full sm:w-auto"
          >
            <TrustItem icon={<Award size={20} />} top="Esperienza" bot="Dal 1980" />
            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
            <TrustItem icon={<ShieldCheck size={20} />} top="Garanzia" bot="Certificata" />
            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
            <TrustItem icon={<Smile size={20} />} top="Pazienti" bot="Felici" />
          </motion.div>

        </div>
      </div>

      {/* --- Scroll Indicator (Hidden on very short screens) --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white transition-colors hidden sm:flex"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scorri</span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>

    </section>
  );
};

// --- Helper Components ---

const FloatingIcon = ({ mouseX, mouseY, depth, children, className }) => {
  const x = useTransform(mouseX, [0, 1], [-depth, depth]);
  const y = useTransform(mouseY, [0, 1], [-depth, depth]);

  return (
    <motion.div 
      style={{ x, y }} 
      className={`absolute z-10 pointer-events-none opacity-60 mix-blend-screen blur-[1px] ${className}`}
    >
      {children}
    </motion.div>
  );
};

const TrustItem = ({ icon, top, bot }) => (
  <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-default bg-white/5 sm:bg-transparent px-4 sm:px-0 py-2 sm:py-0 rounded-xl sm:rounded-none border border-white/5 sm:border-none">
    <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-primary-light">
      {icon}
    </div>
    <div className="text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-wide leading-tight text-left">
      <span className="block text-white font-bold">{top}</span>
      {bot}
    </div>
  </div>
);

export default Hero;