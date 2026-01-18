import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Layers, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const services = [
  { 
    title: "Igiene e Prevenzione", 
    icon: <ShieldCheck size={32} />, 
    desc: "Protocolli avanzati di igiene orale e screening preventivi per la salute a lungo termine.",
    color: "bg-blue-50"
  },
  { 
    title: "Ortodonzia", 
    icon: <Sparkles size={32} />, 
    desc: "Sistemi invisibili e tecniche moderne per allineare il tuo sorriso in modo discreto.",
    color: "bg-teal-50"
  },
  { 
    title: "Implantologia", 
    icon: <Layers size={32} />, 
    desc: "Sostituzione permanente dei denti mancanti con materiali biocompatibili certificati.",
    color: "bg-indigo-50"
  },
  { 
    title: "Estetica Dentale", 
    icon: <Stethoscope size={32} />, 
    desc: "Faccette in ceramica e sbiancamento professionale per un'estetica naturale e radiosa.",
    color: "bg-cyan-50"
  }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ServicesGrid = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              Cosa facciamo
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">
              Specialisti nella cura <br />
              <span className="text-primary/80 italic">del tuo benessere.</span>
            </h2>
          </div>
          <Link to="/prenota" className="group flex items-center gap-2 text-dark font-bold hover:text-primary transition-colors">
            Vedi tutte le prestazioni 
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative p-10 bg-white/70 backdrop-blur-md border border-white/50 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Icon Background Circle */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${s.color} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                
                <h3 className="text-xl font-black text-dark mb-4 leading-tight tracking-tight">
                  {s.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {s.desc}
                </p>
                
                <Link 
                  to="/servizi" 
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all"
                >
                  Scopri di più <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Bar Placeholder */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale">
          {/* You can put insurance partners or tech logos here */}
          <span className="font-black text-2xl tracking-tighter">SIRONA</span>
          <span className="font-black text-2xl tracking-tighter">STRAUMANN</span>
          <span className="font-black text-2xl tracking-tighter">IVOCLAR</span>
          <span className="font-black text-2xl tracking-tighter">3M DENTAL</span>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;