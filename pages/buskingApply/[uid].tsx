import React, { useState, useEffect, useCallback } from 'react';
import { useIpContext } from '../../context/IpContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import MainSec from '../../components/MainSec';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { SendIcn, SmileIcn } from '../../assets/icon/icon';
import PrimarySongTable from '../../components/Table/PrimarySongTable';
import useSearchBar from '../../hooks/UseSearchBar';
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
const App = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [buskingData, setBuskingData] = useState<BuskingData | null>(null);
  const [nowPlaylistSongArr, setNowPlaylistSongArr] = useState<
    PlaylistSongData[]
  >([]);
  const [appliance, setAppliance] = useState<ApplianceData[]>([]);
  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);
  const [ip, setIp] = useState<string>('');
  const router = useRouter();
  const userId = router.query.uid ? router.query.uid.toString() : null;
  const { getIp } = useIpContext();
  const { applyOldBuskingSong, applyNewBuskingSong, getBuskingData } =
    useBuskingContext();
  const { getPlaylists } = usePlaylistContext();
  const { getUserData } = useUserDataContext();
  const [nowPlaylistPageNum, setNowPlaylistPageNum] = useState<number>(1);
  const [nowAppliancePageNum, setNowAppliancePageNum] = useState<number>(1);

  const [playlistSearchProps] = useSearch(nowPlaylistSongArr);
  const [applianceSearchProps] = useSearch(appliance);

  useEffect(() => {
    setNowPlaylistPageNum(1);
  }, [nowPlaylistSongArr]);
  useEffect(() => {
    setNowAppliancePageNum(1);
  }, [appliance]);

  const handlePlaylistPlusPageNum = () => {
    if (nowPlaylistPageNum < nowPlaylistSongArr.length / 6) {
      playlistSearchProps.searchByPageChange(nowPlaylistPageNum + 1);
      setNowPlaylistPageNum(nowPlaylistPageNum + 1);
    }
  };
  const handlePlaylistMinusPageNum = () => {
    if (nowPlaylistPageNum !== 1) {
      playlistSearchProps.searchByPageChange(nowPlaylistPageNum - 1);
      setNowPlaylistPageNum(nowPlaylistPageNum - 1);
    }
  };
  const handlePlaylistSearchBySearchWord = () => {
    setNowPlaylistPageNum(1);
    playlistSearchProps.searchBySearchWord();
  };

  const handleAppliancePlusPageNum = () => {
    if (nowAppliancePageNum < appliance.length / 6) {
      applianceSearchProps.searchByPageChange(nowAppliancePageNum + 1);
      setNowAppliancePageNum(nowAppliancePageNum + 1);
    }
  };
  const handleApplianceMinusPageNum = () => {
    if (nowAppliancePageNum !== 1) {
      applianceSearchProps.searchByPageChange(nowAppliancePageNum - 1);
      setNowAppliancePageNum(nowAppliancePageNum - 1);
    }
  };

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
    if (buskingData && userId) {
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

  // TODO:이름 좀더 명확하게 변경 필요2
  const handleClickBtn = () => {
    if (playlistSearchProps.searchWord.category) {
      handlePlaylistSearchBySearchWord();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playlistSearchProps.setSearchWord({
      ...playlistSearchProps.searchWord,
      name: e.target.value,
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playlistSearchProps.setSearchWord({
      ...playlistSearchProps.searchWord,
      category: e.target.value as '제목' | '가수',
    });
  };

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
                <SearchBar>
                  <SearchBar.MainSec>
                    <SearchBar.MainSec.Select
                      searchWord={playlistSearchProps.searchWord}
                      handleSelectChange={handleSelectChange}
                    >
                      <SearchBar.MainSec.Option value='제목' />
                      <SearchBar.MainSec.Option value='가수' />
                    </SearchBar.MainSec.Select>
                    <SearchBar.MainSec.Input
                      inputValue={playlistSearchProps.searchWord.name}
                      handleClickBtn={handleClickBtn}
                      handleInputChange={handleInputChange}
                    />
                    <SearchBar.MainSec.Button
                      handleClickBtn={handleClickBtn}
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
                  <SongTable
                    viewdSongArr={playlistSearchProps.viewedDataArr}
                    nowPageNum={nowPlaylistPageNum}
                    resultNum={nowPlaylistSongArr.length}
                    onPagePlus={handlePlaylistPlusPageNum}
                    onPageMinus={handlePlaylistMinusPageNum}
                    renderSongResult={(key, index, result) => (
                      <PrimarySongResult
                        key={key}
                        index={index}
                        result={result as PlaylistSongData}
                        handleSongClick={handleApplySong}
                      >
                        <SendIcn width={24} height={24} color={'white'} />
                      </PrimarySongResult>
                    )}
                  ></SongTable>
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
                  <SongTable
                    viewdSongArr={applianceSearchProps.viewedDataArr}
                    nowPageNum={nowAppliancePageNum}
                    resultNum={appliance.length}
                    onPagePlus={handleAppliancePlusPageNum}
                    onPageMinus={handleApplianceMinusPageNum}
                    renderSongResult={(key, index, result) => (
                      <RequestSongResult
                        key={key}
                        index={index}
                        result={result as ApplianceData}
                        handleSongClick={handleApplySong}
                      >
                        <SendIcn width={24} height={24} color={'white'} />
                      </RequestSongResult>
                    )}
                  ></SongTable>
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

                  <SearchBar>
                    <SearchBar.MainSec>
                      <SearchBar.MainSec.Select
                        searchWord={playlistSearchProps.searchWord}
                        handleSelectChange={handleSelectChange}
                      >
                        <SearchBar.MainSec.Option value='제목' />
                        <SearchBar.MainSec.Option value='가수' />
                      </SearchBar.MainSec.Select>
                      <SearchBar.MainSec.Input
                        inputValue={playlistSearchProps.searchWord.name}
                        handleClickBtn={handleClickBtn}
                        handleInputChange={handleInputChange}
                      />
                      <SearchBar.MainSec.Button
                        handleClickBtn={handleClickBtn}
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
                    <SongTable
                      viewdSongArr={playlistSearchProps.viewedDataArr}
                      nowPageNum={nowPlaylistPageNum}
                      resultNum={nowPlaylistSongArr.length}
                      onPagePlus={handlePlaylistPlusPageNum}
                      onPageMinus={handlePlaylistMinusPageNum}
                      renderSongResult={(key, index, result) => (
                        <PrimarySongResult
                          key={key}
                          index={index}
                          result={result as PlaylistSongData}
                          handleSongClick={(sid: string) => {}}
                        >
                          <SendIcn width={24} height={24} color={'white'} />
                        </PrimarySongResult>
                      )}
                    ></SongTable>
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
