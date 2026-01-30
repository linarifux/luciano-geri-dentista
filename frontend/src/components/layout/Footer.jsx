import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, ArrowRight, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1121] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* --- Background Ambience --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- Top CTA Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-white/5 mb-16">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
              Pronto a sorridere di nuovo?
            </h3>
            <p className="text-slate-400 font-light">
              Prenota una prima visita senza impegno. Scopri il piano di cura su misura per te.
            </p>
          </div>
          <Link 
            to="/prenota"
            className="group flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-2xl font-bold transition-all hover:bg-primary hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(94,174,180,0.4)]"
          >
            Prenota Ora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* 1. Brand & Info (4 Columns) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="mb-8 inline-block group">
              <img 
                src="/logo.png" 
                alt="Studio Geri Logo" 
                className="h-12 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-7 max-w-sm mx-auto lg:mx-0 mb-8 font-light">
              Eccellenza odontoiatrica nel cuore storico di Pisa dal 1980. 
              Uniamo tradizione medica e tecnologie digitali per la cura del tuo sorriso.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* 2. Navigation Links (4 Columns) */}
          <div className="md:col-span-6 lg:col-span-4 lg:flex lg:justify-center">
            <div className="grid grid-cols-2 gap-10 w-full max-w-sm mx-auto md:mx-0 lg:mx-auto">
              
              {/* Column A */}
              <div>
                <h4 className="text-white font-bold mb-6 text-sm">Esplora</h4>
                <ul className="space-y-4">
                  <FooterLink to="/" label="Home" />
                  <FooterLink to="/chi-siamo" label="Chi Siamo" />
                  <FooterLink to="/sorrisi" label="Casi Clinici" isNew /> {/* Added Link */}
                  <FooterLink to="/studio" label="Lo Studio" />
                  <FooterLink to="/blog" label="Blog & News" />
                </ul>
              </div>

              {/* Column B */}
              <div>
                <h4 className="text-white font-bold mb-6 text-sm">Trattamenti</h4>
                <ul className="space-y-4">
                  <FooterLink to="/servizi" label="Igiene e Prevenzione" />
                  <FooterLink to="/servizi" label="Implantologia" />
                  <FooterLink to="/servizi" label="Ortodonzia Invisibile" />
                  <FooterLink to="/servizi" label="Estetica Dentale" />
                  <FooterLink to="/login" label="Area Riservata Staff" />
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Contacts & Hours (4 Columns) */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 backdrop-blur-sm">
              <h4 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Contatti Rapidi
              </h4>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 min-w-[20px] text-primary"><MapPin size={18} /></div>
                  <div className="text-sm text-slate-300 font-light leading-relaxed">
                    <strong className="block text-white font-medium mb-0.5">Sede Principale</strong>
                    Lungarno Pacinotti, 26 <br/> 56125 Pisa (PI)
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 min-w-[20px] text-primary"><Phone size={18} /></div>
                  <div>
                    <strong className="block text-white text-sm font-medium mb-0.5">Telefono</strong>
                    <a href="tel:+39050123456" className="text-sm text-slate-300 hover:text-white transition-colors">
                      +39 050 123456
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 min-w-[20px] text-primary"><Clock size={18} /></div>
                  <div>
                    <strong className="block text-white text-sm font-medium mb-0.5">Orari</strong>
                    <span className="text-sm text-slate-300">Lun - Ven: 09:00 - 19:00</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-medium text-slate-500 text-center md:text-left tracking-wide">
            &copy; {currentYear} Studio Dentistico Luciano Geri. P.IVA 01234567890.<br className="md:hidden"/> Direttore Sanitario Dott. L. Geri.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Note Legali</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ to, label, isNew }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
    >
      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 text-primary">•</span>
      {label}
      {isNew && <span className="bg-primary/20 text-primary text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ml-1">New</span>}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white hover:text-dark hover:border-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;