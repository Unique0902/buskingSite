import React, { useState } from 'react';

import Icon from '../../../assets/icon/icon';
import { useAuthContext } from '../../../context/AuthContext';
import { usePlaylist } from '../../../hooks/UsePlaylist';
import { useUserData } from '../../../hooks/UseUserData';
import LoginMenu from '../../LoginMenu/LoginMenu';
import PlaylistMenu from '../../PlaylistMenu/PlaylistMenu';
type Props = {
  isShowSideBar: boolean;
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AppHeader({ isShowSideBar, setIsShowSideBar }: Props) {
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData },
  } = useUserData(uid);
  const { nowPlaylist } = usePlaylist(uid);
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState<boolean>(false);
  const [isShowLoginMenu, setIsShowLoginMenu] = useState<boolean>(false);

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
          {isShowPlaylistMenu && (
            <PlaylistMenu setIsShowPlaylistMenu={setIsShowPlaylistMenu} />
          )}
          <button
            className='flex items-center text-xl text-white hover:scale-110'
            onClick={() => {
              setIsShowPlaylistMenu(true);
            }}
          >
            {nowPlaylist ? nowPlaylist.name : 'No Playlist..'}
            <div className='ml-2'>
              <Icon size={20} color='white' icon='ArrowDown' />
            </div>
          </button>
        </div>
        <div className='relative'>
          <button
            className='text-xl text-white hover:scale-110'
            onClick={() => {
              setIsShowLoginMenu(true);
            }}
          >
            {userData && userData.name}
          </button>
          {isShowLoginMenu && userData && (
            <LoginMenu
              userData={userData}
              setIsShowLoginMenu={setIsShowLoginMenu}
            />
          )}
        </div>
      </header>
    </>
  );
}
