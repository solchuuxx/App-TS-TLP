import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface Props {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ element }) => {
  const location = useLocation();
  return isAuthenticated() ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
