import axios from 'axios';
import { getCookie } from 'cookies-next';

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      headers: {
        token: getCookie('token') || '',
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        token: getCookie('token') || '',
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        token: getCookie('token') || '',
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        token: getCookie('token') || '',
      },
    }),
};
