'use client';

import { useAppSelector } from '@/lib/redux';
import { Frown } from 'lucide-react';
import { ReactNode } from 'react';

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.authSlice);

  const isAdmin = user.role === 'Admin';

  if (isAdmin) {
    return children;
  }

  return (
    <div className="custom-container h-full w-full flex-center justify-center flex-col py-20">
      <Frown size={100} className="text-foreground-700 mx-auto"/>
      <h1 className="text-3xl font-bold text-center text-foreground-800">
        Sorry
      </h1>
      <p className="text-lg font-semibold text-foreground-700 text-center">
        Unauthorized Access!
      </p>
    </div>
  );
};

export default AdminRoute;
