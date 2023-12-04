import React, { useRef } from 'react';
import { useState } from 'react';
import PlaylistMenu from '../../PlaylistMenu/PlaylistMenu';
import LoginMenu from '../../LoginMenu/LoginMenu';
import { useUserDataContext } from '../../../context/UserDataContext';
import { usePlaylistContext } from '../../../context/PlaylistContext';
import { ArrowDownIcn, MenuIcn } from '../../../assets/icon/icon';
type Props = {
  isShowSideBar: boolean;
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AppHeader({ isShowSideBar, setIsShowSideBar }: Props) {
  const { userData } = useUserDataContext();
  const { nowPlaylist } = usePlaylistContext();
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
            <MenuIcn width={24} height={24} color={'white'} className='mr-6' />
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
            <ArrowDownIcn
              width={20}
              height={20}
              color={'white'}
              className='ml-2'
            />
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
