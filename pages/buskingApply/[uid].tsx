import React, { useState, useEffect, useCallback } from 'react';
import { useIpContext } from '../../context/IpContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import PlaylistMenu from '../../components/PlaylistMenu/PlaylistMenu';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { ArrowDownIcn, SendIcn, SmileIcn } from '../../assets/icon/icon';
import RequestSongTable from '../../components/Table/RequestSongTable';
import PrimarySongTable from '../../components/Table/PrimarySongTable';
import useSearchBar from '../../hooks/UseSearchBar';
import { ApplianceData, BuskingData } from '../../store/type/busking';
import {
  PlaylistData,
  PlaylistDataObj,
  PlaylistSongData,
} from '../../store/type/playlist';

const App = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [buskingData, setBuskingData] = useState<BuskingData | null>(null);
  const [results, setResults] = useState<PlaylistSongData[]>([]);
  const [appliance, setAppliance] = useState<ApplianceData[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistDataObj | null>(null);
  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState<boolean>(false);
  const [ip, setIp] = useState<string>('');
  const router = useRouter();
  const userId = router.query.uid ? router.query.uid.toString() : null;
  const { getIp } = useIpContext();
  const { applyOldBuskingSong, applyNewBuskingSong, getBuskingData } =
    useBuskingContext();
  const { getPlaylists } = usePlaylistContext();
  const { getUserData } = useUserDataContext();

  const [searchWord, setSearchWord, search] = useSearchBar(
    nowPlaylist && nowPlaylist.songs,
    setResults
  );

  useEffect(() => {
    if (isUser) {
      getPlaylists(userId).then((data) => {
        if (!data) return;
        setPlaylists(data);
        const listArr = Object.values(data);
        if (listArr.length > 0) {
          setNowPlaylist(listArr[0]);
          // nowPlaylist.songs && setResults(Object.values(nowPlaylist.songs));
          // setState함수는 비동기적으로 동작하므로 위 코드에 nowPlaylist가 잘들어갔는지 보장할 수 없다!
          //따라서 아래처럼 코드를 바꾸었다.
          listArr[0].songs && setResults(Object.values(listArr[0].songs));
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

  const checkIsUser = useCallback(async () => {
    const data = await getUserData(userId);
    setIsUser(!!data);
  }, [userId]);
  // 왜 checkIsUser를 dependency에 넣어주어야하지?
  useEffect(() => {
    if (userId) {
      checkIsUser();
    }
  }, [userId]);

  const handleBuskingData = useCallback(async () => {
    const data = await getBuskingData(userId);
    setBuskingData(data);
  }, [userId]);

  // 왜 handleBuskingData를 dependency에 넣어주어야하지?

  // eslint 업그레이드 한다
  useEffect(() => {
    if (userId && !buskingData && isUser) {
      handleBuskingData();
    }
  }, [userId, isUser, buskingData]);

  const handleSearchBarChange = () => {
    search();
  };

  const handleSongClick1 = (sid) => {
    if (buskingData.appliance) {
      const applyArr = Object.values(buskingData.appliance);
      const song = applyArr.find((song) => song.sid == sid);
      if (song) {
        const userIp = song.applicants.find((ap) => ap.ip == ip);
        if (!userIp) {
          applyOldBuskingSong(
            userId,
            sid,
            ip,
            song.cnt,
            song.applicants
          ).finally(handleBuskingData);
        } else {
          window.alert('이미 투표하셨습니다!');
        }
      } else {
        if (appliance.length == buskingData.maxNum) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        const song = results.find((s) => s.id == sid);
        applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
          handleBuskingData
        );
      }
    } else {
      if (appliance.length == buskingData.maxNum) {
        alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
        return;
      }
      const song = results.find((s) => s.id == sid);
      applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
        handleBuskingData
      );
    }
  };

  const handleSongClick2 = (sid) => {
    if (buskingData.appliance) {
      const applyArr = Object.values(buskingData.appliance);
      const song = applyArr.find((song) => song.sid == sid);
      if (song) {
        const userIp = song.applicants.find((ap) => ap.ip == ip);
        if (!userIp) {
          applyOldBuskingSong(
            userId,
            sid,
            ip,
            song.cnt,
            song.applicants
          ).finally(handleBuskingData);
        } else {
          window.alert('이미 투표하셨습니다!');
        }
      } else {
        if (appliance.length == buskingData.maxNum) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
          handleBuskingData
        );
      }
    } else {
      if (appliance.length == buskingData.maxNum) {
        alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
        return;
      }
      const song = results.find((s) => s.id == sid);
      applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
        handleBuskingData
      );
    }
  };
  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
      if (playlists[id].songs) {
        setResults(Object.values(playlists[id].songs));
      } else {
        setResults([]);
      }
    }
  };

  return (
    <section className='flex w-full h-screen px-8 py-4 overflow-auto max-md:px-4 bg-gradient-to-b from-blue-500 to-mainBlue'>
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
                  <h3 className='text-xl font-normal text-gray-500'>
                    신청가능 곡 수 {results.length}
                  </h3>
                </div>
                <SongSearchBar
                  searchWord={searchWord}
                  setSearchWord={setSearchWord}
                  onSearch={handleSearchBarChange}
                >
                  <ArrangeMenuBtn
                    results={results}
                    setResults={setResults}
                    isBusking={false}
                  />
                </SongSearchBar>

                <PrimarySongTable
                  results={results}
                  handleClickResult={handleSongClick1}
                >
                  <SendIcn width={24} height={24} color={'white'} />
                </PrimarySongTable>
              </MainSec>

              <MainSec>
                <h2 className='text-3xl font-semibold max-lg:text-center'>
                  신청된 곡 리스트
                </h2>
                <section className='relative flex items-center justify-end mb-6 max-md:justify-center'>
                  <h3 className='text-xl font-normal text-gray-500'>
                    신청된 곡 수 {appliance.length}
                  </h3>
                </section>

                <RequestSongTable
                  results={appliance}
                  handleClickResult={handleSongClick2}
                >
                  <SendIcn width={24} height={24} color={'white'} />
                </RequestSongTable>
              </MainSec>
            </section>
          ) : (
            <section>
              <MainSec>
                <h2 className='text-xl font-semibold w-96 max-lg:w-full'>
                  해당 유저는 버스킹 진행중이 아닙니다.
                </h2>
                <div className='relative flex flex-row items-center justify-end mr-4 grow'>
                  {isShowPlaylistMenu && (
                    <PlaylistMenu
                      setIsShowPlaylistMenu={setIsShowPlaylistMenu}
                    />
                  )}
                  <button
                    className='text-xl text-white hover:scale-110'
                    onClick={() => {
                      setIsShowPlaylistMenu(true);
                    }}
                  >
                    {nowPlaylist ? nowPlaylist.name : 'No Playlist..'}
                    <ArrowDownIcn
                      width={16}
                      height={16}
                      color={'white'}
                      className='ml-2'
                    />
                  </button>
                </div>
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
                    <h3 className='text-xl font-normal text-gray-500'>
                      곡 수 {results.length}
                    </h3>
                  </div>
                  <SongSearchBar
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                    onSearch={handleSearchBarChange}
                  >
                    <ArrangeMenuBtn
                      results={results}
                      setResults={setResults}
                      isBusking={false}
                    />
                  </SongSearchBar>

                  <PrimarySongTable
                    results={results}
                    handleClickResult={(sid: string) => {}}
                  >
                    <SmileIcn width={24} height={24} color={'white'} />
                  </PrimarySongTable>
                </MainSec>
              )}
            </section>
          ))}
      </section>
    </section>
  );
};

export default App;
