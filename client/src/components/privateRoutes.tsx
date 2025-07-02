import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router';

type PrivateRoutesProps = {
  children: React.ReactNode | React.ReactElement;
  roles?: string[];
};

const PrivateRoutes = ({ children, roles }: PrivateRoutesProps) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to='/auth/login' replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
