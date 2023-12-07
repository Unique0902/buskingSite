import React from 'react';

import PlaylistMenuBtn from './PlaylistMenuBtn';
import { PlaylistData } from '../../store/type/playlist';
type Props = {
  playlist: PlaylistData;
  changeNowPlaylist: (id: string) => void;
  setIsShowPlaylistMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlaylistBtn = ({
  playlist,
  changeNowPlaylist,
  setIsShowPlaylistMenu,
}: Props) => {
  const handleClick = () => {
    changeNowPlaylist(playlist.id);
    setIsShowPlaylistMenu(false);
  };
  return (
    <PlaylistMenuBtn handleClick={handleClick}>{playlist.name}</PlaylistMenuBtn>
  );
};

export default PlaylistBtn;
