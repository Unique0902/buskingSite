import React, { useState, useEffect } from 'react';
import { useIpContext } from '../../context/IpContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import PlaylistMenu from '../../components/PlaylistMenu';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import SongTable from '../../components/SongTable';
import { ArrowDownIcn } from '../../assets/icon/icon';

const App = () => {
  const [isUser, setIsUser] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  const [results, setResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageNum2, setPageNum2] = useState(1);
  const [appliance, setAppliance] = useState([]);
  const [playlists, setPlaylists] = useState(null);
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const [ip, setIp] = useState('');
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const router = useRouter();
  const userId = router.query.uid;
  const { getIp } = useIpContext();
  const { applyOldBuskingSong, applyNewBuskingSong, getBuskingData } =
    useBuskingContext();
  const { getPlaylists } = usePlaylistContext();
  const { getUserData } = useUserDataContext();
  const search = () => {
    if (nowPlaylist && nowPlaylist.songs) {
      if (searchWord.name) {
        if (searchWord.category === '제목') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.title.toLowerCase().includes(searchWord.name)
            )
          );
        } else if (searchWord.category === '가수') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.artist.toLowerCase().includes(searchWord.name)
            )
          );
        }
      } else {
        setResults(Object.values(nowPlaylist.songs));
      }
    }
  };
  const handlePlus1 = () => {
    if (pageNum < results.length / 6) {
      setPageNum(pageNum + 1);
    }
  };
  const handleMinus1 = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };
  const handlePlus2 = () => {
    if (pageNum2 < appliance.length / 6) {
      setPageNum2(pageNum2 + 1);
    }
  };
  const handleMinus2 = () => {
    if (pageNum2 !== 1) {
      setPageNum2(pageNum2 - 1);
    }
  };
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
  }, [isUser]);

  useEffect(() => {
    getIp().then((ip1) => setIp(ip1));
  }, []);
  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > results.length) {
      if (results.length == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [results]);
  useEffect(() => {
    if ((pageNum2 - 1) * 6 + 1 > appliance.length) {
      if (appliance.length == 0) {
        return;
      }
      setPageNum2(pageNum2 - 1);
    }
  }, [appliance]);

  useEffect(() => {
    if (buskingData && buskingData.appliance) {
      setAppliance(
        Object.values(buskingData.appliance).sort((a, b) => a.id - b.id)
      );
    } else {
      setAppliance([]);
    }
  }, [buskingData]);

  const checkIsUser = async () => {
    const data = await getUserData(userId);
    console.log(data);
    setIsUser(!!data);
  };

  useEffect(() => {
    if (userId) {
      checkIsUser();
    }
  }, [userId]);

  const handleBuskingData = async () => {
    const data = await getBuskingData(userId);
    setBuskingData(data);
  };

  useEffect(() => {
    if (userId && !buskingData && isUser) {
      handleBuskingData();
    }
  }, [userId, isUser]);

  const handleSearchBarChange = () => {
    setPageNum(1);
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
        if (appliance.length == parseInt(buskingData.maxNum)) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        const song = results.find((s) => s.id == sid);
        applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
          handleBuskingData
        );
      }
    } else {
      if (appliance.length == parseInt(buskingData.maxNum)) {
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
        if (appliance.length == parseInt(buskingData.maxNum)) {
          alert('신청 최대수에 도달했습니다! 한 곡이 끝난후 신청해보세요!');
          return;
        }
        applyNewBuskingSong(userId, song.title, song.artist, sid, ip).finally(
          handleBuskingData
        );
      }
    } else {
      if (appliance.length == parseInt(buskingData.maxNum)) {
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
    <section className='flex w-full h-screen px-8 py-4 overflow-auto text-black max-md:px-4 bg-gradient-to-b from-blue-500 to-mainBlue'>
      <section className='w-full'>
        {!isUser && (
          <MainSec>
            <h1 className='font-sans text-xl font-semibold text-black'>
              해당하는 유저가 존재하지않습니다.
            </h1>
          </MainSec>
        )}
        {isUser &&
          (buskingData ? (
            <section className='text-black'>
              <section className='flex flex-row items-center pt-3 pb-8 border-b border-gray-600 max-lg:flex-col max-lg:text-center'>
                <h1 className='font-sans text-3xl font-semibold text-white w-96 max-lg:w-full max-lg:mb-3'>
                  {buskingData && buskingData.name}
                </h1>
                <div className='flex flex-row items-center justify-end mr-4 grow max-lg:flex-col'>
                  <h2 className='ml-8 font-sans text-2xl font-semibold text-white'>
                    {!!nowPlaylist &&
                      `선택된 플레이리스트: ${nowPlaylist.name}`}
                  </h2>
                </div>
              </section>

              <MainSec>
                <h2 className='font-sans text-3xl font-semibold text-black max-md:text-center'>
                  신청가능 곡 리스트
                </h2>
                <div className='flex flex-row justify-end mb-3 max-lg:justify-center'>
                  <h3 className='font-sans text-xl font-normal text-gray-500'>
                    신청가능 곡 수 {results.length}
                  </h3>
                </div>
                <SongSearchBar
                  searchWord={searchWord}
                  setSearchWord={setSearchWord}
                  onSearchBarChange={handleSearchBarChange}
                >
                  <ArrangeMenuBtn
                    results={results}
                    setResults={setResults}
                    isBusking={false}
                  />
                </SongSearchBar>
                <SongTable
                  isSearch={false}
                  results={results}
                  pageNum={pageNum}
                  btnText={'신청'}
                  onSongClick={handleSongClick1}
                  resultNum={results.length}
                  onPagePlus={handlePlus1}
                  onPageMinus={handleMinus1}
                />
              </MainSec>

              <MainSec>
                <h2 className='font-sans text-3xl font-semibold text-black max-lg:text-center'>
                  신청된 곡 리스트
                </h2>
                <section className='relative flex items-center justify-end mb-6 max-md:justify-center'>
                  <h3 className='font-sans text-xl font-normal text-gray-500'>
                    신청된 곡 수 {appliance.length}
                  </h3>
                  <ArrangeMenuBtn
                    results={appliance}
                    setResults={setAppliance}
                    isBusking={true}
                  />
                </section>
                <SongTable
                  isSearch={false}
                  results={appliance}
                  pageNum={pageNum}
                  btnText={'신청'}
                  onSongClick={handleSongClick2}
                  resultNum={results.length}
                  onPagePlus={handlePlus2}
                  onPageMinus={handleMinus2}
                />
              </MainSec>
            </section>
          ) : (
            <section>
              <MainSec>
                <h2 className='font-sans text-xl font-semibold text-black w-96 max-lg:w-full'>
                  해당 유저는 버스킹 진행중이 아닙니다.
                </h2>
                <div className='relative flex flex-row items-center justify-end mr-4 grow'>
                  {isShowPlaylistMenu && (
                    <PlaylistMenu
                      setIsShowPlaylistMenu={setIsShowPlaylistMenu}
                      playlists={playlists}
                      changeNowPlaylist={changeNowPlaylist}
                      nowPlaylist={nowPlaylist}
                    />
                  )}
                  <button
                    className='font-sans text-xl text-white hover:scale-110'
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
                  <h2 className='font-sans text-3xl font-semibold text-black'>
                    해당 유저의 플레이 리스트가 존재하지 않습니다.
                  </h2>
                </section>
              )}

              {nowPlaylist && (
                <MainSec>
                  <h2 className='font-sans text-3xl font-semibold text-black max-lg:text-center'>
                    {nowPlaylist && nowPlaylist.name}
                  </h2>
                  <div className='flex flex-row justify-end mb-3'>
                    <h3 className='font-sans text-xl font-normal text-gray-500'>
                      곡 수 {results.length}
                    </h3>
                  </div>
                  <SongSearchBar
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                    onSearchBarChange={handleSearchBarChange}
                  >
                    <ArrangeMenuBtn
                      results={results}
                      setResults={setResults}
                      isBusking={false}
                    />
                  </SongSearchBar>
                  <SongTable
                    isSearch={false}
                    results={results}
                    pageNum={pageNum}
                    btnText={'신청가능'}
                    resultNum={results.length}
                    onPagePlus={handlePlus1}
                    onPageMinus={handleMinus1}
                  />
                </MainSec>
              )}
            </section>
          ))}
      </section>
    </section>
  );
};

export default App;
