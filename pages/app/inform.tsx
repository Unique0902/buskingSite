import React from 'react';

import MainSec from '../../components/Main/MainSec';
import RowWithTitle from '../../components/Row/RowWithTitle';
import RowWithTitleAndArrow from '../../components/Row/RowWithTitleAndArrow';
import TitleBar from '../../components/Main/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useBusking } from '../../hooks/UseBusking';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { useUserData } from '../../hooks/UseUserData';
import { getAppLayOut } from '../../layouts/appLayout';
export default function AppInform() {
  const { uid, logout } = useAuthContext();
  const {
    buskingQuery: { data: buskingData },
    removeBusking,
  } = useBusking(uid);
  const {
    removeUserPlaylists,
    playlistQuery: { data: playlists },
  } = usePlaylist(uid);
  const {
    userDataQuery: { data: userData },
    removeUserData,
  } = useUserData(uid);
  const dayToMakeUser = userData ? new Date(userData.date) : null;
  const handleClickRemoveUserBtn = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      if (uid) {
        removeUserData(uid);
        if (playlists) {
          removeUserPlaylists(uid);
        }
        if (buskingData) {
          await removeBusking(uid);
        }
        logout();
      } else {
        throw new Error('no uid!!');
      }
    }
  };
  return (
    <>
      <TitleBar text={'내 정보'} />
      <MainSec>
        <RowWithTitle title={'닉네임'}>
          <p className='text-lg font-normal '>
            {userData ? userData.name : 'no userData!'}
          </p>
        </RowWithTitle>
        <RowWithTitle title={'가입일자'}>
          <p className='text-lg font-normal '>
            {dayToMakeUser
              ? `${dayToMakeUser.getFullYear()}년 ${
                  dayToMakeUser.getMonth() + 1
                }월 ${dayToMakeUser.getDate()}일`
              : 'now date data!'}
          </p>
        </RowWithTitle>
        <button onClick={handleClickRemoveUserBtn} className='text-left'>
          <RowWithTitleAndArrow title={'회원 탈퇴'} />
        </button>
      </MainSec>
    </>
  );
}
getAppLayOut(AppInform);
