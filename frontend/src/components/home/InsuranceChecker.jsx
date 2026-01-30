import { useState } from 'react';
import { Search, ShieldCheck, XCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Database of Accepted Insurances
const ACCEPTED_INSURANCES = [
  "Unisalute", "Metasalute", "ProntoCare", "Fasi", "FasiOpen", 
  "Generali", "Allianz", "Blue Assistance", "Previmedical", 
  "RBM Salute", "Poste Assicura", "Cesare Pozzo"
];

const InsuranceChecker = () => {
  const [query, setQuery] = useState("");
  
  const filtered = ACCEPTED_INSURANCES.filter(ins => 
    ins.toLowerCase().includes(query.toLowerCase())
  );

  const isMatch = query.length > 0 && filtered.length > 0;
  const isNoMatch = query.length > 0 && filtered.length === 0;

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-3">Convenzioni Assicurative</h2>
        <p className="text-gray-500 text-sm">
          Collaboriamo con i principali fondi sanitari. Cerca il tuo ente per vedere se è convenzionato.
        </p>
      </div>

      <div className="relative">
        {/* Search Input */}
        <div className="relative group z-10">
          <div className={`absolute inset-0 bg-primary/20 rounded-2xl blur-lg transition-opacity duration-300 ${query ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="relative bg-white border border-gray-200 rounded-2xl flex items-center p-2 shadow-sm focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <Search className="text-gray-400 ml-3" size={20} />
            <input 
              type="text" 
              placeholder="Es: Unisalute..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 outline-none text-dark font-medium bg-transparent placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Results Dropdown */}
        {query && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
          >
            {isMatch ? (
              <ul className="divide-y divide-gray-50">
                {filtered.map((ins) => (
                  <li key={ins} className="p-4 flex items-center justify-between hover:bg-green-50/50 transition-colors">
                    <span className="font-bold text-dark">{ins}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                      <ShieldCheck size={14} /> Accettata
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <XCircle size={24} />
                </div>
                <h4 className="font-bold text-dark mb-1">Non trovato</h4>
                <p className="text-xs text-gray-500 mb-4">
                  Potremmo essere convenzionati indirettamente. Chiamaci per verificare.
                </p>
                <a href="tel:+39050123456" className="inline-flex items-center gap-2 text-xs font-bold text-dark bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors">
                  <Phone size={14} /> Chiama Segreteria
                </a>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Accepted Logos Grid (Static Visual) */}
      {!query && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Enti Partner</p>
          <div className="flex flex-wrap justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {ACCEPTED_INSURANCES.slice(0, 5).map(ins => (
              <span key={ins} className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500">
                {ins}
              </span>
            ))}
            <span className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400">+ altri</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceChecker;