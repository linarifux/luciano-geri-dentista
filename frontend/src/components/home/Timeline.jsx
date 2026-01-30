import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Microscope, Users, Star, ArrowDown } from 'lucide-react';

const milestones = [
  {
    year: "1980",
    title: "La Fondazione",
    desc: "Il Dott. Luciano Geri apre lo studio nel cuore di Pisa, con l'obiettivo di offrire cure odontoiatriche di alta qualità e vicine al paziente.",
    icon: <Calendar className="text-white" size={20} />,
    color: "bg-blue-500",
    side: "left"
  },
  {
    year: "1995",
    title: "Nuove Tecnologie",
    desc: "Siamo tra i primi studi in Toscana ad adottare la radiografia digitale, riducendo l'esposizione ai raggi X per i nostri pazienti.",
    icon: <Microscope className="text-white" size={20} />,
    color: "bg-teal-500",
    side: "right"
  },
  {
    year: "2010",
    title: "Passaggio Generazionale",
    desc: "Lo studio si espande. Nuovi specialisti entrano nel team, portando competenze avanzate in chirurgia implantare e ortodonzia estetica.",
    icon: <Users className="text-white" size={20} />,
    color: "bg-purple-500",
    side: "left"
  },
  {
    year: "2024",
    title: "Eccellenza Digitale",
    desc: "Implementazione completa del flusso digitale: scanner intraorali 3D e impronte digitali per un comfort totale e massima precisione.",
    icon: <Star className="text-white" size={20} />,
    color: "bg-primary",
    side: "right"
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4">La Nostra Storia</h2>
            <h3 className="text-4xl md:text-5xl font-black text-dark">Quattro decenni di <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">passione e innovazione</span></h3>
          </motion.div>
        </div>

        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-100 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-primary shadow-[0_0_10px_rgba(94,174,180,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {milestones.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* End Marker */}
          <div className="flex justify-center mt-12">
            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-300">
               <ArrowDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const isRight = item.side === 'right';
  
  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 w-full relative group`}>
      
      {/* Content Column */}
      <div className={`w-full md:w-5/12 ${isRight ? 'md:order-3 md:text-left' : 'md:text-right'}`}>
        <motion.div
          initial={{ opacity: 0, x: isRight ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`
            relative p-8 rounded-[2rem] border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300
            ${isRight ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-gradient-to-bl from-white to-gray-50'}
          `}
        >
          {/* Year Badge */}
          <div className={`
             absolute top-0 transform -translate-y-1/2 px-4 py-1 rounded-full bg-dark text-white text-xs font-bold tracking-widest shadow-lg
             ${isRight ? 'left-8' : 'right-8'}
          `}>
             {item.year}
          </div>

          <h4 className="text-2xl font-black text-dark mb-3 uppercase tracking-tight mt-2">{item.title}</h4>
          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          
          {/* Subtle decoration */}
          <div className={`absolute bottom-4 ${isRight ? 'right-4' : 'left-4'} w-12 h-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full`} />
        </motion.div>
      </div>

      {/* Center Icon Column */}
      <div className="relative z-10 w-full md:w-2/12 flex justify-center py-4 md:py-0">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`
            w-14 h-14 rounded-2xl shadow-xl shadow-gray-300/50 flex items-center justify-center border-[6px] border-white relative z-20
            ${item.color}
          `}
        >
          {item.icon}
        </motion.div>
        
        {/* Connector Line (Mobile only) */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-100 md:hidden -z-10"></div>
      </div>

      {/* Empty Space Column (Desktop) */}
      <div className="hidden md:block md:w-5/12"></div>

    </div>
  );
};

export default Timeline;