import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import NoPlaylistSection from '../../components/NoPlaylistSection';
import ResultsTable from '../../components/Table/ResultsTable';

export default function AppPlaylist() {
  const [songArr, setSongArr] = useState([]);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
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

  const search = () => {
    if (nowPlaylist && nowPlaylist.songs) {
      if (searchWord.name) {
        if (searchWord.category === '제목') {
          setSongArr(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.title.toLowerCase().includes(searchWord.name)
            )
          );
        } else if (searchWord.category === '가수') {
          setSongArr(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.artist.toLowerCase().includes(searchWord.name)
            )
          );
        }
      } else {
        setSongArr(Object.values(nowPlaylist.songs));
      }
    }
  };

  const handelChange = () => {
    search();
  };
  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      {!nowPlaylist ? (
        <NoPlaylistSection />
      ) : (
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSearchBarChange={handelChange}
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
          <ResultsTable
            isSearch={false}
            results={songArr}
            btnText={'제거'}
            handleClickResult={removeSongInPlaylist}
          />
        </MainSec>
      )}
    </>
  );
}
getAppLayOut(AppPlaylist);
