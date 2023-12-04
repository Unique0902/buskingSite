import React, { ReactNode } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
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