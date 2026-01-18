import { useSelector } from 'react-redux';

const StatsGrid = () => {
  const { items } = useSelector((state) => state.appointments);
  
  const pendingCount = items.filter(a => a.status === 'In attesa').length;
  const totalPatients = new Set(items.map(a => a.email)).size;

  const stats = [
    { label: 'Pending', value: pendingCount, color: 'border-yellow-400', icon: '⏳' },
    { label: 'Totale Pazienti', value: totalPatients, color: 'border-primary', icon: '👥' },
    { label: 'Appuntamenti Oggi', value: '4', color: 'border-secondary', icon: '📅' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border-l-8 ${stat.color} flex justify-between items-center`}>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-tight">{stat.label}</p>
            <p className="text-3xl font-bold text-dark mt-1">{stat.value}</p>
          </div>
          <span className="text-3xl grayscale opacity-40">{stat.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;