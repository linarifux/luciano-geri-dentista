import { motion } from 'framer-motion';

const Tooth = ({ number, status, onClick, isSelected }) => {
  
  // Define visual styles based on status
  const getStatusStyle = () => {
    switch (status) {
      case 'decay': return 'fill-red-400 stroke-red-600'; // Carie
      case 'filled': return 'fill-blue-400 stroke-blue-600'; // Otturazione
      case 'crown': return 'fill-yellow-400 stroke-yellow-600'; // Corona
      case 'missing': return 'opacity-20'; // Mancante
      case 'root-canal': return 'fill-purple-300 stroke-purple-500'; // Devitalizzato
      default: return 'fill-white stroke-gray-300 hover:fill-gray-50'; // Sano
    }
  };

  return (
    <div 
      onClick={() => onClick(number)}
      className={`flex flex-col items-center gap-1 cursor-pointer group relative ${status === 'missing' ? '' : 'hover:-translate-y-1'} transition-transform duration-200`}
    >
      {/* Tooth Number (ISO) */}
      <span className={`text-[10px] font-bold ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
        {number}
      </span>

      {/* The Tooth SVG Graphic */}
      <svg 
        width="40" 
        height="50" 
        viewBox="0 0 40 50" 
        className={`transition-colors duration-300 ${isSelected ? 'drop-shadow-lg scale-110' : ''}`}
      >
        {status === 'missing' ? (
           // "X" mark for missing teeth
           <path d="M10 10 L30 40 M30 10 L10 40" stroke="currentColor" strokeWidth="4" className="text-gray-200" />
        ) : (
           // Stylized Molar Shape
           <motion.path 
             d="M5,15 Q5,0 20,0 Q35,0 35,15 L35,35 Q35,50 20,50 Q5,50 5,35 Z" 
             className={`stroke-2 ${getStatusStyle()}`}
             initial={false}
             animate={{ fill: status === 'decay' ? '#f87171' : status === 'filled' ? '#60a5fa' : '#ffffff' }}
           />
        )}
        
        {/* Visual Indicator for Crown (Gold Cap) */}
        {status === 'crown' && (
            <path d="M4,15 Q4,-2 20,-2 Q36,-2 36,15 Z" className="fill-yellow-400 stroke-yellow-600 stroke-2 opacity-80" />
        )}
      </svg>
    </div>
  );
};

export default Tooth;