// src/hooks/useToken.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/services/api';


const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const tokenExpirationTime = decodeTokenExpirationTime(token);
          const currentTime = Date.now() / 1000;

          if (tokenExpirationTime < currentTime) {
            setTokenValid(false);
          } else if (tokenExpirationTime - currentTime < 300) {
            // If token is about to expire (within 5 minutes), refresh the token
            refreshAccessToken();
          }
        } catch (error) {
          console.error('Failed to decode token:', error.message);
          setTokenValid(false);
        }
      } else {
        setTokenValid(false);
      }
    };

    const decodeTokenExpirationTime = (token) => {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.exp;
    };

    const refreshAccessToken = async () => {
      try {
        // Implement token refreshing logic here, e.g., make a request to the server to refresh the token
        const response = await api.post('/auth/refresh', { token });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
      } catch (error) {
        console.error('Failed to refresh token:', error.message);
        setTokenValid(false);
        navigate('/login');
      }
    };

    checkTokenValidity();
  }, [token, navigate]);

  return { token, tokenValid, setToken };
};

export default useToken;
