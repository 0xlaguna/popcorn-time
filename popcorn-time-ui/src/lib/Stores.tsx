import create from 'zustand';
import { getCookie, setCookies, removeCookies } from 'cookies-next';
import { isNil } from 'ramda';

interface IUser {
  username: string | null;
}

interface UserState {
  jwt: string | null;
  user: IUser | null;
  setJwt: (jwt: string) => void;
  logOut: () => void;
}

// a real use case would be create a HOC component
// that only renders if there is a session

export const useSessionStore = create<UserState>()((set) => ({
  jwt: null,
  user: null,
  setJwt: (jwt) =>
    set((state) => {
      setCookies('pop-token', jwt, { maxAge: 60 * 60 * 24 * 30 });
      return { jwt: jwt };
    }),
  logOut: () => {
    removeCookies('pop-token');
    return { jwt: null };
  },
}));

export const hydrateSession = () => {
  const tk = getCookie('pop-token');

  if (!isNil(tk)) {
    useSessionStore.setState({ jwt: tk.toString() });
    return;
  }

  useSessionStore.setState({ jwt: null });
};
