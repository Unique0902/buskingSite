import React from 'react';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { usePlaylistContext } from '../context/PlaylistContext';
import PopupWrapper from './PopupWrapper';

const PlaylistMenu = ({ setIsShowPlaylistMenu }) => {
  const inputRef = useRef();
  const {
    playlists,
    nowPlaylist,
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    changeNowPlaylist,
  } = usePlaylistContext();
  const amendInputRef = useRef();
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowAmendInput, setIsShowAmendInput] = useState(false);
  const [isCanApply, setIsCanApply] = useState(false);
  const [isCanAmendApply, setIsCanAmendApply] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistAmendName, setPlaylistAmendName] = useState('');
  useEffect(() => {
    if (nowPlaylist) {
      setPlaylistAmendName(nowPlaylist.name);
    }
  }, [nowPlaylist]);
  const btnStyle =
    'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  useEffect(() => {
    if (isShowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowInput, inputRef.current]);
  useEffect(() => {
    if (isShowAmendInput && amendInputRef.current) {
      amendInputRef.current.focus();
    }
  }, [isShowAmendInput, amendInputRef.current]);
  useEffect(() => {
    if (playlistName && playlistName.length <= 20) {
      setIsCanApply(true);
    } else {
      setIsCanApply(false);
    }
  }, [playlistName]);
  useEffect(() => {
    if (playlistAmendName && playlistAmendName.length <= 20) {
      setIsCanAmendApply(true);
    } else {
      setIsCanAmendApply(false);
    }
  }, [playlistAmendName]);
  return (
    <PopupWrapper
      handleClickOther={() => {
        setIsShowPlaylistMenu(false);
      }}
      isLeft={true}
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col pt-2 pb-2'>
        {nowPlaylist ? (
          <button className=' text-left text-blue-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            {nowPlaylist && nowPlaylist.name}
          </button>
        ) : (
          <button className=' text-left text-gray-400 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            플레이리스트가 없음
          </button>
        )}

        {!isShowInput && (
          <button
            className={btnStyle}
            onClick={() => {
              setIsShowAmendInput(false);
              setIsShowInput(true);
            }}
          >
            플레이리스트 추가
          </button>
        )}

        {isShowInput && (
          <>
            <input
              type='text'
              placeholder='Playlist Name'
              className='px-4 py-3 border-1 border-solid border-gray-400 font-sans text-lg font-normal rounded-xl'
              value={playlistName}
              ref={inputRef}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
            <div className='flex flex-row'>
              <button
                className={`w-1/2 py-2 ${
                  isCanApply ? 'text-black' : 'text-gray-300'
                } hover:bg-gray-200 font-sans text-lg font-medium`}
                onClick={() => {
                  if (isCanApply) {
                    addPlaylist(playlistName);
                    setIsShowInput(false);
                    setIsShowPlaylistMenu(false);
                  }
                }}
              >
                추가
              </button>
              <button
                className='w-1/2 py-2 hover:bg-gray-200 font-sans text-lg font-medium'
                onClick={() => {
                  setIsShowInput(false);
                }}
              >
                취소
              </button>
            </div>
          </>
        )}
        {!isShowAmendInput && (
          <button
            className={btnStyle}
            onClick={() => {
              setIsShowInput(false);
              setIsShowAmendInput(true);
            }}
          >
            현재 플레이리스트 이름 수정
          </button>
        )}
        {isShowAmendInput && (
          <>
            <input
              type='text'
              placeholder='Playlist Name'
              className='px-4 py-3 border-1 border-solid border-gray-400 font-sans text-lg font-normal rounded-xl'
              value={playlistAmendName}
              ref={amendInputRef}
              onChange={(e) => {
                setPlaylistAmendName(e.target.value);
              }}
            />
            <div className='flex flex-row'>
              <button
                className={`w-1/2 py-2 ${
                  isCanAmendApply ? 'text-black' : 'text-gray-300'
                } hover:bg-gray-200 font-sans text-lg font-medium`}
                onClick={() => {
                  if (isCanAmendApply) {
                    updateNowPlaylistName(playlistAmendName);
                    setIsShowAmendInput(false);
                  }
                }}
              >
                수정
              </button>
              <button
                className='w-1/2 py-2 hover:bg-gray-200 font-sans text-lg font-medium'
                onClick={() => {
                  setIsShowAmendInput(false);
                }}
              >
                취소
              </button>
            </div>
          </>
        )}

        {playlists && (
          <button
            className={btnStyle}
            onClick={() => {
              removeNowPlaylist();
              setIsShowPlaylistMenu(false);
            }}
          >
            현재 플레이리스트 제거
          </button>
        )}
      </section>
      <section className='flex flex-col py-2'>
        <p className='text-gray-500 font-sans text-base px-4 py-2'>
          모든 플레이리스트
        </p>
        {playlists &&
          Object.values(playlists).map((playlist) => {
            return (
              <button
                className={btnStyle}
                data-id={playlist.id}
                key={playlist.id}
                onClick={(e) => {
                  changeNowPlaylist(e.currentTarget.dataset.id);
                  setIsShowPlaylistMenu(false);
                }}
              >
                {playlist.name && playlist.name}
              </button>
            );
          })}
      </section>
    </PopupWrapper>
  );
};

export default PlaylistMenu;
