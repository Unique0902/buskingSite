import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { getAppLayOut } from '../../layouts/appLayout';
import RowWithTitle from '../../components/Row/RowWithTitle';
import RowWithTitleAndArrow from '../../components/Row/RowWithTitleAndArrow';
export default function AppInform({
  userRepository,
  playlistRepository,
  buskingRepository,
}) {
  const { userData } = useUserDataContext();
  const { uid, logout } = useAuthContext();
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (userData) {
      setTime(new Date(userData.date));
    }
  }, [userData]);
  const handleClickInformRow = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      userRepository.removeUser(uid, () => {
        playlistRepository.removeUserPlaylists(uid);
        buskingRepository.removeBusking(uid, () => {});
        logout();
      });
    }
  };
  return (
    <>
      <TitleBar text={'내 정보'} />
      <MainSec>
        <RowWithTitle title={'닉네임'}>
          <p className='font-sans text-lg font-normal text-black'>
            {userData && userData.name}
          </p>
        </RowWithTitle>
        <RowWithTitle title={'가입일자'}>
          <p className='font-sans text-lg font-normal text-black'>
            {time &&
              `${time.getFullYear()}년 ${
                time.getMonth() + 1
              }월 ${time.getDate()}일`}
          </p>
        </RowWithTitle>
        <button onClick={handleClickInformRow} className='text-left'>
          <RowWithTitleAndArrow title={'회원 탈퇴'} />
        </button>
      </MainSec>
    </>
  );
}
getAppLayOut(AppInform);
