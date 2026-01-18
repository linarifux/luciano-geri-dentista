import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, MapPin, Award, Activity, Users } from 'lucide-react';

const InfoSection = () => {
  const containerRef = useRef(null);
  
  const stats = [
    { label: "Anni di Storia", value: "40+", icon: <Award size={20} /> },
    { label: "Pazienti Felici", value: "15k+", icon: <Users size={20} /> },
    { label: "Tecnologie", value: "Digital", icon: <Activity size={20} /> },
  ];

  const highlights = [
    {
      icon: <Award className="text-primary" size={28} />,
      title: "Eccellenza dal 1980",
      desc: "Quarant'anni di evoluzione costante per garantire i migliori standard clinici a Pisa."
    },
    {
      icon: <ShieldCheck className="text-primary" size={28} />,
      title: "Sicurezza Certificata",
      desc: "Protocolli di sterilizzazione di Classe B e materiali biocompatibili di origine tracciata."
    },
    {
      icon: <Clock className="text-primary" size={28} />,
      title: "Pronto Soccorso Dentale",
      desc: "Slot dedicati ogni giorno per gestire urgenze e traumi in tempi immediati."
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* --- Left Column: Narrative & Stats --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Tradizione e Futuro
            </div>

            <h3 className="text-5xl md:text-6xl font-black text-dark leading-[1.1] mb-8">
              La cura del dettaglio <br />
              <span className="text-primary">è la nostra firma.</span>
            </h3>

            <p className="text-gray-600 text-xl leading-relaxed mb-12 font-light">
              Lo Studio Geri non è solo una clinica, ma un centro di eccellenza dove la 
              <span className="text-dark font-bold"> tecnologia digitale</span> incontra la mano esperta 
              di chi ama questa professione da due generazioni.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-1 gap-8 mb-12">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-dark mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal Stats Bar */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black text-dark leading-none">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Right Column: Advanced Visual Composite --- */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {/* Main Image with decorative border */}
              <div className="p-4 bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100">
                <div className="aspect-[4/5] rounded-[30px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
                    alt="Studio Geri Interior" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
                  
                  {/* Location Label on Image */}
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} className="text-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest">Pisa Centre</span>
                    </div>
                    <div className="text-lg font-bold">Lungarno Pacinotti, 26</div>
                  </div>
                </div>
              </div>

              {/* Floating "Experience" Badge - Glassmorphism */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40 hidden md:block"
              >
                <div className="text-center">
                  <div className="text-4xl font-black text-primary leading-none">1980</div>
                  <div className="text-[10px] text-dark font-bold uppercase tracking-[0.2em] mt-2">Anno di Fondazione</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Robust Decorative Elements */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-20 border-dashed animate-[spin_20s_linear_infinite]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;