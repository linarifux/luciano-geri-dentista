export const users = [
  {
    name: 'Luciano Geri',
    email: 'admin@studiogeri.it',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Dott.ssa Maria Rossi',
    email: 'maria@studiogeri.it',
    password: 'password123',
    role: 'doctor',
  },
];

export const services = [
  {
    title: 'Igiene Orale',
    description: 'Pulizia profonda professionale e rimozione tartaro.',
    basePrice: 80,
    duration: 60,
  },
  {
    title: 'Ortodonzia Invisibile',
    description: 'Allineamento dentale con mascherine trasparenti.',
    basePrice: 2500,
    duration: 45,
  },
  {
    title: 'Sbiancamento LED',
    description: 'Trattamento estetico per un sorriso più bianco.',
    basePrice: 300,
    duration: 90,
  },
];

export const appointments = [
  {
    name: 'Mario Rossi',
    email: 'mario@email.it',
    phone: '3331234567',
    service: 'Igiene',
    date: new Date(),
    message: 'Preferirei il pomeriggio.',
    status: 'In attesa',
  },
  {
    name: 'Giulia Bianchi',
    email: 'giulia@email.it',
    phone: '3337654321',
    service: 'Controllo',
    date: new Date(),
    message: 'Prima visita.',
    status: 'Confermato',
  },
];