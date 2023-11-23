import React, { useEffect, useState } from 'react';
import {
  NextSongIcn,
  PauseIcn,
  PlayIcn,
  PreviousSongIcn,
} from '../../assets/icon/icon';
import { useBuskingContext } from '../../context/BuskingContext';

const MusicBar = ({ songArr, setSongArr, setSongArrToView }) => {
  const playBtnStyle = 'mx-3 text-4xl text-black hover:scale-110';
  const [beforeSongArr, setBeforeSongArr] = useState([]);
  const [nowSong, setNowSong] = useState();
  const { applyBuskingSongAgain, removeBuskingSong } = useBuskingContext();
  useEffect(() => {
    const copiedSongArr = [...songArr];
    if (nowSong) {
      copiedSongArr.shift();
    }
    setSongArrToView(copiedSongArr);
  }, [songArr, nowSong]);

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
      removeBuskingSong(songArr[0].sid);
    }
  };

  return (
    <section className='w-3/4 px-2 py-5 m-auto mt-6 text-center bg-gray-300 rounded-3xl'>
      <div className='w-3/4 px-2 py-2 m-auto mb-2 font-sans text-xl font-medium text-white bg-gray-500 rounded-xl'>
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
          <PreviousSongIcn width={36} height={36} color={'black'} />
        </button>
        {nowSong ? (
          <button className={playBtnStyle} onClick={handleClickPauseBtn}>
            <PauseIcn width={36} height={36} color={'black'} />
          </button>
        ) : (
          <button className={playBtnStyle} onClick={handleClickPlayBtn}>
            <PlayIcn width={36} height={36} color={'black'} />
          </button>
        )}
        <button className={playBtnStyle} onClick={handleClickNextBtn}>
          <NextSongIcn width={36} height={36} color={'black'} />
        </button>
      </div>
    </section>
  );
};

export default MusicBar;
