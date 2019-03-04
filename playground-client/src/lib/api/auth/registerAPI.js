import axios from 'axios';

export const register = ({ ...rest }) => {
  return axios.post('/api/auth/register', { ...rest });
};

export const checkUserIdExists = (userId) => {
  return axios.get(`/api/auth/exists/userid/${userId}`);
};

export const checkUserNameExists = (userName) => {
  return axios.get(`/api/auth/exists/username/${userName}`);
};

