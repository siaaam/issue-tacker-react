import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const saveAuthInfo = (info) => {
    //   save jwt in local storage
    localStorage.setItem('issue-tracker-token', info.jwt);
    // save user into state
    setUser({
      id: info.user.id,
      username: info.user.username,
      email: info.user.email,
    });
  };

  const value = {
    saveAuthInfo,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
