import React, { useEffect } from 'react';
import { useUserDataContext } from '../../context/UserDataContext';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/AuthContext';

export default function UserDataProtectedRoute({ children }) {
  const { userLoading } = useAuthContext();
  const { userData, userDataLoading } = useUserDataContext();
  const router = useRouter();
  useEffect(() => {
    if (!userLoading) {
      if (!userDataLoading) {
        if (!userData) {
          router.push('/makeUser');
        } else {
          router.push('/app/home');
        }
      }
    }
  }, [userData, userDataLoading, userLoading]);
  if (userDataLoading) {
    return (
      <>
        <div>check userData...</div>
      </>
    );
  }
  return children;
}
