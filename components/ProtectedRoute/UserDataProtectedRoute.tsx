import React, { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useUserDataContext } from '../../context/UserDataContext';
type Props = {
  children: ReactNode;
};
export default function UserDataProtectedRoute({ children }: Props) {
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
  return <>{children}</>;
}
