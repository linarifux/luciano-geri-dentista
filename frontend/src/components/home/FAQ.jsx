import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Accettate nuovi pazienti?",
    answer: "Assolutamente sì. Siamo sempre felici di accogliere nuovi pazienti nel nostro studio. Puoi prenotare la tua prima visita direttamente online tramite il pulsante 'Prenota Ora' o chiamandoci."
  },
  {
    question: "Ogni quanto devo fare la pulizia dei denti?",
    answer: "In generale consigliamo una seduta di igiene professionale ogni 6 mesi. Tuttavia, la frequenza può variare in base alle specifiche necessità cliniche del paziente che valuteremo insieme."
  },
  {
    question: "Trattate anche i bambini?",
    answer: "Certamente! Il nostro team include specialisti in pedodonzia che sanno come mettere i bambini a loro agio, rendendo la visita un'esperienza positiva, divertente e senza paure."
  },
  {
    question: "Cosa devo fare in caso di urgenza?",
    answer: "Per le urgenze (dolore acuto, traumi, ecc.) ti invitiamo a chiamare subito il nostro numero +39 050 123456. Faremo il possibile per visitarti in giornata."
  },
  {
    question: "Offrite piani di pagamento rateali?",
    answer: "Sì, crediamo che la salute non debba essere un lusso. Offriamo diverse soluzioni di finanziamento e piani di pagamento personalizzati a tasso zero per venire incontro alle tue esigenze."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-gray-50 to-gray-50 -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Supporto</span>
            <span className="h-px w-8 bg-primary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">Domande Frequenti</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Ecco le risposte alle domande più comuni dei nostri pazienti. Se non trovi quello che cerchi, non esitare a contattarci.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === index ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-gray-100 shadow-sm hover:border-primary/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-primary' : 'text-dark'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;