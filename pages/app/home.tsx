import React from 'react';

import MainSec from '../../components/Main/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylist/NoPlaylistCheckWrapper';
import { useAuthContext } from '../../context/AuthContext';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { useUserData } from '../../hooks/UseUserData';
import { getAppLayOut } from '../../layouts/appLayout';

export default function AppHome() {
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData },
  } = useUserData(uid);
  const { nowPlaylist } = usePlaylist(uid);

  return (
    <>
      <MainSec>
        <div className=''>
          <h1 className='mb-5 text-3xl font-bold'>
            어서오세요! {userData ? userData.name : '...'} 님!
          </h1>
        </div>
        <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
          <h2 className='text-3xl font-normal '>
            현재 플레이리스트는 {nowPlaylist && nowPlaylist.name}입니다.
          </h2>
        </NoPlaylistCheckWrapper>
      </MainSec>
    </>
  );
}
getAppLayOut(AppHome);
