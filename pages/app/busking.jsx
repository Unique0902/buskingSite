import React, { useState, useEffect } from 'react';
import HoverTextSection from '../../components/HoverTextSection';
import MainSec from '../../components/MainSec';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongTable from '../../components/SongTable';
import { getAppLayOut } from '../../layouts/appLayout';
import { useBuskingContext } from '../../context/BuskingContext';
import { useRouter } from 'next/router';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import PrimaryBtn from '../../components/Btn/PrimaryBtn';
import { color } from '../../styles/theme';
import SectionCopyText from '../../components/SectionCopyText';
import MusicBar from '../../components/MusicBar/MusicBar';
import QRCodeSection from '../../components/QRCodeSection';

export default function AppBusking({}) {
  const { playlists } = usePlaylistContext();
  const { userData } = useUserDataContext();
  const {
    buskingData,
    applyBuskingSongAgain,
    removeBuskingSong,
    removeBusking,
  } = useBuskingContext();
  const { uid } = useAuthContext();
  const [pageNum, setPageNum] = useState(1);
  const [beforeSong, setBeforeSong] = useState(null);
  const [nowSong, setNowSong] = useState(null);
  const [isSinging, setIsSinging] = useState(false);
  const [results, setResults] = useState(
    buskingData
      ? buskingData.appliance
        ? Object.values(buskingData.appliance)
        : []
      : []
  );
  const router = useRouter();

  useEffect(() => {
    if (!buskingData) {
      router.push('/app/makebusking');
    }
  }, [buskingData]);

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
    if ((pageNum - 1) * 6 + 1 > results.length) {
      if (results.length == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [results]);

  const handleClickEndBuskingBtn = () => {
    if (window.confirm('버스킹을 종료하시겠습니까?')) {
      removeBusking().finally(() => {
        router.push('/app/home');
      });
    }
  };
  const handleClickPreviousBtn = () => {
    if (isSinging) {
      if (beforeSong) {
        applyBuskingSongAgain(nowSong);
        setNowSong(beforeSong);
        setBeforeSong(null);
      }
    }
  };
  const handleClickPauseBtn = () => {
    setIsSinging(false);
  };
  const handleClickPlayBtn = () => {
    if (!nowSong && results.length != 0) {
      setIsSinging(true);
      setNowSong({ ...results[0] });
      removeBuskingSong(results[0].sid, () => {});
    } else if (nowSong) {
      setIsSinging(true);
    } else {
      alert('신청된 노래가 존재하지 않습니다!');
    }
  };
  const handleClickNextBtn = () => {
    if (isSinging) {
      if (results) {
        if (nowSong) {
          setBeforeSong(nowSong);
        }
        setNowSong({ ...results[0] });
        removeBuskingSong(results[0].sid, () => {});
      }
    }
  };
  return (
    <>
      <section className='flex flex-row items-center pt-2 pb-5 border-b border-gray-600 max-lg:flex-col'>
        <h1 className='font-sans text-3xl font-semibold text-white w-96 max-lg:w-full max-lg:text-center max-lg:mb-4'>
          {userData && `${userData.name}님의 버스킹`}
        </h1>
        <div className='flex flex-row items-center justify-center gap-4 border-gray-400 lg:border-l grow'>
          <QRCodeSection
            url={`https://noraebook.netlify.app/buskingApply/${uid}`}
            title={'곡 신청 사이트'}
          />
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

      <MusicBar
        nowSong={nowSong}
        handleClickNextBtn={handleClickNextBtn}
        handleClickPauseBtn={handleClickPauseBtn}
        handleClickPlayBtn={handleClickPlayBtn}
        handleClickPreviousBtn={handleClickPreviousBtn}
      />

      <MainSec>
        <section className='relative flex flex-row items-center justify-between mb-6'>
          <h1 className='font-sans text-xl font-semibold text-center text-zinc-500'>
            {buskingData &&
              playlists &&
              playlists[buskingData.playlistId] &&
              `현재 플레이리스트: ${playlists[buskingData.playlistId].name}`}
          </h1>
          <h2 className='font-sans text-xl font-semibold text-zinc-500'>
            총 노래 수 {results ? results.length : 0}
          </h2>
          <ArrangeMenuBtn
            results={results}
            setResults={setResults}
            isBusking={true}
          />
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
