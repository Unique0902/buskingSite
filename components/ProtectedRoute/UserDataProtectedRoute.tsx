import React, { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useAuthContext } from '../../context/AuthContext';
import { useUserData } from '../../hooks/UseUserData';
type Props = {
  children: ReactNode;
};
export default function UserDataProtectedRoute({ children }: Props) {
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData, isLoading },
  } = useUserData(uid);
  const router = useRouter();

  if (isLoading) {
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
  return <>{children}</>;
}
