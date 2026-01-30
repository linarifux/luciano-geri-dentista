import { useState, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print'; // Optional, but native print works too
import { 
  Printer, Plus, Search, Trash2, User, 
  CreditCard, Calendar, Euro, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// --- MOCK DATA (In real app, fetch from Redux) ---
const MOCK_PATIENTS = [
  { id: 1, name: 'Giulia Bianchi', cf: 'BNCGLA80A01H501Z', address: 'Via Roma 10, Pisa' },
  { id: 2, name: 'Mario Rossi', cf: 'RSSMRA75C12L402X', address: 'Corso Italia 5, Pisa' },
  { id: 3, name: 'Luca Verdi', cf: 'VRDLCU90E22A123Y', address: 'Via Santa Maria 3, Pisa' },
];

const MOCK_SERVICES = [
  { id: 1, name: 'Igiene Professionale', price: 90 },
  { id: 2, name: 'Visita di Controllo', price: 50 },
  { id: 3, name: 'Otturazione Semplice', price: 120 },
  { id: 4, name: 'Impianto Dentale', price: 1200 },
  { id: 5, name: 'Panoramica Digitale', price: 40 },
];

const InvoiceGenerator = () => {
  // State
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(`F-${new Date().getFullYear()}-001`);
  
  // Modals
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + item.price, 0);
  const stampDuty = subtotal > 77.47 ? 2.00 : 0; // Italian Law: €2 bollo on medical invoices > €77.47
  const total = subtotal + stampDuty;

  // Handlers
  const addService = (service) => {
    setLineItems([...lineItems, { ...service, uniqueId: Date.now() }]); // uniqueId for list key
    setServiceModalOpen(false);
    toast.success("Voce aggiunta");
  };

  const removeService = (uniqueId) => {
    setLineItems(lineItems.filter(item => item.uniqueId !== uniqueId));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 min-h-screen p-4 md:p-8">
      
      {/* --- LEFT COLUMN: CONTROLS (Hidden when Printing) --- */}
      <div className="w-full xl:w-1/3 space-y-6 print:hidden">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-dark tracking-tight">Fatturazione</h1>
          <p className="text-gray-500 font-medium mt-1">Genera documenti fiscali per i pazienti.</p>
        </div>

        {/* 1. Select Patient */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
            <User size={18} className="text-primary" /> Intestatario
          </h3>
          
          {selectedPatient ? (
            <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl relative group">
               <button onClick={() => setSelectedPatient(null)} className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"><Trash2 size={14}/></button>
               <div className="font-bold text-dark">{selectedPatient.name}</div>
               <div className="text-xs text-gray-500 mt-1">{selectedPatient.cf}</div>
               <div className="text-xs text-gray-500">{selectedPatient.address}</div>
            </div>
          ) : (
            <button 
              onClick={() => setPatientModalOpen(true)}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              <Search size={18} /> Seleziona Paziente
            </button>
          )}
        </div>

        {/* 2. Add Services */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-primary" /> Voci Fattura
          </h3>
          
          <div className="space-y-2 mb-4">
             {lineItems.map((item) => (
               <div key={item.uniqueId} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-3">
                     <span className="font-bold text-dark">€{item.price}</span>
                     <button onClick={() => removeService(item.uniqueId)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
               </div>
             ))}
             {lineItems.length === 0 && <p className="text-xs text-center text-gray-400 italic py-2">Nessuna voce inserita.</p>}
          </div>

          <button 
             onClick={() => setServiceModalOpen(true)}
             className="w-full bg-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors text-sm"
          >
             <Plus size={16} /> Aggiungi Voce
          </button>
        </div>

        {/* 3. Details */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Numero Fattura</label>
                <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-bold text-dark outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Data Emissione</label>
                <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl font-bold text-dark outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
        </div>

        {/* Action */}
        <button 
          onClick={handlePrint}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          <Printer size={20} /> Stampa Fattura
        </button>

      </div>

      {/* --- RIGHT COLUMN: PREVIEW (The A4 Sheet) --- */}
      <div className="flex-1 bg-gray-200/50 p-4 xl:p-8 rounded-[2rem] overflow-auto flex justify-center items-start print:p-0 print:bg-white print:rounded-none print:overflow-visible">
        
        {/* THE A4 SHEET */}
        <div 
           id="invoice-print-area"
           className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl text-dark relative flex flex-col justify-between print:shadow-none print:w-full print:h-full print:p-0"
        >
           {/* Watermark/Logo bg */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
             <FileText size={400} />
           </div>

           {/* --- Top Section --- */}
           <div>
               {/* Header Row */}
               <div className="flex justify-between items-start border-b-2 border-primary pb-8 mb-8">
                   <div>
                       <h1 className="text-4xl font-black text-dark tracking-tighter mb-2">STUDIO<span className="text-primary">GERI</span></h1>
                       <div className="text-xs text-gray-500 space-y-1 font-medium">
                           <p>Dr. Luciano Geri</p>
                           <p>Lungarno Pacinotti 26, 56125 Pisa (PI)</p>
                           <p>P.IVA: 01234567890</p>
                           <p>Tel: +39 050 123456</p>
                       </div>
                   </div>
                   <div className="text-right">
                       <h2 className="text-xl font-bold text-gray-300 uppercase tracking-widest">Fattura</h2>
                       <div className="mt-2 text-2xl font-black text-dark">{invoiceNumber}</div>
                       <div className="text-sm font-medium text-gray-500">Del {invoiceDate}</div>
                   </div>
               </div>

               {/* Patient Info */}
               <div className="mb-12">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Intestata A:</h3>
                   {selectedPatient ? (
                       <div className="text-base">
                           <p className="font-bold text-dark text-lg">{selectedPatient.name}</p>
                           <p className="text-gray-600">{selectedPatient.address}</p>
                           <p className="text-gray-600 font-mono text-sm mt-1">C.F. {selectedPatient.cf}</p>
                       </div>
                   ) : (
                       <p className="text-gray-300 italic">-- Seleziona Paziente --</p>
                   )}
               </div>

               {/* Table */}
               <table className="w-full text-left mb-8">
                   <thead>
                       <tr className="border-b border-gray-200">
                           <th className="py-3 text-xs font-black text-gray-400 uppercase tracking-widest w-2/3">Prestazione</th>
                           <th className="py-3 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Importo</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                       {lineItems.map((item) => (
                           <tr key={item.uniqueId}>
                               <td className="py-4 text-sm font-bold text-gray-700">{item.name}</td>
                               <td className="py-4 text-sm font-bold text-gray-700 text-right">€ {item.price.toFixed(2)}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>

           {/* --- Bottom Section --- */}
           <div>
               {/* Totals */}
               <div className="flex justify-end mb-12">
                   <div className="w-1/2 space-y-3">
                       <div className="flex justify-between text-sm text-gray-500">
                           <span>Imponibile</span>
                           <span>€ {subtotal.toFixed(2)}</span>
                       </div>
                       {stampDuty > 0 && (
                           <div className="flex justify-between text-sm text-gray-500">
                               <span>Bollo (Esente IVA art.10)</span>
                               <span>€ {stampDuty.toFixed(2)}</span>
                           </div>
                       )}
                       <div className="flex justify-between text-xl font-black text-dark border-t-2 border-gray-100 pt-3">
                           <span>Totale</span>
                           <span>€ {total.toFixed(2)}</span>
                       </div>
                   </div>
               </div>

               {/* Footer Notes */}
               <div className="border-t border-gray-100 pt-8 text-[10px] text-gray-400 leading-relaxed text-center">
                   <p className="mb-2 font-bold uppercase tracking-widest">Informazioni di Pagamento</p>
                   <p>IBAN: IT00 X000 0000 0000 0000 0000 000</p>
                   <p>Banca Intesa Sanpaolo - Filiale di Pisa</p>
                   <p className="mt-4 italic">
                       Prestazione sanitaria esente IVA ai sensi dell'art. 10 n. 18 del D.P.R. 633/72.
                       <br/>
                       Il sistema tessera sanitaria è stato aggiornato con i dati della presente fattura.
                   </p>
               </div>
           </div>
           
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {isPatientModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl">
                    <h2 className="text-xl font-bold mb-4">Seleziona Paziente</h2>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {MOCK_PATIENTS.map(p => (
                            <button key={p.id} onClick={() => { setSelectedPatient(p); setPatientModalOpen(false); }} className="w-full text-left p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                                <div className="font-bold text-dark">{p.name}</div>
                                <div className="text-xs text-gray-400">{p.cf}</div>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setPatientModalOpen(false)} className="mt-4 w-full py-3 bg-gray-100 rounded-xl font-bold text-gray-500">Chiudi</button>
                </motion.div>
            </div>
        )}
        {isServiceModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl">
                    <h2 className="text-xl font-bold mb-4">Aggiungi Voce</h2>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {MOCK_SERVICES.map(s => (
                            <button key={s.id} onClick={() => addService(s)} className="w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                                <span className="font-bold text-dark text-sm">{s.name}</span>
                                <span className="font-bold text-primary">€{s.price}</span>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setServiceModalOpen(false)} className="mt-4 w-full py-3 bg-gray-100 rounded-xl font-bold text-gray-500">Chiudi</button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default InvoiceGenerator;