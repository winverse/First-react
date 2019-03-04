import axios from 'axios';
import querySrting from 'query-string';

export const getPostList = ({ page }) => {
  return axios.get(`/api/bulletin/posts/?${querySrting.stringify({ page })}`);
};
