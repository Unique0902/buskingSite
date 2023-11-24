import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongTable from '../../components/SongTable';
import { getAppLayOut } from '../../layouts/appLayout';
import NoPlaylistSection from '../../components/NoPlaylistSection';
import ResultsTable from '../../components/Table/ResultsTable';

export default function AppPlaylist() {
  const [results, setResults] = useState([]);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const { nowPlaylist, removeSongInPlaylist } = usePlaylistContext();
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setResults(Object.values(nowPlaylist.songs))
        : setResults([]);
    } else {
      setResults([]);
    }
  }, [nowPlaylist]);

  const search = () => {
    if (nowPlaylist && nowPlaylist.songs) {
      if (searchWord.name) {
        if (searchWord.category === '제목') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.title.toLowerCase().includes(searchWord.name)
            )
          );
        } else if (searchWord.category === '가수') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.artist.toLowerCase().includes(searchWord.name)
            )
          );
        }
      } else {
        setResults(Object.values(nowPlaylist.songs));
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
              results={results}
              setResults={setResults}
              isBusking={false}
            />
          </SongSearchBar>
          <h2 className='mb-2 font-sans text-xl font-semibold text-zinc-500'>
            총 노래 수 {results && results.length}
          </h2>
          <ResultsTable
            isSearch={false}
            results={results}
            btnText={'제거'}
            handleClickResult={removeSongInPlaylist}
          />
        </MainSec>
      )}
    </>
  );
}
getAppLayOut(AppPlaylist);
