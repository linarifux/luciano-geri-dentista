import Odontogram from '../../components/clinical/Odontogram';
import { User, FileText, Activity } from 'lucide-react';

const PatientClinicalRecord = () => {
  return (
    <div className="space-y-8 p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark">Cartella Clinica</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Paziente: Giulia Bianchi
            </span>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                Ultima Visita: 12 Gen 2024
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: The Odontogram (Takes 2 columns) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={18} className="text-primary" />
            <h3 className="font-bold text-dark">Odontogramma Interattivo</h3>
          </div>
          <Odontogram />
        </div>

        {/* Right: Notes & History */}
        <div className="space-y-6">
          
          {/* Notes Panel */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                <FileText size={18} className="text-gray-400" /> Note Cliniche
            </h3>
            <textarea 
                className="w-full h-40 p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="Aggiungi nota sulla seduta odierna..."
            ></textarea>
            <button className="mt-4 w-full bg-dark text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors">
                Aggiungi Nota
            </button>
          </div>

          {/* History Panel */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">Storico Interventi</h3>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs shrink-0">
                            16
                        </div>
                        <div>
                            <div className="text-sm font-bold text-dark">Otturazione Composito</div>
                            <div className="text-xs text-gray-400">10 Ottobre 2023 - Dr. Geri</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientClinicalRecord;