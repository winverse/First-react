import axios from 'axios';

export const checkStatus = () => {
  return axios.get(`/api/auth/check`);
};

export const logout = () => {
  return axios.post('/api/auth/logout');
};

export const login = ({ ...rest }) => {
  return axios.post('/api/auth/login', { ...rest });
};