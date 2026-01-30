import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, MapPin, Award, Activity, Users, Sparkles } from 'lucide-react';

const InfoSection = () => {
  const containerRef = useRef(null);
  
  const stats = [
    { label: "Anni di Storia", value: "40+", icon: <Award size={20} /> },
    { label: "Pazienti Felici", value: "15k+", icon: <Users size={20} /> },
    { label: "Tecnologie", value: "Digital", icon: <Activity size={20} /> },
  ];

  const highlights = [
    {
      icon: <Award className="text-white" size={24} />,
      title: "Eccellenza dal 1980",
      desc: "Quarant'anni di evoluzione costante per garantire i migliori standard clinici a Pisa.",
      color: "bg-primary"
    },
    {
      icon: <ShieldCheck className="text-white" size={24} />,
      title: "Sicurezza Certificata",
      desc: "Protocolli di sterilizzazione di Classe B e materiali biocompatibili di origine tracciata.",
      color: "bg-secondary"
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: "Pronto Soccorso Dentale",
      desc: "Slot dedicati ogni giorno per gestire urgenze e traumi in tempi immediati.",
      color: "bg-dark"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#5EAEB4 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* --- Left Column: Narrative & Stats --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Tradizione e Futuro
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark leading-[1.1] mb-8">
              La cura del dettaglio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">è la nostra firma.</span>
            </h3>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 font-light">
              Lo Studio Geri non è solo una clinica, ma un centro di eccellenza dove la 
              <span className="text-dark font-bold"> tecnologia digitale</span> incontra la mano esperta 
              di chi ama questa professione da due generazioni.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-1 gap-8 mb-12">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${item.color} shadow-lg shadow-gray-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-dark mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal Stats Bar */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary bg-primary/5 p-2 rounded-lg">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black text-dark leading-none">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Right Column: Advanced Visual Composite --- */}
          <div className="relative lg:h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full"
            >
              {/* Main Image with decorative border */}
              <div className="p-4 bg-white rounded-[40px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] border border-gray-100">
                <div className="aspect-[4/5] rounded-[30px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" // New, clean dental interior
                    alt="Studio Geri Interior" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                  
                  {/* Location Label on Image */}
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full">
                         <MapPin size={14} className="text-white" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-2 py-1 rounded-md">Pisa Centre</span>
                    </div>
                    <div className="text-xl font-bold leading-tight">Lungarno Pacinotti, 26 <br/> 56125 Pisa (PI)</div>
                  </div>
                </div>
              </div>

              {/* Floating "Experience" Badge - Glassmorphism */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/50 hidden md:block"
              >
                <div className="text-center relative">
                  <Sparkles className="absolute -top-4 -right-4 text-secondary w-6 h-6 animate-pulse" />
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary leading-none">1980</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">Anno di Fondazione</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-primary/5 rounded-full -z-20 border-dashed animate-[spin_60s_linear_infinite]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;