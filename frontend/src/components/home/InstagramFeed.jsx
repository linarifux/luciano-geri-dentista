import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = "https://www.instagram.com/studiodentisticolucianogeri/";

// High-quality dental aesthetic images
const posts = [
  {
    id: 1,
    likes: 124,
    comments: 12,
    // Modern Dental Interior
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    alt: "Studio Atmosphere"
  },
  {
    id: 2,
    likes: 89,
    comments: 5,
    // Bright Smile / Aesthetic
    src: "https://images.unsplash.com/photo-1606811841689-230391b42b94?q=80&w=800&auto=format&fit=crop",
    alt: "Happy Patient"
  },
  {
    id: 3,
    likes: 215,
    comments: 34,
    // Close up / Tools / Professional
    src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop",
    alt: "Technology"
  },
  {
    id: 4,
    likes: 156,
    comments: 8,
    // Lifestyle / Patient Laughing
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    alt: "Smile Makeover"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const InstagramFeed = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-50/50 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100"
            >
              <Instagram size={14} className="text-pink-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Social Hub</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-dark tracking-tight leading-[0.9]"
            >
              Seguici su <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Instagram</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg font-light leading-relaxed max-w-lg"
            >
              Casi clinici, consigli di prevenzione e un dietro le quinte del nostro studio. Unisciti alla community.
            </motion.p>
          </div>

          <motion.a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 pl-2 pr-6 py-2 bg-dark text-white rounded-full shadow-2xl hover:shadow-gray-300 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white shadow-inner">
              <Instagram size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Seguici ora</span>
              <span className="font-bold text-sm tracking-wide">@lucianogeri</span>
            </div>
            <ArrowUpRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
          </motion.a>
        </div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 bg-gray-100"
            >
              {/* Image */}
              <img 
                src={post.src} 
                alt={post.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay (Always visible but subtle) */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-3 p-4">
                <Instagram size={32} className="drop-shadow-md" />
                <div className="flex items-center gap-4 font-bold text-sm">
                  <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                    <Heart size={14} className="fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                    <MessageCircle size={14} className="fill-white" /> {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default InstagramFeed;