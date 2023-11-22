import React, { useState, useEffect } from 'react';
import { FaForward, FaBackward, FaPause, FaPlay } from 'react-icons/fa';
import ArrangeMenu from '../../components/ArrangeMenu';
import HoverTextBtn from '../../components/HoverTextBtn';
import MainSec from '../../components/MainSec';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongTable from '../../components/SongTable';
import { getAppLayOut } from '../../layouts/appLayout';
import { useBuskingContext } from '../../context/BuskingContext';
import { useRouter } from 'next/router';

export default function AppBusking({}) {
  const { playlists } = usePlaylistContext();
  const { userData } = useUserDataContext();
  const {
    buskingData,
    applyBuskingSongAgain,
    removeBuskingSong,
    removeBusking,
  } = useBuskingContext();
  const [url, setUrl] = useState('');
  const { uid } = useAuthContext();
  const [appliance, setAppliance] = useState([]);
  const [results, setResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [beforeSong, setBeforeSong] = useState(null);
  const [nowSong, setNowSong] = useState(null);
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);
  const [isSinging, setIsSinging] = useState(false);
  const [isShowQr, setIsShowQr] = useState(true);
  const router = useRouter();
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  useEffect(() => {
    if (!buskingData) {
      router.push('/app/makebusking');
    } else {
      setAppliance(buskingData.appliance);
    }
  }, [buskingData]);
  useEffect(() => {
    if (uid) {
      setUrl(
        `https://stunning-semifreddo-f035d0.netlify.app/buskingApply/${uid}`
      );
    }
  }, [uid]);
  const handelPlus = () => {
    if (pageNum < results.length / 6) {
      setPageNum(pageNum + 1);
    }
  };
  const handelMinus = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };
  useEffect(() => {
    if (isLgMediaQuery) {
      setIsShowQr(false);
    }
  }, [isLgMediaQuery]);
  useEffect(() => {
    if (appliance) {
      setResults(Object.values(appliance));
    } else {
      setResults([]);
    }
  }, [appliance, appliance && Object.values(appliance).length]);
  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > results.length) {
      if (results.length == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [results]);
  const playBtnStyle = 'mx-3 text-4xl text-black hover:scale-110';
  return (
    <>
      <section className='border-gray-600 border-b items-center pt-2 pb-5 flex flex-row max-lg:flex-col'>
        <h1 className='font-sans text-white text-3xl font-semibold w-96 max-lg:w-full max-lg:text-center max-lg:mb-4'>
          {userData && `${userData.name}님의 버스킹`}
        </h1>
        <div className='flex flex-row items-center lg:border-l border-gray-400 grow justify-center'>
          {!isLgMediaQuery && (
            <h2 className='font-sans text-gray-300 text-xl font-bold'>
              곡 신청하기
            </h2>
          )}
          {isShowQr && !isLgMediaQuery && (
            <img
              className='ml-8 mr-4'
              src={`https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=${url}`}
            />
          )}
          {isShowQr && !isLgMediaQuery && (
            <button
              className='relative font-sans text-lg text-black hover:scale-110 bg-white rounded-lg px-4 py-2 mr-3'
              onClick={() => {
                setIsShowQr(false);
              }}
            >
              QR코드 숨기기
            </button>
          )}
          {!isShowQr && !isLgMediaQuery && (
            <button
              className='relative font-sans text-lg ml-6 hover:scale-110 text-black bg-white rounded-lg px-4 py-2 mr-3'
              onClick={() => {
                setIsShowQr(true);
              }}
            >
              QR코드 불러오기
            </button>
          )}
          <HoverTextBtn btnText={'신청 URL 확인'} text={`${url}`} />
        </div>
      </section>

      <section className='w-3/4 m-auto bg-gray-300 rounded-3xl text-center py-5 px-2 mt-6'>
        <div className='font-sans text-xl text-white font-medium py-2 px-2 w-3/4 m-auto rounded-xl bg-gray-500 mb-2'>
          {isSinging ? (
            <>
              <p>{nowSong && `${nowSong.title} - ${nowSong.artist}`}</p>
            </>
          ) : (
            <p>정지됨..</p>
          )}
        </div>
        <div className='text-center'>
          <button
            className={playBtnStyle}
            onClick={() => {
              if (isSinging) {
                if (beforeSong) {
                  applyBuskingSongAgain(nowSong, () => {});
                  setNowSong(beforeSong);
                  setBeforeSong(null);
                }
              }
            }}
          >
            <FaBackward className='' />
          </button>
          {isSinging ? (
            <button
              className={playBtnStyle}
              onClick={() => {
                setIsSinging(false);
              }}
            >
              <FaPause className='' />
            </button>
          ) : (
            <button
              className={playBtnStyle}
              onClick={() => {
                if (!nowSong && results) {
                  setIsSinging(true);
                  setNowSong({ ...results[0] });
                  removeBuskingSong(results[0].sid, () => {});
                } else if (nowSong) {
                  setIsSinging(true);
                } else {
                  alert('신청된 노래가 존재하지 않습니다!');
                }
              }}
            >
              <FaPlay className='' />
            </button>
          )}
          <button
            className={playBtnStyle}
            onClick={() => {
              if (isSinging) {
                if (results) {
                  if (nowSong) {
                    setBeforeSong(nowSong);
                  }
                  setNowSong({ ...results[0] });
                  removeBuskingSong(results[0].sid, () => {});
                }
              }
            }}
          >
            <FaForward className='' />
          </button>
        </div>
      </section>
      <MainSec>
        <section className='relative flex flex-row justify-between items-center mb-6'>
          <h1 className=' text-center font-sans text-zinc-500 font-semibold text-xl'>
            {buskingData &&
              playlists &&
              playlists[buskingData.playlistId] &&
              `현재 플레이리스트: ${playlists[buskingData.playlistId].name}`}
          </h1>
          <h2 className='font-sans font-semibold text-xl text-zinc-500'>
            총 노래 수 {results ? results.length : 0}
          </h2>
          <div className='relative'>
            <button
              className='ml-4 bg-gray-500 max-lg:ml-2 max-lg:px-2 py-2 px-3 text-lg rounded-lg text-white hover:scale-110'
              onClick={() => {
                setIsShowArrangeMenu(true);
              }}
            >
              정렬
            </button>
            {isShowArrangeMenu && (
              <ArrangeMenu
                setIsShowArrangeMenu={setIsShowArrangeMenu}
                results={results}
                setResults={setResults}
                isBusking={true}
              />
            )}
          </div>
        </section>
        <SongTable
          isSearch={false}
          results={results}
          pageNum={pageNum}
          btnText={'제거'}
          onSongClick={(sid) => {
            removeBuskingSong(sid, () => {});
          }}
          resultNum={results.length}
          onPagePlus={handelPlus}
          onPageMinus={handelMinus}
        />
        <section className='flex flex-row pt-4 justify-end'>
          <button
            className='ml-4 bg-red-600 py-2 px-3 text-lg rounded-lg text-white hover:scale-110'
            onClick={() => {
              if (window.confirm('버스킹을 종료하시겠습니까?')) {
                removeBusking().finally(() => {
                  router.push('/app/home');
                });
              }
            }}
          >
            버스킹 종료
          </button>
        </section>
      </MainSec>
    </>
  );
}
getAppLayOut(AppBusking);
