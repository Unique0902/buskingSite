import React from 'react';

import Icon from '../../../assets/icon/icon';
import { useAuthContext } from '../../../context/AuthContext';
import { usePlaylist } from '../../../hooks/UsePlaylist';
import { useUserData } from '../../../hooks/UseUserData';
import LoginMenu from '../../LoginMenu/LoginMenu';
import PlaylistMenu from '../../PlaylistMenu/PlaylistMenu';
import PopUpMenu from '../../PopUp/PopUpMenu';
import HeaderMenuBtn from './HeaderMenuBtn';
type Props = {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  isSmScreen: boolean;
};
export default function AppHeader({ setIsShowSideBar, isSmScreen }: Props) {
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData },
  } = useUserData(uid);
  const {
    playlistQuery: { data: playlists },
    nowPlaylist,
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    changeNowPlaylist,
  } = usePlaylist(uid);
  const playlistHandler = {
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    changeNowPlaylist,
  };

  return (
    <>
      <header className='flex justify-between mb-10 '>
        <div className='relative flex items-center'>
          {isSmScreen && (
            <HeaderMenuBtn onClick={() => setIsShowSideBar((prev) => !prev)} />
          )}
          <PopUpMenu>
            <PopUpMenu.OuterBtn>
              <div className='flex items-center text-xl text-white hover:scale-110'>
                {nowPlaylist?.name ?? 'No Playlist..'}
                <div className='ml-2'>
                  <Icon size={20} color='white' icon='ArrowDown' />
                </div>
              </div>
            </PopUpMenu.OuterBtn>
            <PopUpMenu.Inner isPopUpInnerLeft>
              <PlaylistMenu
                playlists={playlists}
                nowPlaylist={nowPlaylist}
                playlistHandler={playlistHandler}
              />
            </PopUpMenu.Inner>
          </PopUpMenu>
        </div>
        <div className='relative'>
          <PopUpMenu>
            <PopUpMenu.OuterBtn>
              <div className='flex items-center text-xl text-white hover:scale-110'>
                {userData?.name}
              </div>
            </PopUpMenu.OuterBtn>
            <PopUpMenu.Inner isPopUpInnerLeft={false}>
              <LoginMenu userData={userData} />
            </PopUpMenu.Inner>
          </PopUpMenu>
        </div>
      </header>
    </>
  );
}
