import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useIpContext } from '../../context/IpContext';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { useUserDataContext } from '../../context/UserDataContext';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/SongSearchBar';
import PlaylistMenu from '../../components/PlaylistMenu';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import SongTable from '../../components/SongTable';

const App = () => {
  const [isUser, setIsUser] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  // const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageNum2, setPageNum2] = useState(1);
  const [appliance, setAppliance] = useState([]);
  const [playlists, setPlaylists] = useState(null);
  const [playlistsArr, setPlaylistsArr] = useState([]);
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const [ip, setIp] = useState('');
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const router = useRouter();
  const userId = router.query.uid;
  const { getIp } = useIpContext();
  const { applyOldBuskingSong, applyNewBuskingSong, getBuskingData } =
    useBuskingContext();
  const { getPlaylist } = usePlaylistContext();
  const { getUserData } = useUserDataContext();
  const valueRef = useRef();
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
      getPlaylist(userId).then((data) => {
        setPlaylists(data);
        const listArr = Object.values(data);
        setPlaylistsArr(listArr);
        if (listArr.length > 0) {
          setNowPlaylist(listArr[0]);
        }
      });
    }
  }, [isUser]);

  useEffect(() => {
    if (isUser) {
      if (nowPlaylist) {
        nowPlaylist.songs && setResults(Object.values(nowPlaylist.songs));
      }
    }
  }, [isUser, nowPlaylist]);
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
      setAppliance(Object.values(buskingData.appliance));
    } else {
      setAppliance([]);
    }
  }, [
    buskingData,
    buskingData &&
      buskingData.appliance &&
      Object.values(buskingData.appliance).length,
  ]);

  useEffect(() => {
    if (userId) {
      getUserData(userId).then((data) => {
        if (data) {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      });
    }
  }, [userId]);

  const handleBuskingData = async () => {
    const data = await getBuskingData(userId);
    setBuskingData(data);
  };

  useEffect(() => {
    if (userId && !buskingData) {
      handleBuskingData();
    }
  }, [userId]);

  const handleSearchBarChange = () => {
    setPageNum(1);
    search();
  };
  useEffect(() => {
    if (buskingData) {
      getPlaylist(userId).then((data) => {
        setPlaylistData(data[buskingData.playlistId]);
      });
    }
  }, [buskingData]);
  useEffect(() => {
    if (playlistData) {
      playlistData.songs && setResults(Object.values(playlistData.songs));
    } else {
    }
  }, [playlistData]);

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
    <section className='flex py-4 px-8 max-md:px-4  h-screen w-full text-black bg-gradient-to-b from-blue-500 to-mainBlue overflow-auto'>
      <section className='w-full'>
        {isUser ? (
          !!buskingData ? (
            <section className='text-black'>
              <section className='border-gray-600 border-b items-center pt-3 pb-8 flex flex-row max-lg:flex-col max-lg:text-center'>
                <h1 className='font-sans text-white text-3xl font-semibold w-96 max-lg:w-full max-lg:mb-3'>
                  {buskingData && buskingData.name}
                </h1>
                <div className='flex flex-row items-center justify-end mr-4 grow max-lg:flex-col'>
                  {/* <h2 className='font-sans text-white text-2xl font-semibold max-lg:mb-2'>
                    {!!name && `이름: ${name}`}
                  </h2> */}
                  <h2 className='font-sans text-white text-2xl font-semibold ml-8'>
                    {!!playlistData &&
                      `선택된 플레이리스트: ${playlistData.name}`}
                  </h2>
                </div>
              </section>

              <MainSec>
                <h2 className='font-sans text-black font-semibold text-3xl max-md:text-center'>
                  신청가능 곡 리스트
                </h2>
                <div className='flex flex-row justify-end max-lg:justify-center mb-3'>
                  <h3 className='font-sans font-normal  text-xl text-gray-500'>
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
                <h2 className='font-sans max-lg:text-center text-black font-semibold text-3xl'>
                  신청된 곡 리스트
                </h2>
                <section className='relative flex justify-end items-center mb-6 max-md:justify-center'>
                  <h3 className='font-sans font-normal text-xl text-gray-500'>
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
                <h2 className='font-sans text-black text-xl font-semibold w-96 max-lg:w-full'>
                  해당 유저는 버스킹 진행중이 아닙니다.
                </h2>
                <div className='flex relative flex-row items-center justify-end mr-4 grow'>
                  {isShowPlaylistMenu && (
                    <PlaylistMenu
                      setIsShowPlaylistMenu={setIsShowPlaylistMenu}
                      playlists={playlists}
                      changeNowPlaylist={changeNowPlaylist}
                      nowPlaylist={nowPlaylist}
                    />
                  )}
                  <button
                    ref={valueRef}
                    className='text-white font-sans text-xl hover:scale-110'
                    onClick={() => {
                      setIsShowPlaylistMenu(true);
                    }}
                  >
                    {nowPlaylist ? nowPlaylist.name : 'No Playlist..'}
                    <FaCaretDown className='ml-2' />
                  </button>
                </div>
              </MainSec>

              {!nowPlaylist && (
                <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
                  <h2 className='text-black font-sans font-semibold text-3xl'>
                    해당 유저의 플레이 리스트가 존재하지 않습니다.
                  </h2>
                </section>
              )}

              {nowPlaylist && (
                <MainSec>
                  <h2 className='font-sans text-black font-semibold text-3xl max-lg:text-center'>
                    {nowPlaylist && nowPlaylist.name}
                  </h2>
                  <div className='flex flex-row justify-end mb-3'>
                    <h3 className='font-sans font-normal text-xl text-gray-500'>
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
          )
        ) : (
          <MainSec>
            <h1 className='text-black font-sans text-xl font-semibold'>
              해당하는 유저가 존재하지않습니다.
            </h1>
          </MainSec>
        )}
      </section>
    </section>
  );
};

export default App;
