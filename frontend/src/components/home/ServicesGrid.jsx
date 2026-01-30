import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Sparkles, Layers, Stethoscope } from 'lucide-react';

const services = [
  { 
    id: 1,
    title: "Igiene & Prevenzione", 
    desc: "Il fondamento della salute orale. Protocolli GBT (Guided Biofilm Therapy) per una pulizia profonda e indolore.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-1"
  },
  { 
    id: 2,
    title: "Ortodonzia Invisibile", 
    desc: "Allinea il tuo sorriso senza che nessuno se ne accorga. Partner certificati Invisalign Diamond.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-2" // Wide card
  },
  { 
    id: 3,
    title: "Implantologia Avanzata", 
    desc: "Recupera la funzione masticatoria in 24 ore con la tecnica All-on-4 e chirurgia computer-guidata.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-2" // Wide card
  },
  { 
    id: 4,
    title: "Estetica Dentale", 
    desc: "Faccette in ceramica ultrasottili e sbiancamento LED per il sorriso che hai sempre sognato.",
    icon: <Stethoscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    colSpan: "md:col-span-1"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Eccellenza Clinica
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-[1.1] tracking-tight">
              Tecnologia e passione <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                al servizio del tuo sorriso.
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/servizi" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 font-bold text-sm"
            >
              Tutti i Trattamenti <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative rounded-[2.5rem] overflow-hidden bg-gray-100 ${service.colSpan}`}
            >
              {/* Image Background with Scale Effect */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                
                {/* Top Icon */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                    {service.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-dark flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 max-w-[90%]">
                    {service.desc}
                  </p>
                </div>

              </div>

              {/* Clickable Area */}
              <Link to="/servizi" className="absolute inset-0 z-20 focus:outline-none">
                <span className="sr-only">Vedi {service.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ServicesGrid;