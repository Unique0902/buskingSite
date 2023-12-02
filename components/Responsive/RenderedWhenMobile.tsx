import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
type Props = {
  children: ReactNode;
};
export default function RenderedWhenMobile({ children }: Props) {
  const isLgMediaQuery = useMediaQuery({
    query: '(min-width:1024px)',
  });
  if (isLgMediaQuery) return <></>;
  return <>{children}</>;
}
