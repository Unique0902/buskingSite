import React, { useState, useEffect } from 'react';

import PlaylistBtn from './PlaylistBtn';
import PlaylistMenuBtn from './PlaylistMenuBtn';
import PlaylistMenuInputBtn from './PlaylistMenuInputBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { PlaylistData } from '../../store/type/playlist';
import PopupWrapper from '../PopUp/PopupWrapper';
type Props = {
  setIsShowPlaylistMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const PlaylistMenu = ({ setIsShowPlaylistMenu }: Props) => {
  const {
    playlists,
    nowPlaylist,
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    changeNowPlaylist,
  } = usePlaylistContext();
  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlistEditedName, setPlaylistEditedName] = useState<string>('');
  useEffect(() => {
    if (nowPlaylist) {
      setPlaylistEditedName(nowPlaylist.name);
    }
  }, [nowPlaylist]);

  const handleChangeNewPlaylistInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlaylistName(e.target.value);
  };
  const handleClickNewPlaylistInputAddBtn = () => {
    addPlaylist(playlistName);
    setIsShowPlaylistMenu(false);
  };

  const handleChangeEditPlaylistInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlaylistEditedName(e.target.value);
  };
  const handleClickEditPlaylistInputAddBtn = () => {
    updateNowPlaylistName(playlistEditedName);
    setIsShowPlaylistMenu(false);
  };

  const handleClickRemoveNowPlaylistBtn = () => {
    removeNowPlaylist();
    setIsShowPlaylistMenu(false);
  };

  return (
    <PopupWrapper
      handleClickOther={() => {
        setIsShowPlaylistMenu(false);
      }}
      isLeft={true}
    >
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
        {nowPlaylist ? (
          <button className='px-4 py-1 text-xl text-left text-blue-600 hover:bg-gray-200'>
            {nowPlaylist && nowPlaylist.name}
          </button>
        ) : (
          <button className='px-4 py-1 text-xl text-left text-gray-400 hover:bg-gray-200 dark:text-gray-300'>
            플레이리스트가 없음
          </button>
        )}
        <PlaylistMenuInputBtn
          playlistName={playlistName}
          handleInputChange={handleChangeNewPlaylistInput}
          handleClickOkBtn={handleClickNewPlaylistInputAddBtn}
        >
          플레이리스트 추가
        </PlaylistMenuInputBtn>
        <PlaylistMenuInputBtn
          playlistName={playlistEditedName}
          handleInputChange={handleChangeEditPlaylistInput}
          handleClickOkBtn={handleClickEditPlaylistInputAddBtn}
        >
          현재 플레이리스트 이름 수정
        </PlaylistMenuInputBtn>

        {playlists && (
          <PlaylistMenuBtn handleClick={handleClickRemoveNowPlaylistBtn}>
            현재 플레이리스트 제거
          </PlaylistMenuBtn>
        )}
      </section>
      <section className='flex flex-col py-2'>
        <p className='px-4 py-2 text-base text-gray-500 dark:text-gray-300'>
          모든 플레이리스트
        </p>
        {playlists &&
          Object.values(playlists).map((playlist: PlaylistData) => {
            return (
              <PlaylistBtn
                key={playlist.id}
                playlist={playlist}
                changeNowPlaylist={changeNowPlaylist}
                setIsShowPlaylistMenu={setIsShowPlaylistMenu}
              />
            );
          })}
      </section>
    </PopupWrapper>
  );
};

export default PlaylistMenu;
