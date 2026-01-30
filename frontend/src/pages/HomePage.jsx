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
import { Calendar } from "lucide-react";

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

      {/* --- SYMPTOM CHECKER (Virtual Triage) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-3 origin-top-left scale-110 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">
              Non sai quale trattamento prenotare?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Usa il nostro assistente virtuale per individuare i sintomi e trovare la soluzione più adatta a te in pochi secondi.
            </p>
          </div>
          
          <SymptomChecker />
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