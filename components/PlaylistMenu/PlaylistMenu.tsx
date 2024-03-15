import React from 'react';

import { PlaylistData, PlaylistDataObj } from '../../store/type/playlist';
import PopUpMenuInnerBtn from '../PopUp/PopUpMenuInnerBtn';
import PopUpMenuInnerFormBtn from '../PopUp/PopUpMenuInnerFormBtn';

type Props = {
  playlists: PlaylistDataObj | null | undefined;
  nowPlaylist: PlaylistData | null;
  playlistHandler: {
    removeNowPlaylist: () => void;
    addPlaylist: (name: string) => void;
    updateNowPlaylistName: (name: string) => void;
    changeNowPlaylist: (id: string) => void;
  };
};

const PlaylistMenu = ({ playlists, nowPlaylist, playlistHandler }: Props) => {
  const {
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    changeNowPlaylist,
  } = playlistHandler;

  const handleClickNewPlaylistInputAddBtn = (inputValue: string) => {
    addPlaylist(inputValue);
  };

  const handleClickEditPlaylistInputAddBtn = (inputValue: string) => {
    updateNowPlaylistName(inputValue);
  };

  const handleClickRemoveNowPlaylistBtn = () => {
    removeNowPlaylist();
  };

  return (
    <>
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
        {nowPlaylist ? (
          <div className='px-4 py-1 text-xl text-left text-blue-600 '>
            {nowPlaylist && nowPlaylist.name}
          </div>
        ) : (
          <div className='px-4 py-1 text-xl text-left text-gray-400 dark:text-gray-300'>
            플레이리스트가 없음
          </div>
        )}
        <PopUpMenuInnerFormBtn
          inputValue={''}
          handleSubmit={handleClickNewPlaylistInputAddBtn}
        >
          플레이리스트 추가
        </PopUpMenuInnerFormBtn>
        <PopUpMenuInnerFormBtn
          inputValue={nowPlaylist?.name ?? ''}
          handleSubmit={handleClickEditPlaylistInputAddBtn}
        >
          현재 플레이리스트 이름 수정
        </PopUpMenuInnerFormBtn>

        {nowPlaylist && (
          <PopUpMenuInnerBtn handleClick={handleClickRemoveNowPlaylistBtn}>
            현재 플레이리스트 제거
          </PopUpMenuInnerBtn>
        )}
      </section>
      <section className='flex flex-col py-2'>
        <p className='px-4 py-2 text-base text-gray-500 dark:text-gray-300'>
          모든 플레이리스트
        </p>
        {playlists &&
          Object.values(playlists).map((playlist: PlaylistData) => {
            return (
              <PopUpMenuInnerBtn
                key={playlist.id}
                handleClick={() => {
                  changeNowPlaylist(playlist.id);
                }}
              >
                {playlist.name}
              </PopUpMenuInnerBtn>
            );
          })}
      </section>
    </>
  );
};

export default PlaylistMenu;
