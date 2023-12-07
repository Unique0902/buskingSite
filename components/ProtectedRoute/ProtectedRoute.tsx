import React, { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { useAuthContext } from '../../context/AuthContext';
type Props = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const { user, userLoading } = useAuthContext();
  const router = useRouter();

  if (userLoading) {
    return (
      <>
        <div>check user...</div>
      </>
    );
  } else {
    if (!user) {
      router.push('/');
      return <div>move to homepage...</div>;
    }
  }

  return <>{children}</>;
}
