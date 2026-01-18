import { motion } from 'framer-motion';
import { Quote, Award, Sparkles } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-white/30 backdrop-blur-sm">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Professional Visual */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipNZnYtZbSvQmRUOfo0nPLG33_xSft4nitKK9dWz=s680-w680-h510-rw" 
                alt="Dott. Luciano Geri" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl z-20">
              <div className="text-4xl font-black leading-none">40+</div>
              <div className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-80">
                Anni di Eccellenza
              </div>
            </div>
          </motion.div>

          {/* Right: The Message */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Quote className="text-primary/20 mb-8" size={60} />
            
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <Sparkles size={16} /> Il Fondatore
            </h2>
            
            <h3 className="text-4xl md:text-5xl font-black text-dark leading-tight mb-8">
              "L'odontoiatria non è solo tecnica, è <span className="text-primary">ascolto ed empatia</span>."
            </h3>
            
            <p className="text-gray-600 text-xl leading-relaxed italic font-light mb-12">
              Dal 1980, la nostra missione è prenderci cura del vostro sorriso con le 
              tecnologie più avanzate del settore, senza mai dimenticare che dietro 
              ogni dente c'è una persona con le proprie emozioni e necessità.
            </p>

            <div className="flex items-center gap-6">
              <div className="h-px w-16 bg-primary"></div>
              <div>
                <h4 className="text-2xl font-serif text-dark tracking-tight">Dott. Luciano Geri</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Medico Chirurgo Odontoiatra • Direttore Sanitario
                </p>
              </div>
            </div>

            <div className="mt-12 flex gap-8">
               <div className="flex items-center gap-2 text-dark font-bold text-sm">
                  <Award className="text-primary" size={20} /> Ordine dei Medici di Pisa
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;