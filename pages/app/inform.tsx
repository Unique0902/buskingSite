import React from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { getAppLayOut } from '../../layouts/appLayout';
import RowWithTitle from '../../components/Row/RowWithTitle';
import RowWithTitleAndArrow from '../../components/Row/RowWithTitleAndArrow';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useBuskingContext } from '../../context/BuskingContext';
export default function AppInform({}) {
  const { userData, removeUserData } = useUserDataContext();
  const { removeUserPlaylists, playlists } = usePlaylistContext();
  const { buskingData, removeBusking } = useBuskingContext();
  const { uid, logout } = useAuthContext();

  const dayToMakeUser = new Date(userData.date);
  const handleClickRemoveUserBtn = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      await removeUserData(uid);
      if (playlists) {
        await removeUserPlaylists(uid);
      }
      if (buskingData) {
        await removeBusking();
      }
      logout();
    }
  };
  return (
    <>
      <TitleBar text={'내 정보'} />
      <MainSec>
        <RowWithTitle title={'닉네임'}>
          <p className='text-lg font-normal '>{userData.name}</p>
        </RowWithTitle>
        <RowWithTitle title={'가입일자'}>
          <p className='text-lg font-normal '>
            {`${dayToMakeUser.getFullYear()}년 ${
              dayToMakeUser.getMonth() + 1
            }월 ${dayToMakeUser.getDate()}일`}
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
