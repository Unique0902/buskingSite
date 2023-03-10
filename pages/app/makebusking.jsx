import React, { useEffect, useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import MainRow from '../../components/MainRow';
import { useUserDataContext } from '../../context/UserDataContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import { useRouter } from 'next/router';
import { useBuskingContext } from '../../context/BuskingContext';

export default function AppMakeBusking({}) {
  const [playlistArr, setPlaylistArr] = useState(null);
  const [buskingInform, setBuskingInform] = useState({
    playlistId: '',
    maxNum: 10,
    name: '',
  });
  const { buskingData, makeBusking } = useBuskingContext();
  const { playlists, nowPlaylist, addBasicPlaylist } = usePlaylistContext();
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
        <MainSec>
          <h3 className='font-sans font-semibold text-xl text-black'>
            플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
          </h3>
          <button
            onClick={() => {
              addBasicPlaylist();
            }}
            className='mt-4 font-sans text-2xl font-normal border border-black rounded-xl px-5 py-3 hover:bg-gray-200'
          >
            추가하기
          </button>
        </MainSec>
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
              className='border-2 border-black rounded-lg px-3 font-sans font-normal text-xl py-2'
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
              className='border-black border-2 p-2 rounded-xl w-2/12 max-md:w-5/6 font-sans text-lg'
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
              className='border-black border-2 p-2 rounded-xl w-1/3 max-md:w-5/6 font-sans text-lg'
            />
          </MainRow>
          <button
            onClick={() => {
              startBusking();
            }}
            className='  hover:bg-gray-200 text-start w-full font-sans  text-2xl font-normal text-blue-500 py-5 max-lg:pl-4 border-gray-300 border-b relative'
          >
            버스킹 시작하기
          </button>
        </MainSec>
      )}
    </>
  );
}
getAppLayOut(AppMakeBusking);
