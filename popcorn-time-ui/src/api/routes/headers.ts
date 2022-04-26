import { getCookie } from 'cookies-next';

export const getHeaders = () => {
  return { Authorization: `Bearer ${getCookie('pop-token')}` || '' };
};
