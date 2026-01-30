import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Copy, CheckCircle2, AlertTriangle, 
  Coffee, Cigarette, IceCream, Pill, Phone
} from 'lucide-react';
import toast from 'react-hot-toast';

// --- TEMPLATES ---
const TEMPLATES = {
  extraction: {
    title: 'Estrazione Dentale',
    icon: '🦷',
    dos: [
      { id: 1, text: 'Applicare ghiaccio esternamente (10 min si, 10 no)', icon: <IceCream size={16}/> },
      { id: 2, text: 'Mangiare cibi freddi e morbidi (yogurt, gelato)', icon: <IceCream size={16}/> },
      { id: 3, text: 'Dormire con la testa sollevata da due cuscini', icon: <div className="text-xs">🛏️</div> },
      { id: 4, text: 'Prendere antibiotico/antidolorifico come prescritto', icon: <Pill size={16}/> },
    ],
    donts: [
      { id: 5, text: 'NON sciacquare la bocca per 24 ore', icon: <AlertTriangle size={16}/> },
      { id: 6, text: 'NON bere con cannucce (evitare risucchio)', icon: <AlertTriangle size={16}/> },
      { id: 7, text: 'NON fumare per almeno 48 ore', icon: <Cigarette size={16}/> },
      { id: 8, text: 'Evitare cibi caldi o piccanti', icon: <Coffee size={16}/> },
    ]
  },
  whitening: {
    title: 'Sbiancamento LED',
    icon: '✨',
    dos: [
      { id: 1, text: 'Usare dentifricio per denti sensibili se necessario', icon: <CheckCircle2 size={16}/> },
      { id: 2, text: 'Bere molta acqua a temperatura ambiente', icon: <CheckCircle2 size={16}/> },
    ],
    donts: [
      { id: 3, text: 'NO caffè, tè, vino rosso per 48h (Dieta Bianca)', icon: <Coffee size={16}/> },
      { id: 4, text: 'Evitare cibi acidi (agrumi, pomodoro)', icon: <AlertTriangle size={16}/> },
      { id: 5, text: 'Evitare rossetti colorati', icon: <AlertTriangle size={16}/> },
    ]
  },
  implant: {
    title: 'Implantologia',
    icon: '🔩',
    dos: [
      { id: 1, text: 'Igiene scrupolosa ma delicata sulla zona', icon: <CheckCircle2 size={16}/> },
      { id: 2, text: 'Utilizzare collutorio alla clorexidina', icon: <Pill size={16}/> },
    ],
    donts: [
      { id: 3, text: 'Non masticare cibi duri sulla zona operata', icon: <AlertTriangle size={16}/> },
      { id: 4, text: 'Non spazzolare energicamente le suture', icon: <AlertTriangle size={16}/> },
    ]
  }
};

const PostOpGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('extraction');
  const [patientPhone, setPatientPhone] = useState('');
  const [activeTab, setActiveTab] = useState('preview'); // 'edit' or 'preview'

  const currentData = TEMPLATES[selectedTemplate];

  const generateMessage = () => {
    let msg = `*Studio Geri - Istruzioni Post-Trattamento: ${currentData.title}*\n\n`;
    msg += `✅ *COSA FARE:*\n`;
    currentData.dos.forEach(item => msg += `- ${item.text}\n`);
    msg += `\n❌ *COSA EVITARE:*\n`;
    currentData.donts.forEach(item => msg += `- ${item.text}\n`);
    msg += `\n📞 *Urgenze:* +39 050 123456\n`;
    msg += `Buona guarigione! 🦷`;
    return encodeURIComponent(msg);
  };

  const handleWhatsApp = () => {
    if(!patientPhone) return toast.error("Inserisci il numero del paziente");
    const url = `https://wa.me/${patientPhone}?text=${generateMessage()}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    const text = decodeURIComponent(generateMessage());
    navigator.clipboard.writeText(text);
    toast.success("Testo copiato negli appunti");
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-dark tracking-tight">Istruzioni Post-Cura</h1>
        <p className="text-gray-500 font-medium mt-1">Genera e invia consigli di guarigione ai pazienti.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* --- LEFT: CONTROLS --- */}
        <div className="space-y-6">
          
          {/* Template Selector */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">Seleziona Trattamento</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(TEMPLATES).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedTemplate === key 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{TEMPLATES[key].icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wide">{key}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">Invio Rapido</h3>
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Numero WhatsApp Paziente</label>
                  <input 
                    type="tel" 
                    placeholder="Es: 3331234567" 
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-dark" 
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={handleCopy} className="flex items-center justify-center gap-2 py-4 bg-gray-100 hover:bg-gray-200 text-dark font-bold rounded-xl transition-colors">
                     <Copy size={18} /> Copia Testo
                  </button>
                  <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-colors shadow-lg shadow-green-500/20">
                     <Share2 size={18} /> Invia WhatsApp
                  </button>
               </div>
            </div>
          </div>

        </div>

        {/* --- RIGHT: PREVIEW CARD --- */}
        <div className="flex justify-center items-start">
            <motion.div 
               key={selectedTemplate}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-50 relative"
            >
               {/* Phone Notch Decor */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-100 rounded-b-xl z-10"></div>
               
               {/* Card Header */}
               <div className="bg-primary p-8 pt-12 text-white text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner">
                     {currentData.icon}
                  </div>
                  <h2 className="text-2xl font-black leading-tight">{currentData.title}</h2>
                  <p className="text-primary-100 text-sm font-medium mt-1">Guida alla guarigione</p>
               </div>

               {/* Content */}
               <div className="p-8 space-y-6">
                  
                  {/* DO's */}
                  <div>
                     <div className="flex items-center gap-2 text-green-500 font-black uppercase text-xs tracking-widest mb-3">
                        <CheckCircle2 size={16} /> Cosa Fare
                     </div>
                     <ul className="space-y-3">
                        {currentData.dos.map(item => (
                           <li key={item.id} className="flex gap-3 text-sm text-gray-600 bg-green-50/50 p-3 rounded-xl border border-green-50">
                              <span className="text-green-500 mt-0.5">{item.icon}</span>
                              <span className="font-medium leading-tight">{item.text}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* DONT's */}
                  <div>
                     <div className="flex items-center gap-2 text-red-500 font-black uppercase text-xs tracking-widest mb-3">
                        <AlertTriangle size={16} /> Cosa Evitare
                     </div>
                     <ul className="space-y-3">
                        {currentData.donts.map(item => (
                           <li key={item.id} className="flex gap-3 text-sm text-gray-600 bg-red-50/50 p-3 rounded-xl border border-red-50">
                              <span className="text-red-400 mt-0.5">{item.icon}</span>
                              <span className="font-medium leading-tight">{item.text}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-gray-100 text-center">
                     <p className="text-xs text-gray-400 mb-2">Hai dubbi o dolore persistente?</p>
                     <a href="tel:+39050123456" className="inline-flex items-center gap-2 bg-dark text-white px-6 py-2 rounded-full text-xs font-bold">
                        <Phone size={14} /> Chiama Studio Geri
                     </a>
                  </div>

               </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default PostOpGenerator;