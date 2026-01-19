import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Layout Wrapper - 12 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Left: Brand Section (4 Columns) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="mb-8 inline-block">
              <img 
                src="/logo.png" 
                alt="Studio Geri Logo" 
                className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm mx-auto lg:mx-0 mb-8">
              Eccellenza odontoiatrica nel cuore storico di Pisa dal 1980. 
              Uniamo tradizione medica e tecnologie digitali per la cura del tuo sorriso.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* 2. Middle: Dual Column Menu Section (4 Columns) */}
          <div className="md:col-span-6 lg:col-span-4 lg:flex lg:justify-center">
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs mx-auto md:mx-0 lg:mx-auto">
              
              {/* Column A: Explore */}
              <div>
                <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Esplora</h4>
                <ul className="space-y-4">
                  <FooterLink to="/" label="Home" />
                  <FooterLink to="/chi-siamo" label="Chi Siamo" />
                  <FooterLink to="/studio" label="Lo Studio" />
                  <FooterLink to="/blog" label="News & Blog" />
                  <FooterLink to="/prenota" label="Prenota Visita" highlight />
                </ul>
              </div>

              {/* Column B: Treatments */}
              <div>
                <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Trattamenti</h4>
                <ul className="space-y-4">
                  <FooterLink to="/servizi" label="Igiene e Prevenzione" />
                  <FooterLink to="/servizi" label="Implantologia" />
                  <FooterLink to="/servizi" label="Ortodonzia" />
                  <FooterLink to="/servizi" label="Estetica Dentale" />
                  <FooterLink to="/login" label="Area Staff" />
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Right: Contacts & Hours (4 Columns Combined) */}
          <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8 max-w-xs mx-auto md:max-w-none md:mx-0 w-full">
            
            {/* Contacts */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Contatti</h4>
              <ul className="space-y-6">
                <li>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    <MapPin size={12} /> Sede
                  </div>
                  <div className="text-sm font-medium text-slate-300">Lungarno Pacinotti, 26 <br/> 56125 Pisa (PI)</div>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    <Phone size={12} /> Telefono
                  </div>
                  <a href="tel:+39050123456" className="text-sm font-medium text-white hover:text-primary transition-colors">
                    +39 050 123456
                  </a>
                </li>
                <li>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                    <Mail size={12} /> Email
                  </div>
                  <a href="mailto:info@studiogeri.it" className="text-sm font-medium text-white hover:text-primary transition-colors">
                    info@studiogeri.it
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Orari</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lun - Ven</span>
                  <span className="text-xs font-bold text-white">09:00 - 19:00</span>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sab - Dom</span>
                  <span className="text-xs font-bold text-slate-600">Chiuso</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center md:text-left">
            &copy; {currentYear} Studio Dentistico Luciano Geri. <br className="md:hidden"/> P.IVA 01234567890.
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
            <a href="#" className="hover:text-white transition-colors">Note Legali</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ to, label, highlight }) => (
  <li>
    <Link 
      to={to} 
      className={`text-sm font-bold transition-colors ${
        highlight ? 'text-white hover:text-primary' : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </Link>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;