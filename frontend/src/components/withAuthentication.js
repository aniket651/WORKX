// src/components/withAuthentication.js
import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import api from './services/api';

const withAuthentication = (Component) => {
  return (props) => {
    const [tokenValid, setTokenValid] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        const tokenExpirationTime = decodeTokenExpirationTime(token);
        const currentTime = Date.now() / 1000;

        if (tokenExpirationTime < currentTime) {
          setTokenValid(false);
        } else if (tokenExpirationTime - currentTime < 300) {
          // If token is about to expire (within 5 minutes), refresh the token
          refreshAccessToken();
        }
      }
    }, [token]);

    const decodeTokenExpirationTime = (token) => {
      try {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.exp;
      } catch (error) {
        console.error('Failed to decode token:', error.message);
        return 0;
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await api.post('/auth/refresh', { token });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
      } catch (error) {
        console.error('Failed to refresh token:', error.message);
      }
    };

    if (!token || !tokenValid) {
      navigate('/login');
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuthentication;

