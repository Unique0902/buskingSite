import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import MainSec from '../../components/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import MainRow from '../../components/Row/RowWithTitle';
import TitleBar from '../../components/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserData } from '../../hooks/UseUserData';
import { getAppLayOut } from '../../layouts/appLayout';
import { BuskingInform } from '../../store/type/busking';
// TODO: select나 input 컴포넌트화로 묶기
// 플레이리스트 노래없으면 노래못만들게하기 < 해결완 물론 프론트에서만 처리해서 나중에 서버에서도 처리하려면 해도됨
export default function AppMakeBusking() {
  const {
    buskingQueryResult: { data: buskingData, isLoading: isbuskingDataLoading },
    makeBusking,
  } = useBuskingContext();
  const {
    playlistQueryResult: { data: playlists },
  } = usePlaylistContext();
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData },
  } = useUserData(uid);
  const [buskingInform, setBuskingInform] = useState<BuskingInform>({
    playlistId: playlists ? Object.values(playlists)[0].id : '',
    maxNum: 10,
    name: `${userData && userData.name}님의 버스킹`,
  });
  const router = useRouter();
  const handleChange = (value: string, label: string) => {
    setBuskingInform({ ...buskingInform, [label]: value });
  };

  useEffect(() => {
    if (playlists) {
      setBuskingInform((buskingInform) => ({
        ...buskingInform,
        playlistId: Object.values(playlists)[0].id,
      }));
    }
  }, [playlists]);

  useEffect(() => {
    if (buskingData) router.replace('/app/busking');
  }, [buskingData, router]);

  const startBusking = () => {
    if (!buskingInform.playlistId) {
      alert('플레이 리스트를 등록해주세요!');
      return;
    } else if (!buskingInform.maxNum) {
      alert('최대 곡수를 등록해주세요!');
      return;
    } else if (!buskingInform.name) {
      alert('방이름을 등록해주세요!');
      return;
    }
    if (playlists && !playlists[buskingInform.playlistId].songs) {
      alert('플레이리스트에 노래가 존재하지않습니다. 노래를 추가해주세요!');
      return;
    }
    makeBusking(buskingInform, uid);
  };
  // 무작정 useEffect를 지운다고 성능이 좋아지는게 아니구나
  // 이런식으로 다 useEffect를 지운다면 이 컴포넌트가 받는 props, 부모가 리렌더링될때마다
  // 해당 코드가 계속 재실행될텐데 useEffect에 등록된다면 변수가 변할때만 코드가 실행되므로 오히려
  // useEffect로 인해 성능이 향상됨
  // useEffect를 사용하는 이유에 대해서 잘알자.. useEffect의 사용이유를 알지않고 무작정 성능 저하가 온다고 생각하고 사용하면서
  // 겪은 문제

  //내상황에 대해 생각먼저해보고
  //shallow 도 생각해보기 (북마크해놓음)

  //유저의 페이지 이동이 잦은 사이트라면, 페이지 이동 시 전에 불러온 데이터를 그대로 사용하고
  //추가로 요청하지 않는 React Query가 적합할 것 같다.
  // SWR은 페이지 렌더링에 집중한다.
  //진짜 그런지 공식문서가서 공부하고 확인해보기 표지부터 읽어봐야징

  // 마운팅 렌더링 개념좀 확실하게 알기 마운팅이 정확히 언제인지 모르겠음.. (아마 리액트 생명주기, 작동원리를 배워야할듯) <해결
  if (!buskingData && isbuskingDataLoading) {
    return <div>loading buskingData..</div>;
  }

  if (buskingData) {
    return <div>move to busking page..</div>;
  }

  const playlistArr = playlists ? Object.values(playlists) : [];

  return (
    <>
      <TitleBar text={'버스킹하기'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!playlists}>
        <MainSec>
          <MainRow title={'플레이리스트 선택'}>
            <select
              name='playlists'
              value={buskingInform.playlistId}
              onChange={(e) => {
                handleChange(e.target.value, 'playlistId');
              }}
              className='px-3 py-2 text-xl font-normal border-2 border-black rounded-lg dark:bg-slate-500'
            >
              {playlistArr.map((playlist) => (
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
                handleChange(e.target.value, 'maxNum');
              }}
              className='w-2/12 p-2 text-lg border-2 border-black rounded-xl max-md:w-5/6 dark:bg-slate-500'
            />
          </MainRow>
          <MainRow title={'방 제목 설정'}>
            <input
              type='text'
              value={buskingInform.name}
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              className='w-1/3 p-2 text-lg border-2 border-black rounded-xl max-md:w-5/6 dark:bg-slate-500'
            />
          </MainRow>
          <button
            onClick={startBusking}
            className='relative w-full py-5 text-2xl font-normal text-blue-500 border-b border-gray-300 hover:opacity-70 text-start max-lg:pl-4'
          >
            버스킹 시작하기
          </button>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppMakeBusking);
