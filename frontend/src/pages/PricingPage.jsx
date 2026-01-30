import { motion } from 'framer-motion';
import { CreditCard, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CostCalculator from '../components/home/CostCalculator';
import InsuranceChecker from '../components/home/InsuranceChecker';

const PricingPage = () => {
  return (
    <div className="bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0F172A] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Trasparenza, <span className="text-primary">Prima di Tutto.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Crediamo che la cura dentale debba essere accessibile e chiara. 
            Nessuna sorpresa, solo preventivi dettagliati e soluzioni di pagamento su misura.
          </p>
        </div>
      </section>

      {/* --- CALCULATOR SECTION --- */}
      <section className="py-20 md:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <CostCalculator />
        </div>
      </section>

      {/* --- FINANCING INFO (PagoDil / Compass) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Wallet size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">PagoDil & Finanziamenti</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Dilaziona il pagamento fino a 24 mesi a tasso zero. Nessuna busta paga richiesta per piccoli importi.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <CreditCard size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Pagamenti Digitali</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Accettiamo tutte le carte di credito, Bancomat, Apple Pay e Satispay. Massima flessibilità.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">Garanzia sui Lavori</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Tutte le protesi e gli impianti sono garantiti e certificati. Investiamo nella qualità che dura nel tempo.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- INSURANCE CHECKER SECTION --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <InsuranceChecker />
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Il tuo sorriso non può aspettare.
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Prenota una visita di controllo senza impegno. Analizzeremo la tua situazione e ti forniremo un preventivo chiaro e definitivo.
          </p>
          <Link 
            to="/prenota" 
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-dark transition-all shadow-xl shadow-primary/20"
          >
            Prenota Ora <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;