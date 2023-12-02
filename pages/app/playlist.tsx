import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import PrimarySongTable from '../../components/Table/PrimarySongTable';
import { MinusIcn } from '../../assets/icon/icon';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import useSearchBar from '../../hooks/UseSearchBar';
import { PlaylistSongData } from '../../store/type/playlist';

export default function AppPlaylist() {
  const [songArr, setSongArr] = useState<PlaylistSongData[]>([]);
  const { nowPlaylist, removeSongInPlaylist } = usePlaylistContext();
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setSongArr(Object.values(nowPlaylist.songs))
        : setSongArr([]);
    } else {
      setSongArr([]);
    }
  }, [nowPlaylist]);

  const [searchWord, setSearchWord, search] = useSearchBar(
    nowPlaylist && nowPlaylist.songs,
    setSongArr
  );

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSearch={search}
          >
            <ArrangeMenuBtn
              results={songArr}
              setResults={setSongArr}
              isBusking={false}
            />
          </SongSearchBar>
          <h2 className='mb-2 font-sans text-xl font-semibold text-zinc-500'>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <PrimarySongTable
            results={songArr}
            handleClickResult={removeSongInPlaylist}
          >
            <MinusIcn width={24} height={24} color={'red'} />
          </PrimarySongTable>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppPlaylist);
