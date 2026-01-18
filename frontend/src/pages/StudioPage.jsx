import { motion } from 'framer-motion';
import { 
  Award, Users, Heart, Microscope, 
  MapPin, Clock, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Dott. Luciano Geri",
    role: "Direttore Sanitario",
    desc: "Fondatore dello studio. Esperto in chirurgia orale e riabilitazioni complesse. Da 40 anni il punto di riferimento per i pazienti.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dott.ssa Elena Geri",
    role: "Ortodonzia e Pedodonzia",
    desc: "Specializzata nella cura dei piccoli pazienti e nell'ortodonzia invisibile. Porta innovazione e dolcezza nel team.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dott. Marco Rossi",
    role: "Igiene e Parodontologia",
    desc: "Dedito alla prevenzione e alla cura dei tessuti gengivali. La sua precisione è garanzia di salute a lungo termine.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
  }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800", // Waiting room
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", // Chair
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"  // Instruments
];

const StudioPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* --- Fixed Ambient Background --- */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-32">
        
        {/* --- Hero Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
              La Nostra Storia
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[0.95] mb-8">
              Non solo medici, <br />
              <span className="text-primary italic">una famiglia.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed font-light mb-8">
              Lo Studio Dentistico Geri nasce nel 1980 nel cuore storico di Pisa. 
              Da allora, uniamo la tradizione medica italiana con le più moderne 
              tecnologie digitali per offrire un'esperienza di cura senza compromessi.
            </p>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl text-primary"><Award size={24} /></div>
                <div>
                  <div className="font-black text-2xl text-dark">40+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Anni di Attività</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl text-primary"><Users size={24} /></div>
                <div>
                  <div className="font-black text-2xl text-dark">15k</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Pazienti Curati</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1000" 
              alt="Studio Interior" 
              className="rounded-[3rem] shadow-2xl relative z-10"
            />
            {/* Abstract Shapes */}
            <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-primary/10 rounded-[3rem] -z-0"></div>
          </motion.div>
        </div>

        {/* --- Philosophy Grid --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-dark mb-4">La Filosofia dello Studio</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Tre pilastri fondamentali guidano il nostro lavoro quotidiano per garantirti l'eccellenza.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Heart size={32} />, 
                title: "Empatia", 
                desc: "Ascoltiamo le tue paure e i tuoi bisogni. Il paziente è al centro, non il dente." 
              },
              { 
                icon: <Microscope size={32} />, 
                title: "Tecnologia", 
                desc: "Scanner intraorali, TAC 3D e laser. Investiamo costantemente nel futuro." 
              },
              { 
                icon: <CheckCircle2 size={32} />, 
                title: "Qualità", 
                desc: "Materiali certificati e protocolli rigorosi. Nessun compromesso sulla tua salute." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2rem] shadow-lg border border-gray-50 text-center hover:border-primary/20 transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 text-primary rounded-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-dark mb-4">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- The Team Section --- */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                Lo Staff Medico
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tighter">
                I professionisti del <br /> tuo sorriso.
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-right leading-relaxed font-light hidden md:block">
              Un team multidisciplinare in continuo aggiornamento per offrirti cure complete a 360 gradi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Name Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary-light mb-1">{member.role}</p>
                    <h3 className="text-2xl font-black">{member.name}</h3>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed font-light text-sm pl-2 border-l-2 border-primary/20">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Gallery & Map Section --- */}
        <section className="mb-32">
           <h2 className="text-3xl font-black text-dark mb-10 text-center">I nostri spazi</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2 h-64 md:h-80 rounded-[2rem] overflow-hidden relative group shadow-lg">
                <img src={galleryImages[0]} alt="Clinic" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="h-64 md:h-80 rounded-[2rem] overflow-hidden relative group shadow-lg">
                <img src={galleryImages[1]} alt="Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="h-64 md:h-80 rounded-[2rem] overflow-hidden relative group shadow-lg">
                <img src={galleryImages[2]} alt="Tools" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             </div>
             
             {/* --- Interactive Google Map --- */}
             <div className="md:col-span-2 h-64 md:h-80 rounded-[2rem] overflow-hidden relative shadow-lg border border-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.757856463911!2d10.394654!3d43.715581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2443105f92ec734f%3A0x48e65ed3b9ffa943!2sStudio%20Dentistico%20Luciano%20Geri!5e0!3m2!1sen!2sbd!4v1768766412063!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                
                {/* Floating Location Badge (Non-blocking) */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl pointer-events-none">
                   <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
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
        </section>

        {/* --- Final CTA --- */}
        <div className="bg-[#0F172A] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
             <Clock className="mx-auto text-primary mb-6" size={48} />
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Pronto a conoscerci?</h2>
             <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-light">
               Prenota una prima visita conoscitiva senza impegno. Valuteremo insieme lo stato di salute del tuo sorriso.
             </p>
             <Link 
               to="/prenota" 
               className="inline-block bg-primary hover:bg-white hover:text-dark text-white font-black uppercase tracking-widest py-5 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20"
             >
               Prenota Appuntamento
             </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        </div>

      </div>
    </div>
  );
};

export default StudioPage;