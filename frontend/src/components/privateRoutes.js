import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const token = Cookies.get('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;