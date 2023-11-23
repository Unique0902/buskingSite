import React, { useRef } from 'react';
import { useState } from 'react';
import PlaylistMenu from './PlaylistMenu';
import LoginMenu from './LoginMenu';
import { useUserDataContext } from '../context/UserDataContext';
import { usePlaylistContext } from '../context/PlaylistContext';
import { ArrowDownIcn, MenuIcn } from '../assets/icon/icon';

export default function AppHeader({ isShowSideBar, setIsShowSideBar }) {
  const { userData } = useUserDataContext();
  const { nowPlaylist } = usePlaylistContext();
  const valueRef = useRef();
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const [isShowLoginMenu, setIsShowLoginMenu] = useState(false);

  return (
    <>
      <header className='flex justify-between mb-10 '>
        <div className='flex items-center relative'>
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
            ref={valueRef}
            className='text-white font-sans text-xl hover:scale-110 flex items-center'
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
            className='font-sans text-white text-xl hover:scale-110'
            onClick={() => {
              setIsShowLoginMenu(true);
            }}
          >
            {userData && userData.name}
          </button>
          {isShowLoginMenu && (
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
