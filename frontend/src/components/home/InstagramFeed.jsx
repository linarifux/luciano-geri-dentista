import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

const INSTAGRAM_URL = "https://www.instagram.com/studiodentisticolucianogeri/";

// Mock Data - Replace 'src' with your actual post images if needed
const posts = [
  {
    id: 1,
    likes: 45,
    comments: 2,
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", // Dental chair
    alt: "Studio Atmosphere"
  },
  {
    id: 2,
    likes: 120,
    comments: 14,
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop", // Smile
    alt: "Happy Patient"
  },
  {
    id: 3,
    likes: 89,
    comments: 8,
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", // Doctor working
    alt: "Our Team"
  },
  {
    id: 4,
    likes: 67,
    comments: 4,
    src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop", // Tools
    alt: "Technology"
  }
];

const InstagramFeed = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Social Media</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-[0.9]">
              Seguici su <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Instagram</span>
            </h2>
            <p className="text-gray-400 font-light text-lg">
              Dietro le quinte, casi clinici e sorrisi quotidiani. Entra nella nostra community.
            </p>
          </div>

          <a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full text-white">
              <Instagram size={20} />
            </div>
            <span className="font-bold text-dark text-sm tracking-widest uppercase">Segui @lucianogeri</span>
            <ExternalLink size={16} className="text-gray-400 group-hover:text-dark transition-colors" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img 
                src={post.src} 
                alt={post.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 backdrop-blur-sm">
                <Instagram size={32} />
                <div className="flex gap-4 font-bold text-sm mt-2">
                  <span className="flex items-center gap-1"><Heart size={14} fill="white" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} fill="white" /> {post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;