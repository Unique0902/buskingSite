import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingCheckWrapper({ isLoading, children }) {
  if (isLoading) return <LoadingSpinner />;
  return <>{children}</>;
}
