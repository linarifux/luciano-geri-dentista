import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Marco Valenti",
    role: "Paziente dal 2015",
    text: "Professionalità ai massimi livelli. Lo studio è all'avanguardia e il Dott. Geri trasmette una tranquillità incredibile. Finalmente ho superato la paura del dentista.",
    stars: 5
  },
  {
    name: "Elena Rossini",
    role: "Trattamento Ortodontico",
    text: "Ho scelto lo studio per un trattamento di ortodonzia invisibile. Risultati eccellenti in tempi record. Personale cordiale e sempre disponibile per ogni urgenza.",
    stars: 5
  },
  {
    name: "Giuseppe Neri",
    role: "Paziente Storico",
    text: "Vengo in questo studio da oltre 20 anni. La pulizia è impeccabile e la precisione nel lavoro è rimasta costante nel tempo. Un punto di riferimento a Pisa.",
    stars: 5
  }
];

const ReviewSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.4em] text-xs"
          >
            Dicono di noi
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-dark mt-4">
            La fiducia dei <span className="text-primary">nostri pazienti</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-500"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
                <Quote size={20} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-dark/80 italic leading-relaxed mb-8 text-lg">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-primary/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-dark text-sm uppercase tracking-tight">
                    {review.name}
                  </h4>
                  <p className="text-xs text-primary font-bold">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Trust Badge Placeholder */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/960px-Google_%22G%22_logo.svg.png" alt="Google" className="h-4" />
            <span className="text-sm font-bold text-dark">Valutazione 4.9/5 basata su 150+ recensioni</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewSection;