import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const cases = [
  {
    title: "Riabilitazione Estetica",
    desc: "Faccette in ceramica su incisivi superiori per correggere diastema e discromie.",
    before: "https://images.unsplash.com/photo-1609840114035-1c99d592426c?auto=format&fit=crop&q=80&w=800", // Placeholder for 'Bad' teeth
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"   // Placeholder for 'Good' smile
  },
  {
    title: "Sbiancamento & Allineamento",
    desc: "Trattamento combinato con allineatori invisibili e sbiancamento LED.",
    before: "https://images.unsplash.com/photo-1570515668260-2a5b0f032b1d?auto=format&fit=crop&q=80&w=800&grayscale",
    after: "https://images.unsplash.com/photo-1570515668260-2a5b0f032b1d?auto=format&fit=crop&q=80&w=800"
  }
];

const CaseStudies = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Risultati Reali
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
            Prima & <span className="text-primary italic">Dopo</span>
          </h2>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {cases.map((item, index) => (
            <ComparisonCard key={index} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

const ComparisonCard = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (event, info) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newPos = ((info.point.x - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(100, Math.max(0, newPos)));
    }
  };

  // Fallback for click interaction
  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, newPos)));
  };

  return (
    <div className="group">
      {/* The Image Container */}
      <div 
        ref={containerRef}
        className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl select-none"
        onClick={handleClick}
      >
        {/* AFTER Image (Background) */}
        <img 
          src={item.after} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full z-10">
          Dopo
        </div>

        {/* BEFORE Image (Clipped on top) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={item.before} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover max-w-none" // max-w-none keeps image static while container shrinks
            style={{ width: containerRef.current?.offsetWidth }} // Keep internal image full width
            draggable="false"
          />
          {/* Overlay to darken 'Before' slightly for dramatic effect */}
          <div className="absolute inset-0 bg-dark/20 mix-blend-multiply"></div>
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            Prima
          </div>
        </div>

        {/* The Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary">
            <div className="flex gap-0.5">
               <ChevronLeft size={16} />
               <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 text-center px-6">
        <h3 className="text-xl font-black text-dark mb-2 flex items-center justify-center gap-2">
           <Sparkles size={18} className="text-primary" /> {item.title}
        </h3>
        <p className="text-gray-500 font-light text-sm">{item.desc}</p>
      </div>
    </div>
  );
};

export default CaseStudies;