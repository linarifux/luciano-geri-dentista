import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Calendar, ChevronRight, Award, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const ref = useRef(null);
  
  // --- Parallax Mouse Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    let x = (clientX - left) / width;
    let y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] min-h-[650px] w-full overflow-hidden flex items-center justify-center perspective-1000"
    >
      
      {/* --- Video Background --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-110 filter brightness-[0.7] blur-[2px]"
        >
          <source src="/6528843-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10 mix-blend-overlay"></div>
      </div>

      {/* --- Floating Interactive Elements (Parallax) --- */}
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
      <div className="container mx-auto px-6 relative z-20 text-white flex flex-col justify-center h-full">
        <div className="max-w-4xl mx-auto text-center lg:text-left pt-16"> 
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto lg:mx-0"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Studio Geri • Pisa
            </span>
          </motion.div>

          {/* Headline with Humor */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom springy ease
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1] mb-6 tracking-tight drop-shadow-2xl"
          >
            Odi andare <br className="hidden md:block"/>
            dal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">dentista?</span>
          </motion.h1>

          {/* Typewriter Subtext */}
          <div className="h-24 sm:h-20 mb-8 flex items-center justify-center lg:justify-start">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-2xl text-gray-200 font-medium max-w-2xl leading-relaxed"
            >
              Siamo qui per farti cambiare idea. <br className="hidden sm:block"/>
              <span className="text-primary-light font-bold">Niente dolore</span>, zero stress e (quasi) nessuna predica sul filo interdentale.
            </motion.p>
          </div>

          {/* Bouncy Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          >
            <Link to="/prenota" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-[0_0_40px_-10px_rgba(94,174,180,0.6)] hover:shadow-[0_0_60px_-15px_rgba(94,174,180,0.8)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Calendar size={20} className="relative z-10" />
                <span className="relative z-10">PRENOTA ORA</span>
                <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link to={'/servizi'} className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 px-8 py-5 rounded-2xl font-bold text-lg transition-all"
              >
                Scopri Servizi
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof / Trust */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-white/10 pt-8"
          >
            <TrustItem icon={<Award />} top="Esperienza" bot="Dal 1980" />
            <TrustItem icon={<ShieldCheck />} top="Garanzia" bot="Certificata" />
            <TrustItem icon={<Smile />} top="Pazienti" bot="Felici" />
          </motion.div>

        </div>
      </div>

      {/* --- Scroll Indicator --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scorri</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
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
  <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-default">
    <div className="p-2 rounded-lg bg-white/10 text-primary-light">
      {icon}
    </div>
    <div className="text-xs font-medium text-gray-300 uppercase tracking-wide leading-tight">
      <span className="block text-white font-bold">{top}</span>
      {bot}
    </div>
  </div>
);

export default Hero;