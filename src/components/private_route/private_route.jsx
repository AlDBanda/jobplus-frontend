import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

export default function Private_route({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
