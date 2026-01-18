import { motion } from 'framer-motion';
import { Calendar, Award, Microscope, Users, Star } from 'lucide-react';

const milestones = [
  {
    year: "1980",
    title: "La Fondazione",
    desc: "Il Dott. Luciano Geri apre lo studio nel cuore di Pisa, con l'obiettivo di offrire cure odontoiatriche di alta qualità e vicine al paziente.",
    icon: <Calendar className="text-white" size={20} />,
    side: "left"
  },
  {
    year: "1995",
    title: "Nuove Tecnologie",
    desc: "Siamo tra i primi studi in Toscana ad adottare la radiografia digitale, riducendo l'esposizione ai raggi X per i nostri pazienti.",
    icon: <Microscope className="text-white" size={20} />,
    side: "right"
  },
  {
    year: "2010",
    title: "Passaggio Generazionale",
    desc: "Lo studio si espande. Nuovi specialisti entrano nel team, portando competenze avanzate in chirurgia implantare e ortodonzia estetica.",
    icon: <Users className="text-white" size={20} />,
    side: "left"
  },
  {
    year: "2024",
    title: "Eccellenza Digitale",
    desc: "Implementazione completa del flusso digitale: scanner intraorali 3D e impronte digitali per un comfort totale e massima precisione.",
    icon: <Star className="text-white" size={20} />,
    side: "right"
  }
];

const Timeline = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4">La Nostra Storia</h2>
          <h3 className="text-4xl md:text-5xl font-black text-dark">Quattro decenni di <br/> <span className="text-primary">passione e innovazione</span></h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-linear-to-b from-primary/50 via-secondary/30 to-transparent hidden md:block"></div>

          <div className="space-y-24">
            {milestones.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 w-full`}>
                
                {/* Content Column */}
                <div className={`w-full md:w-5/12 ${item.side === 'right' ? 'md:order-3 md:text-left' : 'md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="p-8 bg-white/60 backdrop-blur-md rounded-4xl border border-white/40 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <span className="text-3xl font-black text-primary mb-2 block">{item.year}</span>
                    <h4 className="text-xl font-black text-dark mb-4 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>

                {/* Center Icon Column */}
                <div className="relative z-10 w-full md:w-2/12 flex justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 bg-primary rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center border-4 border-white"
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Empty Space Column (Desktop) */}
                <div className="hidden md:block md:w-5/12"></div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;