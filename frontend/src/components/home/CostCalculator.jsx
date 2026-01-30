import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, CreditCard, AlertCircle } from 'lucide-react';

const TREATMENTS = [
  { id: 'hygiene', name: 'Igiene Professionale', price: '€80 - €120', monthly: null, info: 'Pulizia profonda e smacchiamento.' },
  { id: 'whitening', name: 'Sbiancamento LED', price: '€250 - €400', monthly: '€25', info: 'Sbiancamento professionale alla poltrona.' },
  { id: 'invisalign', name: 'Ortodonzia Invisibile', price: '€2.500 - €4.500', monthly: '€90', info: 'Allineamento dentale con mascherine trasparenti.' },
  { id: 'implant', name: 'Impianto Dentale', price: '€1.200 - €1.800', monthly: '€50', info: 'Vite in titanio + corona in ceramica.' },
  { id: 'veneer', name: 'Faccette Estetiche', price: '€400 - €700', monthly: '€35', info: 'Prezzo per singolo elemento dentale.' },
];

const CostCalculator = () => {
  const [selected, setSelected] = useState(TREATMENTS[0]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
          <Calculator size={16} /> Preventivatore
        </div>
        <h2 className="text-3xl font-black text-dark mb-2">Calcola il tuo Sorriso</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Seleziona un trattamento per vedere una stima dei costi e le opzioni di finanziamento mensile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Selection List */}
        <div className="space-y-3">
          {TREATMENTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-200 border flex items-center justify-between group ${
                selected.id === item.id
                  ? 'bg-dark text-white border-dark shadow-lg scale-[1.02]'
                  : 'bg-gray-50 text-gray-600 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md'
              }`}
            >
              <span className="font-bold text-sm md:text-base">{item.name}</span>
              {selected.id === item.id && <CheckCircle2 size={18} className="text-primary" />}
            </button>
          ))}
        </div>

        {/* Right: Result Card */}
        <div className="relative h-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-primary/5 border border-primary/10 rounded-[2rem] p-8 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">{selected.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{selected.info}</p>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Costo Stimato</span>
                    <div className="text-3xl font-black text-primary">{selected.price}</div>
                  </div>

                  {selected.monthly ? (
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Rate da</span>
                        <div className="text-lg font-bold text-dark">{selected.monthly} <span className="text-sm font-normal text-gray-400">/mese*</span></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/50 p-4 rounded-xl text-sm text-gray-500 italic border border-transparent">
                      Pagamento in unica soluzione al momento della visita.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/10 flex gap-2 items-start">
                <AlertCircle size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  *I prezzi sono indicativi. Il costo finale sarà confermato dopo la prima visita in base alla complessità del caso clinico.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CostCalculator;