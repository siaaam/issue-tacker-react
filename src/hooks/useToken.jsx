import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const loadToken = () => {
    const localToken = localStorage.getItem('issue-tracker-token');
    setToken(localToken);
    setLoaded(true);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return { token, loaded };
};

export default useToken;
