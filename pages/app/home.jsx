import React from 'react';
import MainSec from '../../components/MainSec';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { getAppLayOut } from '../../layouts/appLayout';

export default function AppHome() {
  const { userData } = useUserDataContext();
  const { nowPlaylist } = usePlaylistContext();
  return (
    <>
      <MainSec>
        <div className=''>
          <h1 className='text-black text-3xl font-sans font-bold mb-5'>
            어서오세요! {userData && userData.name} 님!
          </h1>
          {nowPlaylist ? (
            <h2 className='text-black text-3xl font-sans font-normal'>
              현재 플레이리스트는 {nowPlaylist.name}입니다.
            </h2>
          ) : (
            <h2 className='text-black text-3xl font-sans font-bold'>
              현재 플레이리스트가 존재하지않습니다.
            </h2>
          )}
        </div>
      </MainSec>
    </>
  );
}
getAppLayOut(AppHome);
