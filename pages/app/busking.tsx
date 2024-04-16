import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import PrimaryBtn from '../../components/Btn/PrimaryBtn';
import HoverTextSection from '../../components/Hover/HoverTextSection';
import MainSec from '../../components/Main/MainSec';
import MusicBar from '../../components/MusicBar/MusicBar';
import SectionCopyText from '../../components/BuskingPage/SectionCopyText';
import SongResultRow from '../../components/Table/SongResultRow';
import { useAuthContext } from '../../context/AuthContext';
import { useBusking } from '../../hooks/UseBusking';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { useUserData } from '../../hooks/UseUserData';
import { getAppLayOut } from '../../layouts/appLayout';
import { ApplianceData, ApplianceObjects } from '../../store/type/busking';
import { color } from '../../styles/theme';
import { ApplianceDataArrangeOption } from '../../store/data/ArrangeOptions';
import ListPage from '../../components/ListPage/ListPage';
import { calculateDataIdxInTable } from '../../utils/calculate';
import NoSongScreen from '../../components/Table/NoSongScreen';
import { UseListPageDataWithAllData } from '../../hooks/UseListPageDataWithAllData';
//TODO: 본인이 노래 추가하는 기능 넣기 버스킹중일때 인식해서 플레이리스트에서 추가할수있게 버튼만들자!
export default function AppBusking() {
  const { uid } = useAuthContext();
  const {
    userDataQuery: { data: userData },
  } = useUserData(uid);
  const {
    playlistQuery: { data: playlists },
  } = usePlaylist(uid);
  const {
    buskingQuery: { data: buskingData, isLoading: isbuskingDataLoading },
    removeBuskingSong,
    removeBusking,
  } = useBusking(uid);

  const [songArr, setSongArr] = useState<ApplianceData[]>([]);
  const [songArrToView, setSongArrToView] = useState<ApplianceData[]>([]);
  const router = useRouter();

  const SONG_NUM_PER_PAGE = 6;

  // 객체의 멤버값이 나올수있는 타입은 기존타입과 undefined임!! null이 아님!! 구분하기
  useEffect(() => {
    if (buskingData) {
      const appliance: ApplianceObjects | undefined = buskingData.appliance;
      if (appliance) {
        const applianceArr = Object.values(appliance);
        setSongArr(
          applianceArr.sort((a, b) => parseInt(a.id) - parseInt(b.id))
        );
      } else {
        setSongArr([]);
      }
    }
  }, [buskingData]);

  useEffect(() => {
    if (!buskingData) router.push('/app/makebusking');
  }, [buskingData, router]);

  /*
  버스킹 데이터에서 노래 저장시 서버에서 sid 순서대로 저장되다보니 시간순서대로 저장되지않음
  그래도 각 신청곡 데이터 id에 time 데이터를 저장했기때문에 위 sort 함수와 같이 buskingData를
  받아올때마다 id 시간을 기준으로 정렬하여 보여줌
*/

  const handleClickEndBuskingBtn = () => {
    if (window.confirm('버스킹을 종료하시겠습니까?')) {
      removeBusking(uid).finally(() => {
        router.push('/app/home');
      });
    }
  };

  const handleRemoveRequestSong = (sid: string) => {
    removeBuskingSong(sid, uid);
  };

  const { viewedSongArr, handleViewedSongArrByPageNum } =
    UseListPageDataWithAllData(songArrToView, SONG_NUM_PER_PAGE);

  if (isbuskingDataLoading) {
    return <div>checking buskingData...</div>;
  }
  if (!buskingData) {
    return <div>move to makeBusking...</div>;
  }

  return (
    <>
      <section className='flex flex-row items-center justify-between pt-2 pb-5 border-b border-gray-600 max-lg:flex-col'>
        <h1 className='text-3xl font-semibold text-white w-96 max-lg:w-full max-lg:text-center max-lg:mb-4'>
          {userData && `${userData.name}님의 버스킹`}
        </h1>
        <div className='flex flex-row items-center justify-end gap-4 border-gray-400 lg:border-l grow'>
          <HoverTextSection
            text={'신청 URL 확인'}
            bgColor={color.white}
            textColor={color.gray_900}
          >
            <SectionCopyText
              text={`https://noraebook.netlify.app/buskingApply/${uid}`}
            />
          </HoverTextSection>
        </div>
      </section>

      <MusicBar songArr={songArr} setSongArrToView={setSongArrToView} />

      <MainSec>
        <section className='relative flex flex-row items-center justify-between max-lg:flex-col max-lg:items-start max-lg:px-4'>
          <h1 className='text-xl font-semibold text-center '>
            {playlists &&
              playlists[buskingData.playlistId] &&
              `현재 플레이리스트: ${playlists[buskingData.playlistId].name}`}
          </h1>
          <h2 className='text-xl font-semibold '>
            총 노래 수 {songArrToView ? songArrToView.length : 0}
          </h2>
        </section>
        <div className='flex flex-row justify-end'>
          <ArrangeMenuBtn<ApplianceData>
            setResults={setSongArrToView}
            arrangeOptionArr={ApplianceDataArrangeOption}
          />
        </div>

        <ListPage
          pageDataInform={{
            resultNumPerPage: SONG_NUM_PER_PAGE,
            resultTotalNum: songArrToView.length,
          }}
          pageDataArr={viewedSongArr}
          renderNoData={() => <NoSongScreen />}
          renderData={(result, idx, nowPageNum) => (
            <SongResultRow key={result.artist + result.title}>
              <SongResultRow.Text
                text={calculateDataIdxInTable(
                  idx,
                  nowPageNum,
                  SONG_NUM_PER_PAGE
                ).toString()}
              />
              <SongResultRow.Inform
                title={result.title}
                artist={result.artist}
              />
              <SongResultRow.Text text={result.cnt.toString() + '명'} />
              <SongResultRow.IconButton
                icon='Minus'
                size={20}
                color={color.white}
                onClick={() => handleRemoveRequestSong(result.sid)}
              />
            </SongResultRow>
          )}
          handleChangePage={handleViewedSongArrByPageNum}
        />

        <section className='flex flex-row justify-end pt-4'>
          <PrimaryBtn
            bgColor={color.warning}
            handleClick={handleClickEndBuskingBtn}
          >
            버스킹 종료
          </PrimaryBtn>
        </section>
      </MainSec>
    </>
  );
}
getAppLayOut(AppBusking);
