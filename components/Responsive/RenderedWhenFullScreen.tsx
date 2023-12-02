import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
type Props = {
  children: ReactNode;
};
export default function RenderedWhenFullScreen({ children }: Props) {
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  if (isLgMediaQuery) return <></>;
  return <>{children}</>;
}
