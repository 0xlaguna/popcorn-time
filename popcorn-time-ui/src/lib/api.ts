import axios from 'axios';
import { getCookie } from 'cookies-next';

export const api = {
  get: <T>(url: string, headers: object, params?: object) =>
    axios.get<T>(url, {
      headers: {
        ...headers,
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getCookie('pop-token')}` || '',
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getCookie('pop-token')}` || '',
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${getCookie('pop-token')}` || '',
      },
    }),
};
