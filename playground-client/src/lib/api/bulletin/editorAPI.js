import axios from 'axios';

export const writePost = ({ ...rest }) => {
  return axios.post('/api/bulletin/write', { ...rest });
};

export const editPost = ({ id, ...rest }) => {
  return axios.patch(`/api/bulletin/editPost/${id}`, { ...rest });
};