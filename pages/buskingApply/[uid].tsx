import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import HomeBtn from '../../components/Layout/Footer/HomeBtn';
import ThemeBtn from '../../components/Layout/Footer/ThemeBtn';
import LoadingCheckWrapper from '../../components/Loading/LoadingCheckWrapper';
import MainSec from '../../components/Main/MainSec';
import ModalIconBtn from '../../components/Modal/ModalIconBtn';
import SearchBar from '../../components/Search/SearchBar';
import SearchModalContent from '../../components/SearchModal/SearchModalContent';
import SongResultRow from '../../components/Table/SongResultRow';
import SongTable from '../../components/Table/SongTable';
import useBuskingData from '../../hooks/UseBuskingData';
import useIpData from '../../hooks/UseIpData';
import PlaylistRepository from '../../service/playlist_repository';
import UserRepository from '../../service/userRepository';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { PlaylistSongData } from '../../store/type/playlist';
import { color } from '../../styles/theme';
import { PlaylistSongDataArrangeOption } from '../../store/data/ArrangeOptions';
import { useMediaQueryContext } from '../../context/MediaQueryContext';
import {
  calculateDataIdxInTable,
  calculateTotalPageNum,
} from '../../utils/calculate';
import ListPage from '../../components/ListPage/ListPage';
import { UseListPageDataWithAllData } from '../../hooks/UseListPageDataWithAllData';
import NoSongScreen from '../../components/Table/NoSongScreen';
import NewSearchBar from '../../components/Search/NewSearchBar';
//TODO: getIp 기능 오류 자꾸나는거 어떻게좀하기
const userRepository = new UserRepository();
const playlistRepository = new PlaylistRepository();

