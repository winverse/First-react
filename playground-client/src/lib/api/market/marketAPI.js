import axios from 'axios';

// EDITOR 
export const writePost = ({ ...rest }) => {
  return axios.post('/api/market/write', { ...rest });
};

export const getPost = (id) => {
  return axios.get(`/api/market/getPosts/${id}`);
};

// LIST
export const getList = () => {
  return axios.get(`/api/market`);
};

// POST
export const editPost = ({ id, ...rest }) => {
  return axios.patch(`/api/market/editPost/${id}`, { ...rest });
};

export const removePost = (id) => {
  return axios.delete(`/api/market/post/remove/${id}`);
};

// COMMENT

export const getComments = (id) => {
  return axios.get(`/api/market/comment/${id}`);
};

export const submitComment = ({ id, value }) => {
  return axios.post(`/api/market/comment/${id}`, { value });
};

export const submitRecomment = ({ postId, value, commentId }) => {
  return axios.post(`/api/market/recomment/${commentId}`,  { value, postId });
};

