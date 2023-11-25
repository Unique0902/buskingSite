import React from 'react';
import PlaylistMenuBtn from './PlaylistMenuBtn';

const PlaylistBtn = ({
  playlist,
  changeNowPlaylist,
  setIsShowPlaylistMenu,
}) => {
  const handleClick = () => {
    changeNowPlaylist(playlist.id);
    setIsShowPlaylistMenu(false);
  };
  return (
    <PlaylistMenuBtn handleClick={handleClick}>{playlist.name}</PlaylistMenuBtn>
  );
};

export default PlaylistBtn;
