import { motion } from 'framer-motion';
import { 
  Award, Users, Heart, Microscope, 
  MapPin, Clock, CheckCircle2, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';



// Gallery Data
const galleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800", // Waiting room
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", // Chair
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"  // Instruments
];

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const StudioPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-40 lg:pb-32">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1 relative z-10"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200 text-xs font-bold uppercase tracking-widest text-primary mb-8">
              <Award size={14} /> La Nostra Storia
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[1.1] mb-8">
              Non solo medici, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">una famiglia.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-gray-500 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-lg">
              Lo Studio Dentistico Geri nasce nel 1980 nel cuore storico di Pisa. 
              Da allora, uniamo la tradizione medica italiana con le più moderne 
              tecnologie digitali.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-10 border-t border-gray-100 pt-8">
              <div>
                <div className="text-4xl font-black text-dark mb-1">40+</div>
                <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Anni di Eccellenza</div>
              </div>
              <div>
                <div className="text-4xl font-black text-dark mb-1">15k</div>
                <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Pazienti Soddisfatti</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1000" 
                alt="Studio Interior" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            {/* Decorative Outline */}
            <div className="absolute -inset-4 border-2 border-primary/10 rounded-[3.5rem] -z-10"></div>
          </motion.div>

        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6 tracking-tight">La Filosofia dello Studio</h2>
            <p className="text-gray-500 text-lg">
              Tre pilastri fondamentali guidano il nostro lavoro quotidiano per garantirti l'eccellenza medica e umana.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Heart size={32} />, 
                title: "Empatia", 
                desc: "Ascoltiamo le tue paure e i tuoi bisogni. Il paziente è al centro, non il dente.",
                color: "bg-red-50 text-red-500"
              },
              { 
                icon: <Microscope size={32} />, 
                title: "Tecnologia", 
                desc: "Scanner intraorali, TAC 3D e laser. Investiamo costantemente nel futuro.",
                color: "bg-blue-50 text-blue-500"
              },
              { 
                icon: <CheckCircle2 size={32} />, 
                title: "Qualità", 
                desc: "Materiali certificati e protocolli rigorosi. Nessun compromesso sulla tua salute.",
                color: "bg-green-50 text-green-500"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${item.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* --- GALLERY & MAP --- */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
                <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight">I Nostri Spazi</h2>
                <p className="text-gray-500">Un ambiente moderno, pulito e rilassante pensato per il tuo comfort.</p>
             </div>
             <a href="https://maps.app.goo.gl/esdxrocBEujEEmGd6" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-primary hover:text-dark transition-colors">
                Vedi su Google Maps <ArrowRight size={18} />
             </a>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
             {/* Large Image */}
             <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 row-span-1 rounded-[2.5rem] overflow-hidden relative shadow-lg group">
                <img src={galleryImages[0]} alt="Clinic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
             </motion.div>
             
             {/* Small Image 1 */}
             <motion.div whileHover={{ scale: 1.02 }} className="rounded-[2.5rem] overflow-hidden relative shadow-lg group">
                <img src={galleryImages[1]} alt="Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </motion.div>
             
             {/* Small Image 2 */}
             <motion.div whileHover={{ scale: 1.02 }} className="rounded-[2.5rem] overflow-hidden relative shadow-lg group">
                <img src={galleryImages[2]} alt="Tools" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </motion.div>
             
             {/* Map Card */}
             <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden relative shadow-lg border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.757857854717!2d10.39207907609068!3d43.7155809710993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2443105f92ec734f%3A0x48e65ed3b9ffa943!2sStudio%20Dentistico%20Luciano%20Geri!5e0!3m2!1sen!2sbd!4v1769860402459!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl pointer-events-none border border-white/50">
                   <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-full text-primary animate-pulse">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-dark text-sm">Sede Principale</h4>
                         <p className="text-xs text-gray-500">Lungarno Pacinotti, 26</p>
                      </div>
                   </div>
                </div>
             </div>
           </div>
         </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0F172A] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Background Noise & Gradient */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
             <Clock className="mx-auto text-primary mb-8" size={56} />
             <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Pronto a conoscerci?</h2>
             <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
               Prenota una prima visita conoscitiva senza impegno. Valuteremo insieme lo stato di salute del tuo sorriso e il percorso migliore per te.
             </p>
             <Link 
               to="/prenota" 
               className="inline-flex items-center gap-3 bg-primary hover:bg-white hover:text-dark text-white font-bold uppercase tracking-widest py-5 px-12 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:scale-105"
             >
               Prenota Appuntamento <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StudioPage;