import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../store/slices/appointmentSlice';
import AdminDashboard from '../../components/admin/dashboard/AdminDashboard';
import DoctorDashboard from '../../components/admin/dashboard/DoctorDashboard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { items: appointments, loading } = useSelector((state) => state.appointments);

  // Fetch Data Once for the Page
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Loading State
  if (loading && !appointments) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Caricamento Dashboard...</p>
      </div>
    );
  }

  // --- ROLE-BASED RENDERING ---
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-10 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        {userInfo?.role === 'doctor' ? (
          <DoctorDashboard appointments={appointments} userInfo={userInfo} />
        ) : (
          <AdminDashboard appointments={appointments} userInfo={userInfo} />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;