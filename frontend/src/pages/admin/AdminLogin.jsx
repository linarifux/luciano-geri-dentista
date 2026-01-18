import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser } from '../../store/slices/authSlice';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract state from Redux
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/admin/dashboard');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-secondary/10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-secondary/20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark tracking-tight">Area Riservata</h2>
          <div className="h-1 w-12 bg-primary mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-400 mt-4 text-sm font-medium uppercase tracking-widest">
            Studio Luciano Geri
          </p>
        </div>

        {/* Error Handling with Animation */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Email Professionale
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              placeholder="nome@studiogeri.it"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-primary hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Accedi al Pannello"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            className="text-gray-400 text-sm hover:text-primary transition-colors"
            onClick={() => navigate('/')}
          >
            ← Torna al sito principale
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;