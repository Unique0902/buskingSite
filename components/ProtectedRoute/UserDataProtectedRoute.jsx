import React, { useEffect } from 'react';
import { useUserDataContext } from '../../context/UserDataContext';
import { useRouter } from 'next/router';

export default function UserDataProtectedRoute({ children }) {
  const { userData, userDataLoading } = useUserDataContext();
  const router = useRouter();

  if (userDataLoading) {
    return (
      <>
        <div>check userData...</div>
      </>
    );
  } else {
    if (!userData) {
      router.push('/makeUser');
      return <div>move to makeUser Page...</div>;
    }
  }
  return children;
}
