import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import ServicesGrid from "../components/home/ServicesGrid";
import InfoSection from "../components/home/InfoSection";
import BookingForm from "../components/home/BookingForm"; 
import ReviewSection from "../components/home/ReviewSection";
import Timeline from "../components/home/Timeline";
import FounderSection from "../components/home/FounderSection";
import CaseStudies from "../components/home/CaseStudies";
import InstagramFeed from "../components/home/InstagramFeed";
import FAQ from "../components/home/FAQ";
import SymptomChecker from "../components/home/SymptomChecker"; // Imported
import { Calendar, Activity } from "lucide-react";
import BrandMarquee from "../components/home/BrandMarquee";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <InfoSection />
      <ServicesGrid />
      <BrandMarquee />

      {/* --- SYMPTOM CHECKER SECTION --- */}
<section className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
  
  {/* Ambient Background Glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
    </div>
  </div>

  <div className="max-w-4xl mx-auto px-6 relative z-10">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-primary text-xs font-bold uppercase tracking-widest mb-6"
      >
        <Activity size={14} className="animate-pulse" /> Virtual Triage
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight tracking-tight"
      >
        Indeciso sul trattamento? <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Chiedi al nostro assistente.
        </span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed font-light"
      >
        Un percorso guidato veloce per identificare i tuoi sintomi e ricevere un consiglio immediato su cosa prenotare.
      </motion.p>
    </div>
    
    {/* Interactive Tool Wrapper with Depth */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      {/* Glow Effect behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-white to-secondary/20 rounded-[3rem] blur-xl opacity-50"></div>
      
      <div className="relative">
        <SymptomChecker />
      </div>
    </motion.div>

  </div>
</section>

      {/* --- BOOKING SECTION WRAPPER --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Dark Background with Gradient */}
        <div className="absolute inset-0 bg-[#0F172A] -z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-30 -z-10"></div>
        
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-bold uppercase tracking-widest text-primary">
                <Calendar size={14} />
                <span>Prenotazione Online</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                Il tuo prossimo appuntamento è a un click di distanza.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Seleziona il trattamento, scegli l'orario che preferisci e ricevi subito la conferma. Senza attese, senza telefonate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-black text-white">24/7</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-bold">Prenotazione Attiva</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-bold">Privacy Garantita</div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="relative">
                {/* Form Container */}
                <div className="transform lg:translate-x-10">
                    <BookingForm />
                </div>
            </div>

          </div>
        </div>
      </section>

      <CaseStudies />
      <FounderSection />
      <FAQ />
      <InstagramFeed />
      <Timeline />
      <ReviewSection />
      
    </motion.div>
  );
};

export default HomePage;