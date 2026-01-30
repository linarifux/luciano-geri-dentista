import { useState } from 'react';
import Tooth from './Tooth';
import { RefreshCw, Trash2, Save } from 'lucide-react';

const Odontogram = () => {
  // ISO 3950 Numbering
  const quadrants = {
    q1: [18, 17, 16, 15, 14, 13, 12, 11], // Upper Right
    q2: [21, 22, 23, 24, 25, 26, 27, 28], // Upper Left
    q4: [48, 47, 46, 45, 44, 43, 42, 41], // Lower Right
    q3: [31, 32, 33, 34, 35, 36, 37, 38], // Lower Left
  };

  // State: Maps tooth number to its condition
  // Example: { 16: 'decay', 21: 'filled' }
  const [teethState, setTeethState] = useState({});
  const [selectedTool, setSelectedTool] = useState('select'); // 'select', 'decay', 'filled', 'missing', 'crown'

  const handleToothClick = (number) => {
    if (selectedTool === 'select') return;

    setTeethState(prev => {
      // If clicking with same tool, toggle off (reset to healthy)
      if (prev[number] === selectedTool) {
        const newState = { ...prev };
        delete newState[number];
        return newState;
      }
      // Apply new status
      return { ...prev, [number]: selectedTool };
    });
  };

  // Helper for Toolbar Buttons
  const ToolButton = ({ tool, label, color }) => (
    <button 
      onClick={() => setSelectedTool(tool)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
        selectedTool === tool 
          ? 'bg-dark text-white border-dark shadow-md' 
          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      {label}
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
      
      {/* --- Toolbar --- */}
      <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-gray-100 justify-center">
        <ToolButton tool="decay" label="Carie" color="bg-red-400" />
        <ToolButton tool="filled" label="Otturazione" color="bg-blue-400" />
        <ToolButton tool="crown" label="Corona" color="bg-yellow-400" />
        <ToolButton tool="missing" label="Mancante" color="bg-gray-200" />
        <ToolButton tool="root-canal" label="Devitalizzato" color="bg-purple-300" />
        
        <div className="w-px h-8 bg-gray-200 mx-2"></div>
        
        <button 
          onClick={() => setTeethState({})}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} /> Reset
        </button>
      </div>

      {/* --- The Mouth Grid --- */}
      <div className="flex flex-col gap-12 items-center">
        
        {/* UPPER ARCH */}
        <div className="flex gap-4 sm:gap-12 relative">
          {/* Vertical Midline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2"></div>
          
          <div className="flex gap-1 sm:gap-2">
            {quadrants.q1.map(num => (
              <Tooth key={num} number={num} status={teethState[num]} onClick={handleToothClick} isSelected={selectedTool !== 'select'} />
            ))}
          </div>
          <div className="flex gap-1 sm:gap-2">
            {quadrants.q2.map(num => (
              <Tooth key={num} number={num} status={teethState[num]} onClick={handleToothClick} isSelected={selectedTool !== 'select'} />
            ))}
          </div>
        </div>

        {/* LOWER ARCH */}
        <div className="flex gap-4 sm:gap-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2"></div>

          <div className="flex gap-1 sm:gap-2">
            {quadrants.q4.map(num => (
              <Tooth key={num} number={num} status={teethState[num]} onClick={handleToothClick} isSelected={selectedTool !== 'select'} />
            ))}
          </div>
          <div className="flex gap-1 sm:gap-2">
            {quadrants.q3.map(num => (
              <Tooth key={num} number={num} status={teethState[num]} onClick={handleToothClick} isSelected={selectedTool !== 'select'} />
            ))}
          </div>
        </div>

      </div>

      {/* --- Legend / Footer --- */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-400">
          <span className="font-bold">Nota:</span> Click su un dente per applicare lo stato selezionato. Click di nuovo per rimuovere.
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-dark transition-all">
          <Save size={18} /> Salva Cartella
        </button>
      </div>

    </div>
  );
};

export default Odontogram;