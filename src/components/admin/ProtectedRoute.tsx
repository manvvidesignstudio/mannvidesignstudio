import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#11110F] flex items-center justify-center text-[#F5F2EC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
          <p className="font-serif tracking-widest text-sm text-[#A39B8E] uppercase">Verifying Access</p>
        </div>
      </div>
    );
  }

  if (user?.app_metadata?.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
