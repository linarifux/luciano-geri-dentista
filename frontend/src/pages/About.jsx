import { motion } from 'framer-motion';
import { Award, Heart, Stethoscope, Users, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sara",
    role: "Direttore Sanitario & Implantologo",
    bio: "Con oltre 20 anni di esperienza, il Dr. Geri è specializzato in chirurgia implantare complessa e riabilitazione orale. La sua filosofia è mettere il paziente al centro di ogni cura.",
    image: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/472080868_122206340024200892_3626951326407839246_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cPGDK4dRrssQ7kNvwHKs_pD&_nc_oc=Adm-0nu6cZYr2goCCJI-pc1k32wQ79nscMlcPe2gwbidDOHq0x14V9IWwbD4CumtgWo&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=NpEGIO_smU5xiIyKMrEliA&oh=00_AfrVog1TYHpIGzaNkIqlLM4srEwd7tllr8_8soGsYECa2g&oe=69743409" // Replace with real image
  },
  {
    id: 2,
    name: "Dr. Cecilia Geri",
    role: "Ortodonzia & Pedodonzia",
    bio: "Specialista nel sorriso dei più piccoli e in ortodonzia invisibile. Crede che un bel sorriso nasca dalla prevenzione e dall'educazione fin dalla tenera età.",
    image: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/472179714_122206345262200892_8918825388269287454_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=l09UF0tzo_0Q7kNvwEAdygj&_nc_oc=AdnK4-dJvdPjifyUCccBoiBHV1M-QsVENURHwBUp1KvthnjNZ7uY0UK6CTdWzNMNTe8&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=Dgz3-xzEvyeaTqZihn_Vrw&oh=00_AfrMDlF3PpS6TPgtUfYc-sPeDEPlSIhMnsIAAPD_DXIilw&oe=697439E7" // Replace with real image
  },
  {
    id: 3,
    name: "Dr. Rosselli Del Turco Riccardo",
    role: "Igiene & Prevenzione",
    bio: "Appassionato di salute gengivale e prevenzione. Marco vi guiderà nel mantenimento perfetto della vostra salute orale con tecniche all'avanguardia.",
    image: "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/472157795_122206348670200892_5342011876812398404_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rWjMwSqxczUQ7kNvwGqndxz&_nc_oc=Adm3nAaGwhVYnU5UzL4qMufjiTEUhMhDLV6aSZ2l0lKjuQyeFL3qwrD831RUfKbSmos&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=rqJgd2BuFyLwM3Bf8Qlu-A&oh=00_AfpleHwBI21VyCnLy41SegSfuBEC3LBQ91_W0PUFzjK5dQ&oe=6974529E" // Replace with real image
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* --- Background Elements --- */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* 1. Header & Values */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Chi Siamo</span>
            <span className="h-px w-8 bg-primary"></span>
          </div>
          <h1 className="text-5xl font-black text-dark mb-6 tracking-tight">
            Non curiamo solo denti,<br />
            <span className="text-primary italic">ci prendiamo cura delle persone.</span>
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Nati dalla passione per l'eccellenza medica, il nostro studio unisce tecnologia d'avanguardia e calore umano. Crediamo che ogni paziente meriti un ascolto attento e un piano di cura su misura.
          </p>
        </motion.div>

        {/* 2. Values Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {[
            { icon: <Award size={32} />, title: "Eccellenza Clinica", text: "Formazione continua e protocolli rigorosi." },
            { icon: <Heart size={32} />, title: "Empatia", text: "Un ambiente rilassante dove ti sentirai a casa." },
            { icon: <Stethoscope size={32} />, title: "Tecnologia", text: "Strumentazione digitale per diagnosi precise." }
          ].map((val, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                {val.icon}
              </div>
              <h3 className="font-bold text-dark text-xl mb-2">{val.title}</h3>
              <p className="text-gray-500 text-sm">{val.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. Group Photo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden aspect-14/9 mb-32 group"
        >
          {/* Replace this URL with your actual TEAM GROUP PHOTO */}
          <img 
            src="https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/471764758_122205232628200892_1725519671566013830_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lb_mOwusFEoQ7kNvwFw6FXZ&_nc_oc=Adm6nDjgKLeMrcYrHJr9RauciwRahrQuW73QRnM4Psm7v58Awe2pXzACWM_bxVyPZkM&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=kM9NE6VVHHHvWMNWN-vlRg&oh=00_Afq_007Rh0-kM5a76r73DwcV-lml1itFwUAoaCh-5fOpYg&oe=69744135" 
            alt="Team Studio Geri" 
            className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex items-end p-10 md:p-20">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-2">La Nostra Squadra</h3>
              <p className="opacity-80 max-w-lg">Un team affiatato di professionisti che lavorano in sinergia per garantirti il miglior risultato possibile.</p>
            </div>
          </div>
        </motion.div>

        {/* 4. Individual Team Members */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-dark">I Nostri Specialisti</h2>
            <div className="hidden md:flex gap-2 text-primary">
              <Users /> <span className="font-bold text-sm uppercase tracking-widest">Medical Staff</span>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id} 
                variants={itemVariants}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="h-80 overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                   />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-dark mb-1">{member.name}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  {/* Social / Contact (Optional) */}
                  <div className="flex gap-3 pt-6 border-t border-gray-50">
                    <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-colors">
                      <Linkedin size={16} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-colors">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 5. Bottom CTA */}
        <div className="bg-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            Pronto a conoscere il team?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10">
            Prenota una prima visita di controllo. Saremo felici di ascoltare le tue esigenze e prenderci cura del tuo sorriso.
          </p>
          <Link 
            to="/prenota" 
            className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold tracking-widest hover:bg-white hover:text-dark transition-all relative z-10"
          >
            PRENOTA ORA
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;