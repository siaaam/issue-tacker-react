import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const loadToken = () => {
    const localToken = localStorage.getItem('issue-tracker-token');
    setToken(localToken);
    setTokenLoaded(true);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return { token, tokenLoaded };
};

export default useToken;
