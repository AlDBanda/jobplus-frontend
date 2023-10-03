import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
