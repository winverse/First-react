import axios from 'axios';

export const write = (content) => {
  return axios.post('/api/hurem/posts', { content });
};

export const list = () => {
  return axios.get('/api/hurem/posts');
};

export const next = (url) => {
  return axios.get(url);
};

export const like = (postId) => {
  return axios.post(`/api/hurem/likes/${postId}`);
};

export const unlike = (postId) => {
  return axios.delete(`/api/hurem/likes/${postId}`);
};

export const comment = ({ postId, text }) => {
  return axios.post(`/api/hurem/comments/${postId}`, { text });
};