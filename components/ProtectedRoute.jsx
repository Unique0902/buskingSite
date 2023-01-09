import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const { user, userLoading } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push('/');
      }
    }
  }, [user, userLoading]);

  if (userLoading) {
    return (
      <>
        <div>check user...</div>
      </>
    );
  }

  return children;
}
