import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ArrowRight, AlertCircle, Thermometer, Zap, Clock, 
  ArrowLeft, RotateCcw, CheckCircle2, Sparkles, Droplet, Utensils, 
  Sun, AlignJustify 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DECISION TREE DATA ---
const STEPS = {
  start: {
    question: "Cosa ti preoccupa oggi?",
    options: [
      { label: "Dolore ai denti", next: 'pain_type', icon: <Zap size={20} /> },
      { label: "Estetica / Colore", next: 'esthetic', icon: <Sparkles size={20} /> },
      { label: "Gengive che sanguinano", next: 'gums', icon: <Droplet size={20} /> },
      { label: "Dente rotto o mancante", next: 'broken', icon: <AlertCircle size={20} /> },
    ]
  },
  pain_type: {
    question: "Che tipo di dolore avverti?",
    options: [
      { label: "Forte e pulsante", next: 'result_urgent', icon: <Activity size={20} /> },
      { label: "Sensibilità al caldo/freddo", next: 'result_sensitive', icon: <Thermometer size={20} /> },
      { label: "Fastidio alla masticazione", next: 'result_checkup', icon: <Utensils size={20} /> },
    ]
  },
  esthetic: {
    question: "Qual è il tuo obiettivo?",
    options: [
      { label: "Denti più bianchi", next: 'result_whitening', icon: <Sun size={20} /> },
      { label: "Allineare i denti", next: 'result_invisalign', icon: <AlignJustify size={20} /> },
    ]
  },
  gums: {
    question: "Quando noti il sangue?",
    options: [
      { label: "Spazzolando i denti", next: 'result_hygiene', icon: <Droplet size={20} /> },
      { label: "Spontaneamente", next: 'result_urgent', icon: <AlertCircle size={20} /> },
    ]
  },
  broken: {
    question: "Hai dolore nella zona?",
    options: [
      { label: "Sì, fa male", next: 'result_urgent', icon: <Zap size={20} /> },
      { label: "No, solo fastidio", next: 'result_checkup', icon: <CheckCircle2 size={20} /> },
    ]
  }
};

// --- RESULTS DATA ---
const RESULTS = {
  result_urgent: {
    title: "Urgenza Possibile",
    desc: "Potrebbe trattarsi di un'infiammazione avanzata o un ascesso. Ti consigliamo di non aspettare.",
    action: "Prenota Urgenza",
    link: "/prenota?type=urgenza",
    color: "bg-red-500",
    text: "text-red-600"
  },
  result_sensitive: {
    title: "Ipersensibilità o Carie",
    desc: "Potrebbe esserci una carie profonda o una recessione gengivale che espone la dentina.",
    action: "Prenota Controllo",
    link: "/prenota?type=controllo",
    color: "bg-orange-400",
    text: "text-orange-600"
  },
  result_whitening: {
    title: "Sbiancamento LED",
    desc: "La soluzione perfetta per te è il nostro trattamento sbiancante rapido in poltrona.",
    action: "Vedi Trattamento",
    link: "/servizi", 
    color: "bg-blue-500",
    text: "text-blue-600"
  },
  result_invisalign: {
    title: "Ortodonzia Invisibile",
    desc: "Possiamo allineare il tuo sorriso con mascherine trasparenti senza fastidi estetici.",
    action: "Prenota Scan 3D",
    link: "/prenota?type=ortodonzia",
    color: "bg-teal-500",
    text: "text-teal-600"
  },
  result_hygiene: {
    title: "Igiene Professionale",
    desc: "Il sanguinamento è spesso segno di gengivite. Una pulizia profonda risolverà il problema.",
    action: "Prenota Igiene",
    link: "/prenota?type=igiene",
    color: "bg-emerald-500",
    text: "text-emerald-600"
  },
  default: {
    title: "Consigliamo una Visita",
    desc: "Il modo migliore per capire il problema è una visita di controllo approfondita con i nostri medici.",
    action: "Prenota Visita",
    link: "/prenota",
    color: "bg-primary",
    text: "text-primary"
  }
};

const SymptomChecker = () => {
  const [history, setHistory] = useState(['start']); // Stack of step IDs
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const currentStepId = history[history.length - 1];
  
  // Determine if current step is a Result or a Question
  const isResult = !STEPS[currentStepId];
  const stepData = isResult ? (RESULTS[currentStepId] || RESULTS.default) : STEPS[currentStepId];

  // Navigation Handlers
  const handleOptionClick = (nextStepId) => {
    setDirection(1);
    setHistory([...history, nextStepId]);
  };

  const handleBack = () => {
    if (history.length <= 1) return;
    setDirection(-1);
    setHistory(prev => prev.slice(0, -1)); // Remove last step
  };

  const handleRestart = () => {
    setDirection(-1);
    setHistory(['start']);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[450px] flex flex-col">
        
        {/* --- Header / Navigation --- */}
        <div className="bg-white px-8 py-5 border-b border-gray-100 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-3">
            {/* Back Button (Only shows if history > 1) */}
            {history.length > 1 ? (
                <button 
                    onClick={handleBack} 
                    className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-dark transition-colors"
                    title="Indietro"
                >
                    <ArrowLeft size={20} />
                </button>
            ) : (
                <div className="p-2 -ml-2 text-primary">
                    <Activity size={20} />
                </div>
            )}
            
            <div className="flex flex-col">
                <span className="font-bold text-dark leading-none">Virtual Triage</span>
                {history.length > 1 && !isResult && (
                    <span className="text-[10px] text-gray-400 font-medium mt-1">Passo {history.length}</span>
                )}
            </div>
          </div>

          {/* Restart Button */}
          {history.length > 1 && (
            <button 
                onClick={handleRestart} 
                className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        {/* --- Content Area --- */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            
            {!isResult ? (
              // QUESTION VIEW
              <motion.div
                key={currentStepId}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3, ease: "circOut" }}
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
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all text-left relative overflow-hidden"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white text-gray-400 group-hover:text-white group-hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 relative z-10">
                        {opt.icon}
                      </div>
                      <span className="font-bold text-dark group-hover:text-primary transition-colors text-lg relative z-10">
                        {opt.label}
                      </span>
                      {/* Hover Fill Effect */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // RESULT VIEW
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-gray-200 ${stepData.color || 'bg-primary'}`}
                >
                  <CheckCircleIcon />
                </motion.div>
                
                <h3 className="text-3xl font-black text-dark mb-4">{stepData.title}</h3>
                
                <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  {stepData.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                    to={stepData.link}
                    className={`inline-flex justify-center items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-transform ${stepData.color || 'bg-primary'}`}
                    >
                    {stepData.action} <ArrowRight size={20} />
                    </Link>
                    
                    {/* Secondary Action: Call */}
                    <a 
                        href="tel:+39050123456"
                        className="inline-flex justify-center items-center gap-2 text-gray-500 bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                    >
                        Chiama Ora
                    </a>
                </div>
                
                <div className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  *Risultato basato sulle tue risposte
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      </div>
    </div>
  );
};

// Helper Icon
const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

export default SymptomChecker;