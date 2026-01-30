import { motion } from 'framer-motion';

const BRANDS = [
  "INVISALIGN",
  "STRAUMANN",
  "DENTSPLY SIRONA",
  "PHILIPS ZOOM",
  "3SHAPE",
  "NOBEL BIOCARE",
  "PLANMECA",
  "CARESTREAM",
  "EMS DENTAL",
  "GEISTLICH",
  "ZIMMER BIOMET"
];

const BrandMarquee = () => {
  return (
    <section className="py-10 bg-white border-t border-gray-50 overflow-hidden relative">
      
      {/* Gradient Masks for Fade Effect */}
      <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex">
        {/* Track - Duplicated for infinite loop */}
        <motion.div
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, // Adjust speed (higher = slower)
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Render the list twice to create the seamless loop */}
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div 
              key={index} 
              className="group cursor-default"
            >
              <span className="text-xl md:text-2xl font-black text-gray-300 tracking-widest uppercase transition-all duration-300 group-hover:text-primary group-hover:scale-105 select-none">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMarquee;