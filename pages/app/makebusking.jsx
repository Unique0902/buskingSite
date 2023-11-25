import React, { useEffect, useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import MainRow from '../../components/Row/RowWithTitle';
import { useUserDataContext } from '../../context/UserDataContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import { useRouter } from 'next/router';
import { useBuskingContext } from '../../context/BuskingContext';
import NoPlaylistSection from '../../components/NoPlaylistSection';

export default function AppMakeBusking({}) {
  const [playlistArr, setPlaylistArr] = useState(null);
  const [buskingInform, setBuskingInform] = useState({
    playlistId: '',
    maxNum: 10,
    name: '',
  });
  const { buskingData, makeBusking } = useBuskingContext();
  const { playlists, nowPlaylist } = usePlaylistContext();
  const { userData } = useUserDataContext();
  const router = useRouter();
  useEffect(() => {
    if (userData) {
      setBuskingInform({
        ...buskingInform,
        name: `${userData.name}님의 버스킹`,
      });
    }
  }, [userData]);
  useEffect(() => {
    if (playlists) {
      setPlaylistArr(Object.values(playlists));
    }
  }, [playlists]);
  useEffect(() => {
    if (playlistArr) {
      setBuskingInform({
        ...buskingInform,
        playlistId: playlistArr[0].id,
      });
    }
  }, [playlistArr]);

  useEffect(() => {
    if (buskingData) {
      router.push('/app/busking');
    }
  }, [buskingData]);

  const startBusking = () => {
    if (
      buskingInform.playlistId &&
      buskingInform.maxNum &&
      buskingInform.name
    ) {
      makeBusking(buskingInform, () => {});
    } else {
      if (!buskingInform.playlistId) {
        alert('플레이 리스트를 등록해주세요!');
      } else if (!buskingInform.maxNum) {
        alert('최대 곡수를 등록해주세요!');
      } else if (!buskingInform.name) {
        alert('방이름을 등록해주세요!');
      }
    }
  };
  return (
    <>
      <TitleBar text={'버스킹하기'} />
      {!nowPlaylist ? (
        <NoPlaylistSection />
      ) : (
        <MainSec>
          <MainRow title={'플레이리스트 선택'}>
            <select
              name='playlists'
              value={buskingInform.playlistId}
              onChange={(e) => {
                setBuskingInform({
                  ...buskingInform,
                  playlistId: e.target.value,
                });
              }}
              className='px-3 py-2 font-sans text-xl font-normal border-2 border-black rounded-lg'
            >
              {playlistArr &&
                playlistArr.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
            </select>{' '}
          </MainRow>
          <MainRow title={'최대 곡수 제한'}>
            <input
              type='number'
              value={buskingInform.maxNum}
              onChange={(e) => {
                setBuskingInform({
                  ...buskingInform,
                  maxNum: e.target.value,
                });
              }}
              className='w-2/12 p-2 font-sans text-lg border-2 border-black rounded-xl max-md:w-5/6'
            />
          </MainRow>
          <MainRow title={'방 제목 설정'}>
            <input
              type='text'
              value={buskingInform.name}
              onChange={(e) => {
                setBuskingInform({
                  ...buskingInform,
                  name: e.target.value,
                });
              }}
              className='w-1/3 p-2 font-sans text-lg border-2 border-black rounded-xl max-md:w-5/6'
            />
          </MainRow>
          <button
            onClick={() => {
              startBusking();
            }}
            className='relative w-full py-5 font-sans text-2xl font-normal text-blue-500 border-b border-gray-300  hover:bg-gray-200 text-start max-lg:pl-4'
          >
            버스킹 시작하기
          </button>
        </MainSec>
      )}
    </>
  );
}
getAppLayOut(AppMakeBusking);
