import axios from 'axios';

export const getPost = (id) => {
  return axios.get(`/api/bulletin/reads/${id}`);
};

export const removePost = (id) => {
  return axios.delete(`/api/bulletin/${id}`);
};
