import React, { useState } from 'react';
import PageNumScreen from '../../components/PageNumScreen';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import SearchResults from '../../components/SearchResults';
import SongTableTitles from '../../components/SongTableTitles';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/SongSearchBar';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongTable from '../../components/SongTable';
import { getAppLayOut } from '../../layouts/appLayout';

export default function AppPlaylist() {
  const [results, setResults] = useState(null);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const { nowPlaylist, addBasicPlaylist, removeSongInPlaylist } =
    usePlaylistContext();
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setResults(Object.values(nowPlaylist.songs))
        : setResults([]);
    } else {
      setResults([]);
    }
  }, [nowPlaylist]);
  useEffect(() => {
    results && setResultNum(results.length);
  }, [results]);

  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > resultNum) {
      if (resultNum == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [resultNum]);

  const search = () => {
    if (nowPlaylist && nowPlaylist.songs) {
      if (searchWord.name) {
        if (searchWord.category === '제목') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.title.toLowerCase().includes(searchWord.name)
            )
          );
          setResultNum(results.length);
        } else if (searchWord.category === '가수') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.artist.toLowerCase().includes(searchWord.name)
            )
          );
          setResultNum(results.length);
        }
      } else {
        setResults(Object.values(nowPlaylist.songs));
      }
    }
  };
  const handelPlus = () => {
    if (pageNum < resultNum / 6) {
      setPageNum(pageNum + 1);
    }
  };
  const handelMinus = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };
  const handelChange = () => {
    setPageNum(1);
    search();
  };
  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      {!nowPlaylist ? (
        <MainSec>
          <h3 className='font-sans font-semibold text-xl text-black'>
            플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
          </h3>
          <button
            onClick={() => {
              addBasicPlaylist();
            }}
            className='mt-4 font-sans text-2xl font-normal border border-black rounded-xl px-5 py-3 hover:bg-gray-200'
          >
            추가하기
          </button>
        </MainSec>
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
          <h2 className='font-sans font-semibold mb-2 text-xl text-zinc-500'>
            총 노래 수 {results && results.length}
          </h2>
          <SongTable
            isSearch={false}
            results={results}
            pageNum={pageNum}
            btnText={'제거'}
            onSongClick={removeSongInPlaylist}
            resultNum={resultNum}
            onPagePlus={handelPlus}
            onPageMinus={handelMinus}
          />
        </MainSec>
      )}
    </>
  );
}
getAppLayOut(AppPlaylist);
