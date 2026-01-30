import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, PlayCircle, MapPin } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Marco Valenti",
    role: "Imprenditore",
    // Humor tag adds personality
    tag: "☕ Coffee Lover", 
    text: "Ero terrorizzato dal dentista. Qui ho trovato non solo professionisti, ma persone che ti ascoltano. Dopo l'impianto, sono tornato a mangiare la fiorentina senza paura!",
    stars: 5,
    // Real looking profile image
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    treatment: "Implantologia"
  },
  {
    id: 2,
    name: "Giulia Bianchi",
    role: "Architetto",
    tag: "😁 Sorriso da Star",
    text: "Volevo le faccette ma temevo l'effetto 'finto'. Il risultato è così naturale che nessuno crede siano faccette. Ora sorrido in ogni foto (anche troppe).",
    stars: 5,
    image: "https://images.unsplash.com/photo-1573496359-7973131e9b71?auto=format&fit=crop&q=80&w=200",
    treatment: "Estetica Dentale"
  },
  {
    id: 3,
    name: "Luca & Tommaso",
    role: "Papà & Figlio",
    tag: "🦸 Super Eroi",
    text: "Portare un bambino di 6 anni dal dentista è solitamente un incubo. Qui è diventato un gioco. Tommaso chiede: 'Quando torniamo dal Dottore?'. Incredibile.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=200",
    treatment: "Pedodonzia"
  }
];

const ReviewSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header with Social Proof */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    +1k
                 </div>
              </div>
              <span className="text-gray-500 text-sm font-medium">Pazienti felici a Pisa</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">
              Non fidarti di noi. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Fidati dei loro sorrisi.
              </span>
            </h2>
          </div>

          {/* Google Badge */}
          <motion.a 
            href="https://www.google.com/maps" 
            target="_blank"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm p-2">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-full" />
            </div>
            <div>
               <div className="flex items-center gap-1">
                 <span className="font-black text-dark text-lg">4.9</span>
                 <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
               </div>
               <div className="text-xs text-gray-400 font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Leggi 150+ Recensioni</div>
            </div>
          </motion.a>
        </div>

        {/* Featured Video Story (Simulated) */}
        <div className="mb-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative rounded-[2.5rem] overflow-hidden bg-dark aspect-[21/9] md:aspect-[21/8] shadow-2xl group cursor-pointer"
            >
               <img 
                 src="https://images.unsplash.com/photo-1573496359-7973131e9b71?auto=format&fit=crop&q=80&w=1200" 
                 alt="Video Cover" 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                     <PlayCircle size={40} className="fill-white" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black mb-2">"Finalmente sorrido nelle foto"</h3>
                  <p className="text-lg md:text-xl text-gray-200">La storia di Giulia e del suo nuovo sorriso.</p>
               </div>
            </motion.div>
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
              className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                 <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-16 h-16 rounded-2xl object-cover shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                       <CheckCircle2 size={16} className="text-primary fill-primary/20" />
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-dark text-lg leading-tight">{review.name}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{review.role}</p>
                 </div>
              </div>

              {/* Tag & Stars */}
              <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-100 pb-4">
                 <span className="px-3 py-1 rounded-full bg-gray-50 text-dark text-xs font-bold border border-gray-100">
                    {review.tag}
                 </span>
                 <div className="flex gap-0.5">
                   {[...Array(review.stars)].map((_, i) => (
                     <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                   ))}
                 </div>
              </div>

              {/* Quote */}
              <div className="relative flex-grow">
                 <Quote size={40} className="absolute -top-2 -left-2 text-primary/10 -z-10" />
                 <p className="text-gray-600 leading-relaxed font-medium">
                   "{review.text}"
                 </p>
              </div>

              {/* Treatment Footer */}
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Trattamento</span>
                 <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                    {review.treatment}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location Trust */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
               <MapPin size={16} /> 
               Pazienti provenienti da <span className="text-dark font-bold">Pisa, Lucca, Livorno</span> e tutta la Toscana.
            </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewSection;