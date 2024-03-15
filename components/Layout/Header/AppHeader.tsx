import React from 'react';

import Icon from '../../../assets/icon/icon';
import { useAuthContext } from '../../../context/AuthContext';
import { usePlaylist } from '../../../hooks/UsePlaylist';
import { useUserData } from '../../../hooks/UseUserData';
import LoginMenu from '../../LoginMenu/LoginMenu';
import PlaylistMenu from '../../PlaylistMenu/PlaylistMenu';
import PopUpMenu from '../../PopUp/PopUpMenu';
type Props = {
  isShowSideBar: boolean;
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AppHeader({ isShowSideBar, setIsShowSideBar }: Props) {
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
          <button
            onClick={() => {
              setIsShowSideBar(!isShowSideBar);
            }}
            className='hidden max-lg:flex'
          >
            <div className='mr-6'>
              <Icon size={24} color='white' icon='Menu' />
            </div>
          </button>
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
              <div className='text-xl text-white hover:scale-110'>
                {userData && userData.name}
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
