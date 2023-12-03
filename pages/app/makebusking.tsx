import React, { useEffect, useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import MainRow from '../../components/Row/RowWithTitle';
import { useUserDataContext } from '../../context/UserDataContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import { useRouter } from 'next/router';
import { useBuskingContext } from '../../context/BuskingContext';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import { BuskingInform } from '../../store/type/busking';
// TODO: select나 input 컴포넌트화로 묶기
export default function AppMakeBusking({}) {
  const { buskingData, makeBusking } = useBuskingContext();
  const { playlists } = usePlaylistContext();
  const { userData } = useUserDataContext();
  const [buskingInform, setBuskingInform] = useState<BuskingInform>({
    playlistId: playlists ? Object.values(playlists)[0].id : '',
    maxNum: 10,
    name: `${userData.name}님의 버스킹`,
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
    makeBusking(buskingInform);
  };
  // 무작정 useEffect를 지운다고 성능이 좋아지는게 아니구나
  // 이런식으로 다 useEffect를 지운다면 이 컴포넌트가 받는 props, 부모가 리렌더링될때마다
  // 해당 코드가 계속 재실행될텐데 useEffect에 등록된다면 변수가 변할때만 코드가 실행되므로 오히려
  // useEffect로 인해 성능이 향상됨
  // useEffect를 사용하는 이유에 대해서 잘알자.. useEffect의 사용이유를 알지않고 무작정 성능 저하가 온다고 생각하고 사용하면서
  // 겪은 문제
  if (buskingData) {
    router.push('/app/busking');
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
