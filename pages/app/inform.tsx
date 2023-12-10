import React from 'react';

import MainSec from '../../components/MainSec';
import RowWithTitle from '../../components/Row/RowWithTitle';
import RowWithTitleAndArrow from '../../components/Row/RowWithTitleAndArrow';
import TitleBar from '../../components/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { getAppLayOut } from '../../layouts/appLayout';
export default function AppInform() {
  const { userData, removeUserData } = useUserDataContext();
  const { removeUserPlaylists, playlists } = usePlaylistContext();
  const { buskingData, removeBusking } = useBuskingContext();
  const { uid, logout } = useAuthContext();

  const dayToMakeUser = userData ? new Date(userData.date) : null;
  const handleClickRemoveUserBtn = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      if (uid) {
        removeUserData(uid);
        if (playlists) {
          await removeUserPlaylists(uid);
        }
        if (buskingData) {
          await removeBusking();
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
