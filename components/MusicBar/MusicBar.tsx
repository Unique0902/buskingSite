import React, { useEffect, useState } from 'react';

import Icon from '../../assets/icon/icon';
import { useAuthContext } from '../../context/AuthContext';
import { useBusking } from '../../hooks/UseBusking';
import { ApplianceData } from '../../store/type/busking';

type Props = {
  songArr: ApplianceData[];
  setSongArrToView: React.Dispatch<React.SetStateAction<ApplianceData[]>>;
};

const MusicBar = ({ songArr, setSongArrToView }: Props) => {
  const playBtnStyle = 'mx-3 text-4xl hover:scale-110';
  const [beforeSongArr, setBeforeSongArr] = useState<ApplianceData[]>([]);
  const [nowSong, setNowSong] = useState<ApplianceData | null>(null);
  const { uid } = useAuthContext();
  const { applyBuskingSongAgain, removeBuskingSong } = useBusking(uid);
  useEffect(() => {
    const copiedSongArr = [...songArr];
    if (nowSong) {
      copiedSongArr.shift();
    }
    setSongArrToView(copiedSongArr);
  }, [songArr, nowSong, setSongArrToView]);

  // 노래 관련 로직 상당히 복잡함
  /*
    buskingData가 바뀔때마다 songArr가 계속 새로 받아와지기 때문에 데이터 변화타이밍 예측이 힘듬
    nowSong은 songArr[0]에 해당하는데 보여주는 리스트에서는 nowSong을 제외하고 보여주고싶기때문에
    songArrToView라는 새로운 state를 만들어 이 arr를 리스트에 보여주게 될것

    이렇게 하게된 이유중 하나는 play 버튼을 눌러 nowSong을 등록할때 바로 nowSong을 서버데이터에서 제거
    해버리면 노래 재생중 다른 페이지로 이동했을때 nowSong이 삭제되기도 하고 (로컬에만 nowSong데이터가 있으니)
    또한 pause를 누른 이후 페이지 이동에서도 nowSong이 삭제되기 때문에 (pause 했을때 nowSong을 다시 서버에 재 저장
      하는것은 조금 비효율적이라 생각 아닌가? 물론 첫번째 이유가 커서 이런것)
      이렇게 arr를 두개 만들게 됨 이로인해 아래 로직이 조금 복잡하게 되었다
      
      물론 previousBtn 로직같은 경우는 꽤 괜찮은듯

      위 useEffect에서는 songArr의 변화와 nowSong의 변화를 추적하여 nowSong의 유무에 따라 songArrToView에 
      songArr를 다르게 저장함 

      핵심은 nowSong이 없을땐 songArr = songArrToView but 있을땐 songArrToView는 songArr의 첫번째 요소만 빠진 것
  */
  const handleClickPreviousBtn = () => {
    if (beforeSongArr.length != 0) {
      applyBuskingSongAgain(beforeSongArr[0]);
      setNowSong(beforeSongArr[0]);
      setBeforeSongArr((arr) => {
        const arrCopy = [...arr];
        arrCopy.shift();
        return arrCopy;
      });
    } else {
      alert('저장된 이전 노래가 없습니다!');
    }
  };

  const handleClickPauseBtn = () => {
    setNowSong(null);
  };

  const handleClickPlayBtn = () => {
    if (songArr.length != 0) {
      setNowSong({ ...songArr[0] });
    } else {
      alert('신청된 노래가 존재하지 않습니다!');
    }
  };

  const handleClickNextBtn = () => {
    if (nowSong && songArr.length >= 2) {
      setBeforeSongArr((arr) => [nowSong, ...arr]);
      setNowSong({ ...songArr[1] });
      removeBuskingSong(songArr[0].sid, uid);
    }
  };

  return (
    <section className='w-3/4 px-2 py-5 m-auto mt-6 text-center bg-gray-300 rounded-3xl'>
      <div className='w-3/4 px-2 py-2 m-auto mb-2 text-xl font-medium text-white bg-gray-500 rounded-xl'>
        {nowSong ? (
          <>
            <p>{`${nowSong.title} - ${nowSong.artist}`}</p>
          </>
        ) : (
          <p>정지됨..</p>
        )}
      </div>
      <div className='text-center'>
        <button className={playBtnStyle} onClick={handleClickPreviousBtn}>
          <Icon size={36} color='black' icon='PreviousSong' />
        </button>
        {nowSong ? (
          <button className={playBtnStyle} onClick={handleClickPauseBtn}>
            <Icon size={36} color='black' icon='Pause' />
          </button>
        ) : (
          <button className={playBtnStyle} onClick={handleClickPlayBtn}>
            <Icon size={36} color='black' icon='Play' />
          </button>
        )}
        <button className={playBtnStyle} onClick={handleClickNextBtn}>
          <Icon size={36} color='black' icon='NextSong' />
        </button>
      </div>
    </section>
  );
};

export default MusicBar;
