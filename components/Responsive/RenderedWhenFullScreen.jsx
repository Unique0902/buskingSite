import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function RenderedWhenFullScreen({ children }) {
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  if (isLgMediaQuery) return <></>;
  return <>{children}</>;
}
