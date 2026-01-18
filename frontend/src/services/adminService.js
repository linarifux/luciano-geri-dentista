import API from './api';

export const getDashboardStats = async () => {
  const { data } = await API.get('/admin/stats');
  return data;
};

export const getAppointments = async () => {
  const { data } = await API.get('/appointments');
  return data;
};

export const updateStatus = async (id, status) => {
  const { data } = await API.put(`/admin/appointments/${id}/status`, { status });
  return data;
};