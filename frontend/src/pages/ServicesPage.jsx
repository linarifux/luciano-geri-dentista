import { motion } from 'framer-motion';
import { 
  ShieldCheck, Sparkles, Layers, Stethoscope, 
  Plus, ChevronRight, Activity, HeartPulse 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const allServices = [
  {
    category: "Odontoiatria Preventiva",
    items: [
      { 
        title: "Igiene e Profilassi", 
        desc: "Ablazione tartaro con tecnologia Air-Flow per una pulizia profonda e indolore, rimuovendo macchie e biofilm batterico.",
        icon: <ShieldCheck size={24} />,
        // Professional dental hygiene image
        image: "https://images.unsplash.com/photo-1606811841689-230391b6d806?auto=format&fit=crop&q=80&w=800"
      },
      { 
        title: "Sigillature", 
        desc: "Protezione efficace dei solchi dentali dei molari permanenti per prevenire la carie nei pazienti più giovani.",
        icon: <Activity size={24} />,
        // Close-up of a dentist working on a child's tooth
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    category: "Chirurgia e Impianti",
    items: [
      { 
        title: "Implantologia Computer-Assistita", 
        desc: "Pianificazione 3D digitale per l'inserimento di impianti dentali con precisione millimetrica e procedure mini-invasive.",
        icon: <Layers size={24} />,
        // Image of a digital 3D dental scan or modern implant tool
        image: "https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?auto=format&fit=crop&q=80&w=800"
      },
      { 
        title: "Chirurgia Orale Avanzata", 
        desc: "Estrazioni complesse (denti del giudizio inclusi), cistectomie e rigenerazione ossea guidata con protocolli sicuri.",
        icon: <Plus size={24} />,
        // Surgeon in a sterile environment
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    category: "Estetica e Ortodonzia",
    items: [
      { 
        title: "Sbiancamento LED Professionale", 
        desc: "Trattamenti alla poltrona con lampade LED di ultima generazione per un sorriso visibilmente più bianco in una sola seduta.",
        icon: <Sparkles size={24} />,
        // Close-up of a bright, white smile
        image: "https://images.unsplash.com/photo-1570515668260-2a5b0f032b1d?auto=format&fit=crop&q=80&w=800"
      },
      { 
        title: "Ortodonzia Invisibile (Aligner)", 
        desc: "Allineamento dentale tramite una serie di mascherine trasparenti rimovibili, per un trattamento discreto e confortevole.",
        icon: <HeartPulse size={24} />,
        // Image of clear aligners or a person smiling with invisible braces
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="relative min-h-screen bg-white py-10">
      {/* Background Decor - Fixed for smooth scrolling */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-32 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4 block"
          >
            Eccellenza a Pisa
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[0.9]"
          >
            Le nostre <br /> <span className="text-primary italic">prestazioni.</span>
          </motion.h1>
        </div>

        {/* Categories Grid */}
        <div className="space-y-32">
          {allServices.map((cat, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-2xl font-black text-dark uppercase tracking-tight">{cat.category}</h2>
                <div className="h-px flex-grow bg-gray-100"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {cat.items.map((service, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ y: -8 }}
                    className="group bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 overflow-hidden flex flex-col sm:flex-row"
                  >
                    {/* Image Section */}
                    <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent sm:bg-gradient-to-r"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 sm:p-10 sm:w-3/5 flex flex-col">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          {service.icon}
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Service 0{sIdx + 1}</span>
                      </div>
                      
                      <h3 className="text-xl font-black text-dark mb-4 leading-tight">{service.title}</h3>
                      <p className="text-gray-500 leading-relaxed mb-8 font-light text-sm flex-grow">
                        {service.desc}
                      </p>
                      
                      <Link to="/prenota" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all mt-auto">
                        Richiedi info <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-[#0F172A] rounded-[3rem] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Non hai trovato quello che cerchi?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg font-light">
              Il nostro studio copre ogni branca dell'odontoiatria moderna. Contattaci per una consulenza personalizzata.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/prenota" className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-white hover:text-dark transition-all">
                Prenota Visita
              </Link>
              <a href="tel:+39050123456" className="w-full sm:w-auto border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                Chiamaci Ora
              </a>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;