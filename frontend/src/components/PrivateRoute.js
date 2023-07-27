// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, tokenValid, ...rest }) => {
  return (
    <Route
      {...rest}
      element={tokenValid ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
