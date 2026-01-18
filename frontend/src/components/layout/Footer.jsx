import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Rich Slate Navy Background
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
            <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
              Eccellenza odontoiatrica nel cuore storico di Pisa dal 1980. 
              Uniamo tradizione medica e tecnologie digitali per la cura del tuo sorriso.
            </p>
          </div>

          {/* 2. Middle: Dual Column Menu Section (4 Columns) */}
          <div className="md:col-span-6 lg:col-span-4 lg:flex lg:justify-center">
            {/* Added 'mx-auto md:mx-0 lg:mx-auto' to center block on mobile/desktop but left-align on tablet */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs mx-auto md:mx-0 lg:mx-auto">
              
              {/* Column A: General */}
              <div>
                <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Menu</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/studio" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Lo Studio</Link></li>
                  <li><Link to="/prenota" className="text-sm font-bold text-white hover:text-primary transition-colors">Prenota Visita</Link></li>
                  <li><Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Staff Login</Link></li>
                </ul>
              </div>

              {/* Column B: Treatments */}
              <div>
                <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Trattamenti</h4>
                <ul className="space-y-4">
                  <li><Link to="/servizi" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Igiene</Link></li>
                  <li><Link to="/servizi" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Implantologia</Link></li>
                  <li><Link to="/servizi" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Ortodonzia</Link></li>
                  <li><Link to="/servizi" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Estetica</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Right: Contacts & Hours (4 Columns Combined) */}
          {/* Added 'max-w-xs mx-auto md:max-w-none md:mx-0' to center block on mobile */}
          <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8 max-w-xs mx-auto md:max-w-none md:mx-0 w-full">
            
            {/* Contacts */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-primary font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Contatti</h4>
              <ul className="space-y-6">
                <li>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">Sede</div>
                  <div className="text-sm font-medium text-slate-300">Lungarno Pacinotti, 26 <br/> 56125 Pisa (PI)</div>
                </li>
                <li>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">Telefono</div>
                  <a href="tel:+39050123456" className="text-sm font-medium text-white hover:text-primary transition-colors">
                    +39 050 123456
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

export default Footer;