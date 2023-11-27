import React from 'react';
import NoPlaylistSection from './NoPlaylistSection';

export default function NoPlaylistCheckWrapper({ isExistWrapper, children }) {
  if (!isExistWrapper) return <NoPlaylistSection />;
  return <>{children}</>;
}
