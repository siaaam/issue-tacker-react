import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const { token, loaded } = useToken();

  async function loadUser() {
    try {
      const res = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const info = res.data;
      setUser({
        id: info.id,
        username: info.username,
        email: info.email,
      });
    } catch (err) {
      toast.error('please login first');
    } finally {
      setUserLoaded(true);
    }
  }

  useEffect(() => {
    if (loaded) {
      loadUser();
    }
  }, [loaded]);

  const saveAuthInfo = (info) => {
    //save jwt in local storage
    localStorage.setItem('issue-tracker-token', info.jwt);
    //save user into state
    setUser({
      id: info.user.id,
      username: info.user.username,
      email: info.user.email,
    });
  };

  const removeAuthInfo = () => {
    setUser(null);
    localStorage.removeItem('issue-tracker-token');
  };

  const value = {
    saveAuthInfo,
    userLoaded,
    removeAuthInfo,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
