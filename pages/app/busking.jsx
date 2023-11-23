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
  const { buskingData, removeBuskingSong, removeBusking } = useBuskingContext();
  const { uid } = useAuthContext();
  const [pageNum, setPageNum] = useState(1);
  const [songArr, setSongArr] = useState([]);
  const [songArrToView, setSongArrToView] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!buskingData) {
      router.push('/app/makebusking');
      return;
    }
    const appliance = buskingData.appliance;
    setSongArr(
      appliance ? Object.values(appliance).sort((a, b) => a.id - b.id) : []
    );
  }, [buskingData]);

  /*
  버스킹 데이터에서 노래 저장시 서버에서 sid 순서대로 저장되다보니 시간순서대로 저장되지않음
  그래도 각 신청곡 데이터 id에 time 데이터를 저장했기때문에 위 sort 함수와 같이 buskingData를
  받아올때마다 id 시간을 기준으로 정렬하여 보여줌
*/
  const handelPlus = () => {
    if (pageNum < songArr.length / 6) {
      setPageNum(pageNum + 1);
    }
  };
  const handelMinus = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };

  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > songArr.length) {
      if (songArr.length == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [songArr]);

  const handleClickEndBuskingBtn = () => {
    if (window.confirm('버스킹을 종료하시겠습니까?')) {
      removeBusking().finally(() => {
        router.push('/app/home');
      });
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

      <MusicBar songArr={songArr} setSongArrToView={setSongArrToView} />

      <MainSec>
        <section className='relative flex flex-row items-center justify-between mb-6'>
          <h1 className='font-sans text-xl font-semibold text-center text-zinc-500'>
            {buskingData &&
              playlists &&
              playlists[buskingData.playlistId] &&
              `현재 플레이리스트: ${playlists[buskingData.playlistId].name}`}
          </h1>
          <h2 className='font-sans text-xl font-semibold text-zinc-500'>
            총 노래 수 {songArrToView ? songArrToView.length : 0}
          </h2>
          <ArrangeMenuBtn
            results={songArrToView}
            setResults={setSongArrToView}
            isBusking={true}
          />
        </section>
        <SongTable
          isSearch={false}
          results={songArrToView}
          pageNum={pageNum}
          btnText={'제거'}
          onSongClick={(sid) => {
            removeBuskingSong(sid, () => {});
          }}
          resultNum={songArrToView.length}
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
