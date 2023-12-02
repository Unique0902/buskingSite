import React, { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';
type Props = {
  isLoading: boolean;
  children: ReactNode;
};
export default function LoadingCheckWrapper({ isLoading, children }: Props) {
  if (isLoading) return <LoadingSpinner />;
  return <>{children}</>;
}
