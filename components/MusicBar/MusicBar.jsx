import React from 'react';
import {
  NextSongIcn,
  PauseIcn,
  PlayIcn,
  PreviousSongIcn,
} from '../../assets/icon/icon';

const MusicBar = ({
  handleClickPreviousBtn,
  handleClickPauseBtn,
  handleClickPlayBtn,
  handleClickNextBtn,
  nowSong,
}) => {
  const playBtnStyle = 'mx-3 text-4xl text-black hover:scale-110';

  return (
    <section className='w-3/4 m-auto bg-gray-300 rounded-3xl text-center py-5 px-2 mt-6'>
      <div className='font-sans text-xl text-white font-medium py-2 px-2 w-3/4 m-auto rounded-xl bg-gray-500 mb-2'>
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
