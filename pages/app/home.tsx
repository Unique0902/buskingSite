import React from 'react';
import MainSec from '../../components/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
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
          <h1 className='mb-5 font-sans text-3xl font-bold text-black'>
            어서오세요! {userData.name} 님!
          </h1>
        </div>
        <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
          <h2 className='font-sans text-3xl font-normal text-black'>
            현재 플레이리스트는 {nowPlaylist && nowPlaylist.name}입니다.
          </h2>
        </NoPlaylistCheckWrapper>
      </MainSec>
    </>
  );
}
getAppLayOut(AppHome);