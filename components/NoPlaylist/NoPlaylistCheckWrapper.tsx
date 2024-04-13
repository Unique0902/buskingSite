import React, { ReactNode } from 'react';

import NoPlaylistSection from './NoPlaylistSection';

type Props = {
  isExistWrapper: boolean;
  children: ReactNode;
};

export default function NoPlaylistCheckWrapper({
  isExistWrapper,
  children,
}: Props) {
  if (!isExistWrapper) return <NoPlaylistSection />;
  return <>{children}</>;
}
