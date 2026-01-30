import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DATA: CLINICAL CASES ---
// Using high-quality, reliable Unsplash images for dental close-ups.
const CASES = [
  {
    id: 1,
    category: 'Estetica',
    title: "Riabilitazione Estetica Completa",
    desc: "Applicazione di 6 faccette in ceramica per correggere diastema, forma e colore. Risultato naturale e armonioso.",
    before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1606811841689-230391b42b94?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: 'Ortodonzia',
    title: "Allineamento Invisibile",
    desc: "Trattamento ortodontico con allineatori trasparenti durato 12 mesi per risolvere affollamento inferiore.",
    before: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: 'Sbiancamento',
    title: "Sbiancamento Professionale LED",
    desc: "Singola seduta di 60 minuti. Il paziente ha ottenuto un sorriso più luminoso di 3 tonalità.",
    before: "https://images.unsplash.com/photo-1609840114035-1c99d592426c?auto=format&fit=crop&q=80&w=800",
    after: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    category: 'Implantologia',
    title: "Impianto Singolo Molare",
    desc: "Sostituzione di un dente mancante con impianto in titanio e corona in zirconio-ceramica.",
    before: "https://images.unsplash.com/photo-1588776814546-0b8b273b429f?auto=format&fit=crop&q=80&w=800&grayscale", // Grayscale to simulate 'before'/missing
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  }
];

const CATEGORIES = ['Tutti', 'Estetica', 'Ortodonzia', 'Sbiancamento', 'Implantologia'];

const SmileGallery = () => {
  const [filter, setFilter] = useState('Tutti');

  const filteredCases = filter === 'Tutti' 
    ? CASES 
    : CASES.filter(c => c.category === filter);

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#0F172A] text-white overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10 text-primary-light"
          >
            <Camera size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Prima & <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-white">Dopo</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Ogni sorriso racconta una storia. Sfoglia la galleria dei nostri pazienti e scopri come abbiamo trasformato la loro vita (e i loro selfie).
          </motion.p>
        </div>
      </section>

      {/* --- FILTER BAR --- */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex sm:justify-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  filter === cat 
                    ? 'bg-dark text-white border-dark shadow-lg' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  {/* Slider Component */}
                  <BeforeAfterCard item={item} />

                  {/* Text Content */}
                  <div className="mt-8 px-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-dark mb-3">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* Booking CTA for this specific case type */}
                      <Link 
                        to="/prenota"
                        className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      >
                        <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCases.length === 0 && (
            <div className="text-center py-32">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4 text-gray-400">
                <Camera size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-600">Nessun caso trovato</h3>
              <p className="text-gray-400">Prova a selezionare un'altra categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-6">
            Vuoi essere il prossimo caso di successo?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            Prenota una consulenza estetica gratuita. Analizzeremo il tuo sorriso e ti mostreremo cosa è possibile realizzare.
          </p>
          <Link 
            to="/prenota" 
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Prenota Consulenza <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};

// --- SUB-COMPONENT: SLIDER CARD ---
const BeforeAfterCard = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, newPos)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[300px] sm:h-[400px] w-full rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl shadow-gray-200 select-none touch-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
      onClick={handleMove}
    >
      {/* AFTER Image (Background) */}
      <img 
        src={item.after} 
        alt={`Dopo - ${item.title}`} 
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute top-5 right-5 bg-white/90 text-dark backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm z-10 pointer-events-none">
        Dopo
      </div>

      {/* BEFORE Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={item.before} 
          alt={`Prima - ${item.title}`} 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
          draggable="false"
        />
        {/* Shadow Overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-5 left-5 bg-black/60 text-white backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm pointer-events-none">
          Prima
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary transition-transform hover:scale-110 active:scale-95">
          <div className="flex gap-0.5">
            <ChevronLeft size={18} strokeWidth={3} />
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmileGallery;