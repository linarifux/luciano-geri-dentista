import { motion } from 'framer-motion';
import { CreditCard, Wallet, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CostCalculator from '../components/home/CostCalculator';
import InsuranceChecker from '../components/home/InsuranceChecker';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PricingPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0F172A] text-white pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/80 to-[#0F172A] pointer-events-none"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold tracking-wider text-primary mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Listino 2024 Trasparente
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
              Investi nel tuo sorriso, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">senza sorprese.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Crediamo che la cura dentale d'eccellenza debba essere chiara e accessibile. 
              Preventivi bloccati, zero costi nascosti e piani di pagamento su misura per te.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#calculator" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-white hover:text-dark transition-all shadow-lg shadow-primary/25">
                Calcola Preventivo
              </a>
              <a href="#insurance" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                Verifica Assicurazione
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FINANCING INFO CARDS --- */}
      <section className="py-24 bg-white relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Wallet size={32} />,
                title: "PagoDil & Rate Zero",
                desc: "Dilaziona il pagamento fino a 24 mesi a tasso zero reale. Nessuna busta paga richiesta per piccoli importi.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: <CreditCard size={32} />,
                title: "Pagamenti Flessibili",
                desc: "Accettiamo tutte le carte di credito, Bancomat, Apple Pay, Satispay e bonifici istantanei.",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Garanzia Totale",
                desc: "5 anni di garanzia su tutti gli impianti e le protesi fisse. Certificato di conformità incluso.",
                color: "bg-emerald-50 text-emerald-600"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition-all duration-300 relative group overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-10 rounded-bl-[100px] -mr-6 -mt-6 group-hover:scale-110 transition-transform duration-500`}></div>
                
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CALCULATOR SECTION --- */}
      <section id="calculator" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">Calcola il tuo Sorriso</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Seleziona i trattamenti di tuo interesse per ottenere una stima immediata dei costi e delle opzioni di finanziamento.
            </p>
          </div>

          <CostCalculator />
        </div>
      </section>

      {/* --- INSURANCE CHECKER SECTION --- */}
      <section id="insurance" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6">
                Convenzioni Attive
              </div>
              <h2 className="text-4xl font-black text-dark mb-6">
                La tua salute è coperta?
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Collaboriamo con i principali fondi sanitari e assicurazioni integrative. 
                Molti dei nostri pazienti non sanno di avere diritto a rimborsi parziali o totali.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['Gestione pratica diretta', 'Rimborso diretto o indiretto', 'Convenzioni per dipendenti statali'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-dark font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100"
            >
              <InsuranceChecker />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight"
          >
            Il tuo sorriso non può aspettare.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 mb-12 text-xl max-w-2xl mx-auto"
          >
            Prenota una visita di controllo senza impegno. Analizzeremo la tua situazione e ti forniremo un preventivo chiaro e definitivo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/prenota" 
              className="inline-flex items-center gap-3 bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-dark transition-all shadow-xl shadow-primary/20 hover:scale-105"
            >
              Prenota Ora <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;