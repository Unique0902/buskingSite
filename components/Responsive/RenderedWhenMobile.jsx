import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function RenderedWhenMobile({ children }) {
  const isLgMediaQuery = useMediaQuery({
    query: '(min-width:1024px)',
  });
  if (isLgMediaQuery) return <></>;
  return <>{children}</>;
}
