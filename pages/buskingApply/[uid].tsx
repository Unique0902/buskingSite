import React, { useState, useEffect, useCallback } from 'react';
import { useIpContext } from '../../context/IpContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import MainSec from '../../components/MainSec';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { SendIcn } from '../../assets/icon/icon';
import { ApplianceData, BuskingData } from '../../store/type/busking';
import { PlaylistData, PlaylistSongData } from '../../store/type/playlist';
import ThemeBtn from '../../components/Layout/Footer/ThemeBtn';
import SearchBar from '../../components/Search/SearchBar';
import PrimarySongResult from '../../components/Table/PrimarySongResult';
import RequestSongResult from '../../components/Table/RequestSongResult';
import useSearch from '../../hooks/UseSearch';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import SongTable from '../../components/Table/SongTable';
//TODO: 닉네임 검색기능 추가하기
//TODO: getIp 기능 오류 자꾸나는거 어떻게좀하기
const App = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [buskingData, setBuskingData] = useState<BuskingData | null>(null);
  const [nowPlaylistSongArr, setNowPlaylistSongArr] = useState<
    PlaylistSongData[]
  >([]);
  const [appliance, setAppliance] = useState<ApplianceData[]>([]);
  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);
  const [ip, setIp] = useState<string | undefined>('');
  const router = useRouter();
  const userId = router.query.uid ? router.query.uid.toString() : null;
  const { getIp } = useIpContext();
  const { applyOldBuskingSong, applyNewBuskingSong, getBuskingData } =
    useBuskingContext();
  const { getPlaylists } = usePlaylistContext();
  const { getUserData } = useUserDataContext();

  const [playlistSearchProps] = useSearch<PlaylistSongData>(nowPlaylistSongArr);
  const [applianceSearchProps] = useSearch<ApplianceData>(appliance);

  useEffect(() => {
    if (isUser && userId) {
      getPlaylists(userId).then((data) => {
        if (!data) return;
        const listArr = Object.values(data);
        if (listArr.length > 0) {
          setNowPlaylist(listArr[0]);
          // nowPlaylist.songs && setNowPlaylistSongArr(Object.values(nowPlaylist.songs));
          // setState함수는 비동기적으로 동작하므로 위 코드에 nowPlaylist가 잘들어갔는지 보장할 수 없다!
          //따라서 아래처럼 코드를 바꾸었다.
          listArr[0].songs &&
            setNowPlaylistSongArr(Object.values(listArr[0].songs));
        }
      });
    }
  }, [isUser, userId, getPlaylists]);

  useEffect(() => {
    getIp().then((ip1) => setIp(ip1));
  }, [getIp]);

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

  //userId를 분리해주자!! 함수의 독립성 키워주기!!
  const checkIsUser = useCallback(async (uid: string) => {
    const data = await getUserData(uid);
    setIsUser(!!data);
  }, []);
  // 왜 checkIsUser를 dependency에 넣어주어야하지? <<해결됨
  useEffect(() => {
    if (userId) {
      checkIsUser(userId);
    }
  }, [userId]);

  const handleBuskingData = useCallback(
    async (uid: string) => {
      const data = await getBuskingData(uid);
      setBuskingData(data);
    },
    [userId]
  );

  // 왜 handleBuskingData를 dependency에 넣어주어야하지?<<해결됨

  // eslint 업그레이드 한다<<해결됨
  useEffect(() => {
    if (userId && !buskingData && isUser) {
      handleBuskingData(userId);
    }
  }, [userId, isUser, buskingData]);

  //TODO:여기서 userID를 분리할수있을까?
  const handleApplySong = (sid: string) => {
    if (buskingData && userId && ip) {
      const appliedSongData = appliance.find((song) => song.sid === sid);
      if (appliedSongData) {
        const isUserApplied = !!appliedSongData.applicants.find(
          (ap) => ap.ip === ip
        );
        if (isUserApplied) {
          window.alert('이미 투표하셨습니다!');
          return;
        }
        applyOldBuskingSong(userId, sid, ip, appliedSongData).finally(() => {
          handleBuskingData(userId);
        });
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
            ip
          ).finally(() => {
            handleBuskingData(userId);
          });
        } else {
          throw new Error(
            'there is no song that you apply in nowPlaylistSongArr!!'
          );
        }
      }
    }
  };

  if (!ip) {
    return <div>accessing your ip address...</div>;
  }

  return (
    <section className='relative flex w-full h-screen px-8 py-4 overflow-auto max-md:px-4 bg-gradient-to-b from-blue-500 to-mainBlue'>
      <section className='w-full'>
        {!isUser && (
          <MainSec>
            <h1 className='text-xl font-semibold'>
              해당하는 유저가 존재하지않습니다.
            </h1>
          </MainSec>
        )}
        {isUser &&
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
                      optionValueArr={['제목', '가수']}
                    />
                    <SearchBar.MainSec.InputWithButton
                      handleClickBtn={playlistSearchProps.handleSearchBtnClick}
                    />
                    <SearchBar.MainSec.Button
                      handleClickBtn={playlistSearchProps.handleSearchBtnClick}
                      text='검색'
                    />
                  </SearchBar.MainSec>
                  <SearchBar.SubSec
                    render={() => (
                      <ArrangeMenuBtn
                        results={nowPlaylistSongArr}
                        setResults={setNowPlaylistSongArr}
                        isBusking={false}
                      />
                    )}
                  ></SearchBar.SubSec>
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
                      >
                        <SendIcn width={24} height={24} color={'white'} />
                      </PrimarySongResult>
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
                      >
                        <SendIcn width={24} height={24} color={'white'} />
                      </RequestSongResult>
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
                        optionValueArr={['제목', '가수']}
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
                    <SearchBar.SubSec
                      render={() => (
                        <ArrangeMenuBtn
                          results={nowPlaylistSongArr}
                          setResults={setNowPlaylistSongArr}
                          isBusking={false}
                        />
                      )}
                    ></SearchBar.SubSec>
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
                          handleSongClick={(sid: string) => {}}
                        >
                          <SendIcn width={24} height={24} color={'white'} />
                        </PrimarySongResult>
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
      <footer className='fixed right-6 bottom-6'>
        <ThemeBtn />
      </footer>
    </section>
  );
};

export default App;
