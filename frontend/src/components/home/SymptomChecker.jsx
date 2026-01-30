import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, AlertCircle, Thermometer, Zap, Clock, SparklesIcon, DropletIcon, AlertCircleIcon, ActivityIcon, ThermometerIcon, UtensilsIcon, SunIcon, AlignJustifyIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DECISION TREE DATA ---
const STEPS = {
  start: {
    question: "Cosa ti preoccupa oggi?",
    options: [
      { label: "Dolore ai denti", next: 'pain_type', icon: <Zap /> },
      { label: "Estetica / Colore", next: 'esthetic', icon: <SparklesIcon /> },
      { label: "Gengive che sanguinano", next: 'gums', icon: <DropletIcon /> },
      { label: "Dente rotto o mancante", next: 'broken', icon: <AlertCircleIcon /> },
    ]
  },
  pain_type: {
    question: "Che tipo di dolore avverti?",
    options: [
      { label: "Forte e pulsante", next: 'result_urgent', icon: <ActivityIcon /> },
      { label: "Sensibilità al caldo/freddo", next: 'result_sensitive', icon: <ThermometerIcon /> },
      { label: "Fastidio alla masticazione", next: 'result_checkup', icon: <UtensilsIcon /> },
    ]
  },
  esthetic: {
    question: "Qual è il tuo obiettivo?",
    options: [
      { label: "Denti più bianchi", next: 'result_whitening', icon: <SunIcon /> },
      { label: "Allineare i denti", next: 'result_invisalign', icon: <AlignJustifyIcon /> },
    ]
  },
  // ... (You can expand this tree easily)
};

// --- RESULTS DATA ---
const RESULTS = {
  result_urgent: {
    title: "Urgenza Possibile",
    desc: "Potrebbe trattarsi di un'infiammazione avanzata o un ascesso. Non aspettare.",
    action: "Prenota Urgenza",
    link: "/prenota?type=urgenza",
    color: "bg-red-500"
  },
  result_sensitive: {
    title: "Ipersensibilità o Carie",
    desc: "Potrebbe esserci una carie profonda o una recessione gengivale.",
    action: "Prenota Controllo",
    link: "/prenota?type=controllo",
    color: "bg-orange-400"
  },
  result_whitening: {
    title: "Sbiancamento LED",
    desc: "La soluzione perfetta per te è il nostro trattamento sbiancante rapido.",
    action: "Vedi Offerta",
    link: "/sorrisi", // Link to Gallery
    color: "bg-blue-500"
  },
  // Default fallback
  default: {
    title: "Consigliamo una Visita",
    desc: "Il modo migliore per capire il problema è una visita di controllo approfondita.",
    action: "Prenota Visita",
    link: "/prenota",
    color: "bg-primary"
  }
};

// Simple icons for the demo
const Sparkles = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>;
const Droplet = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69L15.75 8.5C17.8 11.69 17.5 15.89 15 18.5C12.5 21.11 8.5 21.11 6 18.5C3.5 15.89 3.2 11.69 5.25 8.5L9 2.69" /></svg>;
const Utensils = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const Sun = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>;
const AlignJustify = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>;

const SymptomChecker = () => {
  const [history, setHistory] = useState(['start']); // Stack of step IDs
  const [direction, setDirection] = useState(1); // For animation: 1 = next, -1 = back

  const currentStepId = history[history.length - 1];
  
  // If the current step ID doesn't exist in STEPS, it means we hit a result
  const isResult = !STEPS[currentStepId];
  const stepData = isResult ? (RESULTS[currentStepId] || RESULTS.default) : STEPS[currentStepId];

  const handleOptionClick = (nextStepId) => {
    setDirection(1);
    setHistory([...history, nextStepId]);
  };

  const handleRestart = () => {
    setDirection(-1);
    setHistory(['start']);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative min-h-[400px] flex flex-col">
        
        {/* Header / Progress Bar */}
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-dark font-bold">
            <Activity className="text-primary" size={20} />
            <span>Virtual Triage</span>
          </div>
          {history.length > 1 && (
            <button onClick={handleRestart} className="text-xs font-bold text-gray-400 hover:text-dark uppercase tracking-widest transition-colors">
              Ricomincia
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative">
          <AnimatePresence mode="wait" custom={direction}>
            
            {!isResult ? (
              <motion.div
                key={currentStepId}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="text-2xl md:text-3xl font-black text-dark mb-8 text-center leading-tight">
                  {stepData.question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stepData.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt.next || 'default')}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all group text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary flex items-center justify-center transition-colors shrink-0">
                        {opt.icon}
                      </div>
                      <span className="font-bold text-dark group-hover:text-primary">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // RESULT CARD
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white mb-6 shadow-xl ${stepData.color || 'bg-primary'}`}>
                  <CheckCircleIcon />
                </div>
                <h3 className="text-3xl font-black text-dark mb-3">{stepData.title}</h3>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  {stepData.desc}
                </p>
                
                <Link 
                  to={stepData.link}
                  className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform ${stepData.color || 'bg-primary'}`}
                >
                  {stepData.action} <ArrowRight size={20} />
                </Link>
                
                <div className="mt-6 text-xs text-gray-400">
                  *Questo strumento non sostituisce il parere medico professionale.
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      </div>
    </div>
  );
};

// Helper Icon for Result
const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default SymptomChecker;