import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router';

type PrivateRoutesProps = {
  children: React.ReactNode | React.ReactElement;
  role?: string;
};

const PrivateRoutes = ({ children, role }: PrivateRoutesProps) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  console.log('PrivateRoutes state:', { user, loading, isAuthenticated });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.error('User is not authenticated');
    return <Navigate to='/auth/login' replace />;
  }

  if (role && user.role !== role) {
    console.error(`User does not have the required role: ${role}`);
    return <Navigate to='/auth/login' replace />;
  }

  console.log('Rendering protected content');
  return <>{children}</>;
};

export default PrivateRoutes;
