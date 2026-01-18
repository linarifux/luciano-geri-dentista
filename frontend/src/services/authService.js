import API from './api';

export const login = async (email, password) => {
  const { data } = await API.post('/users/login', { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await API.post('/users/logout');
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get('/users/profile');
  return data;
};