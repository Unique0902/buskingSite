import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import HomeBtn from '../../components/Layout/Footer/HomeBtn';
import ThemeBtn from '../../components/Layout/Footer/ThemeBtn';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import MainSec from '../../components/MainSec';
import SearchBar from '../../components/Search/SearchBar';
import PrimarySongResult from '../../components/Table/PrimarySongResult';
import RequestSongResult from '../../components/Table/RequestSongResult';
import SongTable from '../../components/Table/SongTable';
import { DarkModeContextProvider } from '../../context/DarkModeContext';
import useBuskingData from '../../hooks/UseBuskingData';
import useIpData from '../../hooks/UseIpData';
import useSearch from '../../hooks/UseSearch';
import PlaylistRepository from '../../service/playlist_repository';
import UserRepository from '../../service/userRepository';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { ApplianceData } from '../../store/type/busking';
import { PlaylistData, PlaylistSongData } from '../../store/type/playlist';

//TODO: 닉네임 검색기능 추가하기
//TODO: getIp 기능 오류 자꾸나는거 어떻게좀하기
const userRepository = new UserRepository();
const playlistRepository = new PlaylistRepository();

const App = () => {
  const [nowPlaylistSongArr, setNowPlaylistSongArr] = useState<
    PlaylistSongData[]
  >([]);
  const [appliance, setAppliance] = useState<ApplianceData[]>([]);
  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);
  const router = useRouter();
  const userId = router.query.uid ? router.query.uid.toString() : null;
  const {
    data: ipData,
    isError: isIpdataError,
    error: ipDataError,
    isLoading: isIpDataLoading,
  } = useIpData(userId);

  const playlistSearchProps = useSearch<PlaylistSongData>(nowPlaylistSongArr);
  const applianceSearchProps = useSearch<ApplianceData>(appliance);

  //TODO: custom hook으로 리팩토링하기
  const { data: buskerData } = useQuery({
    queryKey: [userId, 'buskerData'],
    queryFn: () => userRepository.getUserData(userId as string),
    enabled: !!userId,
  });

  const { data: playlistData } = useQuery({
    queryKey: [userId, 'playlistData'],
    queryFn: () => playlistRepository.getPlaylists(userId as string),
    enabled: !!userId && !!buskerData,
  });

  const {
    buskingQueryResult: { data: buskingData },
    applyOldBuskingSong,
    applyNewBuskingSong,
  } = useBuskingData(userId, buskerData);

  useEffect(() => {
    if (buskerData && playlistData) {
      if (!playlistData) return;
      const listArr = Object.values(playlistData);
      if (listArr.length > 0) {
        setNowPlaylist(listArr[0]);
        // nowPlaylist.songs && setNowPlaylistSongArr(Object.values(nowPlaylist.songs));
        // setState함수는 비동기적으로 동작하므로 위 코드에 nowPlaylist가 잘들어갔는지 보장할 수 없다!
        //따라서 아래처럼 코드를 바꾸었다.
        listArr[0].songs &&
          setNowPlaylistSongArr(Object.values(listArr[0].songs));
      }
    }
  }, [buskerData, playlistData]);

  useEffect(() => {
    if (buskingData && buskingData.appliance) {
      setAppliance(
        Object.values(buskingData.appliance).sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        )
      );
    } else {
      setAppliance([]);
    }
  }, [buskingData]);

  //TODO:여기서 userID를 분리할수있을까?
  const handleApplySong = (sid: string) => {
    if (buskingData && userId && ipData) {
      const appliedSongData = appliance.find((song) => song.sid === sid);
      if (appliedSongData) {
        const isUserApplied = !!appliedSongData.applicants.find(
          (ap) => ap.ip === ipData
        );
        if (isUserApplied) {
          window.alert('이미 투표하셨습니다!');
          return;
        }
        applyOldBuskingSong(userId, sid, ipData, appliedSongData);
      } else {
        if (appliance.length === buskingData.maxNum) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        const songToApply = nowPlaylistSongArr.find((s) => s.id === sid);
        if (songToApply) {
          applyNewBuskingSong(
            userId,
            songToApply.title,
            songToApply.artist,
            sid,
            ipData
          );
        } else {
          throw new Error(
            'there is no song that you apply in nowPlaylistSongArr!!'
          );
        }
      }
    }
  };

  if (isIpdataError) {
    console.error(ipDataError);
    return <div>ip를 불러올수 없습니다. 새로고침해주세요.</div>;
  }

  if (isIpDataLoading || !ipData) {
    return <div>accessing your ip address...</div>;
  }

  return (
    <section className='relative flex w-full h-screen px-8 py-4 overflow-auto max-md:px-4 bg-gradient-to-b from-blue-500 to-mainBlue'>
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
                <SearchBar
                  searchWord={playlistSearchProps.searchWord}
                  setSearchWord={playlistSearchProps.setSearchWord}
                >
                  <SearchBar.MainSec>
                    <SearchBar.MainSec.Select
                      optionValueArr={songSearchWordCategories}
                    />
                    <SearchBar.MainSec.InputWithButton
                      handleClickBtn={playlistSearchProps.handleSearchBtnClick}
                    />
                    <SearchBar.MainSec.Button
                      handleClickBtn={playlistSearchProps.handleSearchBtnClick}
                      text='검색'
                    />
                  </SearchBar.MainSec>
                  <SearchBar.SubSec>
                    <ArrangeMenuBtn
                      results={nowPlaylistSongArr}
                      setResults={setNowPlaylistSongArr}
                      isBusking={false}
                    />
                  </SearchBar.SubSec>
                </SearchBar>

                <LoadingCheckWrapper isLoading={playlistSearchProps.isLoading}>
                  <SongTable<PlaylistSongData>
                    viewdSongArr={playlistSearchProps.viewedDataArr}
                    nowPageNum={playlistSearchProps.nowPageNum}
                    renderSongResult={(index, result) => (
                      <PrimarySongResult
                        key={result.id}
                        index={index}
                        result={result}
                        handleSongClick={handleApplySong}
                        icon='Send'
                      />
                    )}
                  >
                    <SongTable.PagingBar
                      resultNum={nowPlaylistSongArr.length}
                      pageNum={playlistSearchProps.nowPageNum}
                      onPagePlus={playlistSearchProps.handlePlus}
                      onPageMinus={playlistSearchProps.handleMinus}
                    />
                  </SongTable>
                </LoadingCheckWrapper>
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

                <LoadingCheckWrapper isLoading={applianceSearchProps.isLoading}>
                  <SongTable<ApplianceData>
                    viewdSongArr={applianceSearchProps.viewedDataArr}
                    nowPageNum={applianceSearchProps.nowPageNum}
                    renderSongResult={(index, result) => (
                      <RequestSongResult
                        key={result.id}
                        index={index}
                        result={result}
                        handleSongClick={handleApplySong}
                        icon='Send'
                      />
                    )}
                  >
                    <SongTable.PagingBar
                      resultNum={appliance.length}
                      pageNum={applianceSearchProps.nowPageNum}
                      onPagePlus={applianceSearchProps.handlePlus}
                      onPageMinus={applianceSearchProps.handleMinus}
                    />
                  </SongTable>
                </LoadingCheckWrapper>
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
                    {nowPlaylist && nowPlaylist.name}
                  </h2>
                  <div className='flex flex-row justify-end mb-3'>
                    <h3 className='text-xl font-normal '>
                      곡 수 {nowPlaylistSongArr.length}
                    </h3>
                  </div>

                  <SearchBar
                    searchWord={playlistSearchProps.searchWord}
                    setSearchWord={playlistSearchProps.setSearchWord}
                  >
                    <SearchBar.MainSec>
                      <SearchBar.MainSec.Select
                        optionValueArr={songSearchWordCategories}
                      />
                      <SearchBar.MainSec.InputWithButton
                        handleClickBtn={
                          playlistSearchProps.handleSearchBtnClick
                        }
                      />
                      <SearchBar.MainSec.Button
                        handleClickBtn={
                          playlistSearchProps.handleSearchBtnClick
                        }
                        text='검색'
                      />
                    </SearchBar.MainSec>
                    <SearchBar.SubSec>
                      <ArrangeMenuBtn
                        results={nowPlaylistSongArr}
                        setResults={setNowPlaylistSongArr}
                        isBusking={false}
                      />
                    </SearchBar.SubSec>
                  </SearchBar>

                  <LoadingCheckWrapper
                    isLoading={playlistSearchProps.isLoading}
                  >
                    <SongTable<PlaylistSongData>
                      viewdSongArr={playlistSearchProps.viewedDataArr}
                      nowPageNum={playlistSearchProps.nowPageNum}
                      renderSongResult={(index, result) => (
                        <PrimarySongResult
                          key={result.id}
                          index={index}
                          result={result}
                          handleSongClick={() => {}}
                          icon='Smile'
                        />
                      )}
                    >
                      <SongTable.PagingBar
                        resultNum={nowPlaylistSongArr.length}
                        pageNum={playlistSearchProps.nowPageNum}
                        onPagePlus={playlistSearchProps.handlePlus}
                        onPageMinus={playlistSearchProps.handleMinus}
                      />
                    </SongTable>
                  </LoadingCheckWrapper>
                </MainSec>
              )}
            </section>
          ))}
      </section>
      {createPortal(
        <footer className='fixed flex flex-col gap-4 right-8 bottom-6'>
          <DarkModeContextProvider>
            <HomeBtn />
            <ThemeBtn />
          </DarkModeContextProvider>
        </footer>,
        document.body
      )}
    </section>
  );
};

export default App;