const App = () => {
  const router = useRouter();
  const buskerUserId = router.query.uid?.toString();
  const {
    data: ipData,
    isError: isIpdataError,
    error: ipDataError,
    isLoading: isIpDataLoading,
  } = useIpData(buskerUserId);

  const { data: buskerData } = useQuery({
    queryKey: [buskerUserId, 'buskerData'],
    queryFn: () => userRepository.getUserData(buskerUserId as string),
    enabled: !!buskerUserId,
  });

  const { data: playlistData } = useQuery({
    queryKey: [buskerUserId, 'playlistData'],
    queryFn: () => playlistRepository.getPlaylists(buskerUserId as string),
    enabled: !!buskerUserId && !!buskerData,
  });

  const {
    buskingQueryResult: { data: buskingData },
    applyOldBuskingSong,
    applyNewBuskingSong,
  } = useBuskingData(buskerUserId, buskerData);

  const nowPlaylist = useMemo(
    () =>
      playlistData && Object.values(playlistData).length > 0
        ? Object.values(playlistData)[0]
        : undefined,
    [playlistData]
  );
  const nowPlaylistSongArr: PlaylistSongData[] = useMemo(
    () => (nowPlaylist?.songs ? Object.values(nowPlaylist.songs) : []),
    [nowPlaylist]
  );
  const appliance = useMemo(
    () =>
      buskingData?.appliance
        ? Object.values(buskingData.appliance).sort(
            (a, b) => parseInt(a.id) - parseInt(b.id)
          )
        : [],
    [buskingData]
  );

  const { isSmScreen } = useMediaQueryContext();

  //여기서 userID를 분리할수있을까? 분리해야되나?
  const handleApplySong = (sid: string) => {
    if (buskingData && buskerUserId && ipData) {
      const appliedSongData = appliance.find((song) => song.sid === sid);
      if (appliedSongData) {
        const isUserApplied = !!appliedSongData.applicants.find(
          (ap) => ap.ip === ipData
        );
        if (isUserApplied) {
          window.alert('이미 투표하셨습니다!');
          return;
        }
        applyOldBuskingSong(buskerUserId, sid, ipData, appliedSongData);
        alert(appliedSongData.title + ' 이 신청되었습니다!');
      } else {
        if (appliance.length === buskingData.maxNum) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        const songToApply = nowPlaylistSongArr.find((s) => s.id === sid);
        if (songToApply) {
          applyNewBuskingSong(
            buskerUserId,
            songToApply.title,
            songToApply.artist,
            sid,
            ipData
          );
          alert(songToApply.title + ' 이 신청되었습니다!');
        } else {
          throw new Error(
            'there is no song that you apply in nowPlaylistSongArr!!'
          );
        }
      }
    }
  };

  const SONG_NUM_PER_PAGE = 6;

  const {
    viewedSongArr: playlistViewedSongArr,
    handleViewedSongArrByPageNum: handlePlaylistViewedSongArrByPageNum,
    searchedSongArr: playlistSearchedSongArr,
    setSearchedSongArr: setPlaylistSearchedSongArr,
    handleSearch: handlePlaylistSearch,
  } = UseListPageDataWithAllData(nowPlaylistSongArr, SONG_NUM_PER_PAGE);

  const {
    viewedSongArr: applianceViewedSongArr,
    handleViewedSongArrByPageNum: handleApplianceViewedSongArrByPageNum,
  } = UseListPageDataWithAllData(appliance, SONG_NUM_PER_PAGE);

  if (isIpdataError) {
    console.error(ipDataError);
    return <div>ip를 불러올수 없습니다. 새로고침해주세요.</div>;
  }

  if (isIpDataLoading || !ipData) {
    return <div>accessing your ip address...</div>;
  }

  return (
    <section
      id='root'
      className='relative flex w-full h-screen px-8 py-4 overflow-auto max-md:px-4 bg-gradient-to-b from-blue-500 to-mainBlue'
    >
      <section className='w-full'>
        {!buskerData && (
          <MainSec>
            <h1 className='text-xl font-semibold'>
              해당하는 유저가 존재하지않습니다.
            </h1>
          </MainSec>
        )}
        {buskerData &&
          (buskingData ? (
            <section className=''>
              <section className='flex flex-row items-center pt-3 pb-8 border-b border-gray-600 max-lg:flex-col max-lg:text-center'>
                <h1 className='text-3xl font-semibold text-white w-96 max-lg:w-full max-lg:mb-3'>
                  {buskingData && buskingData.name}
                </h1>
                <div className='flex flex-row items-center justify-end mr-4 grow max-lg:flex-col'>
                  <h2 className='ml-8 text-2xl font-semibold text-white'>
                    {!!nowPlaylist &&
                      `선택된 플레이리스트: ${nowPlaylist.name}`}
                  </h2>
                </div>
              </section>

              <MainSec>
                <h2 className='text-3xl font-semibold max-md:text-center'>
                  신청가능 곡 리스트
                </h2>
                <div className='flex flex-row justify-end mb-3 max-lg:justify-center'>
                  <h3 className='text-xl font-normal '>
                    신청가능 곡 수 {nowPlaylistSongArr.length}
                  </h3>
                </div>

                <NewSearchBar categories={['제목', '가수']}>
                  <NewSearchBar.MainSec>
                    <NewSearchBar.MainSec.Select />
                    <NewSearchBar.MainSec.Input />
                    <NewSearchBar.MainSec.Button
                      handleClickBtn={handlePlaylistSearch}
                      text='검색'
                    />
                  </NewSearchBar.MainSec>
                  <NewSearchBar.SubSec>
                    <ArrangeMenuBtn<PlaylistSongData>
                      setResults={setPlaylistSearchedSongArr}
                      arrangeOptionArr={PlaylistSongDataArrangeOption}
                    />
                  </NewSearchBar.SubSec>
                </NewSearchBar>

                <ListPage
                  pageDataInform={{
                    resultNumPerPage: SONG_NUM_PER_PAGE,
                    resultTotalNum: playlistSearchedSongArr.length,
                    totalDataArr: playlistSearchedSongArr,
                  }}
                  pageDataArr={playlistViewedSongArr}
                  renderNoData={() => <NoSongScreen />}
                  handleChangePage={handlePlaylistViewedSongArrByPageNum}
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
                      <SongResultRow.IconButton
                        icon='Send'
                        size={20}
                        color={color.white}
                        onClick={() => handleApplySong(result.id)}
                      />
                    </SongResultRow>
                  )}
                />
              </MainSec>

              <MainSec>
                <h2 className='text-3xl font-semibold max-lg:text-center'>
                  신청된 곡 리스트
                </h2>
                <section className='relative flex items-center justify-end mb-6 max-md:justify-center'>
                  <h3 className='text-xl font-normal '>
                    신청된 곡 수 {appliance.length}
                  </h3>
                </section>

                <ListPage
                  pageDataInform={{
                    resultNumPerPage: SONG_NUM_PER_PAGE,
                    resultTotalNum: appliance.length,
                    totalDataArr: appliance,
                  }}
                  pageDataArr={applianceViewedSongArr}
                  renderNoData={() => <NoSongScreen />}
                  handleChangePage={handleApplianceViewedSongArrByPageNum}
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
                        icon='Send'
                        size={20}
                        color={color.white}
                        onClick={() => handleApplySong(result.sid)}
                      />
                    </SongResultRow>
                  )}
                />
              </MainSec>
            </section>
          ) : (
            <section>
              <MainSec>
                <h2 className='text-xl font-semibold w-96 max-lg:w-full'>
                  해당 유저는 버스킹 진행중이 아닙니다.
                </h2>
              </MainSec>

              {!nowPlaylist && (
                <section className='relative w-3/4 p-10 m-auto mt-8 bg-white rounded-2xl'>
                  <h2 className='text-3xl font-semibold '>
                    해당 유저의 플레이 리스트가 존재하지 않습니다.
                  </h2>
                </section>
              )}

              {nowPlaylist && (
                <MainSec>
                  <h2 className='text-3xl font-semibold max-lg:text-center'>
                    {nowPlaylist.name}
                  </h2>
                  <div className='flex flex-row justify-end mb-3'>
                    <h3 className='text-xl font-normal '>
                      곡 수 {nowPlaylistSongArr.length}
                    </h3>
                  </div>

                  <NewSearchBar categories={['제목', '가수']}>
                    <NewSearchBar.MainSec>
                      <NewSearchBar.MainSec.Select />
                      <NewSearchBar.MainSec.Input />
                      <NewSearchBar.MainSec.Button
                        handleClickBtn={handlePlaylistSearch}
                        text='검색'
                      />
                    </NewSearchBar.MainSec>
                    <NewSearchBar.SubSec>
                      <ArrangeMenuBtn<PlaylistSongData>
                        setResults={setPlaylistSearchedSongArr}
                        arrangeOptionArr={PlaylistSongDataArrangeOption}
                      />
                    </NewSearchBar.SubSec>
                  </NewSearchBar>

                  <ListPage
                    pageDataInform={{
                      resultNumPerPage: SONG_NUM_PER_PAGE,
                      resultTotalNum: playlistSearchedSongArr.length,
                      totalDataArr: playlistSearchedSongArr,
                    }}
                    pageDataArr={playlistViewedSongArr}
                    renderNoData={() => <NoSongScreen />}
                    handleChangePage={handlePlaylistViewedSongArrByPageNum}
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
                        <SongResultRow.IconButton
                          icon='Smile'
                          size={20}
                          color={color.white}
                          onClick={() => {}}
                        />
                      </SongResultRow>
                    )}
                  />
                </MainSec>
              )}
            </section>
          ))}
      </section>

      {createPortal(
        <footer className='fixed flex flex-col gap-4 right-8 bottom-6'>
          <ModalIconBtn icon='Search'>
            <ModalIconBtn.Inner>
              <SearchModalContent />
            </ModalIconBtn.Inner>
          </ModalIconBtn>
          <HomeBtn />
          <ThemeBtn />
        </footer>,
        document.body
      )}
    </section>
  );
};

export default App;
