import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongTable from '../../components/SongTable';
import { useEffect } from 'react';
import { getAppLayOut } from '../../layouts/appLayout';
import InfoBtn from '../../components/InfoBtn';
import { useLastFmContext } from '../../context/LastFmContext';
import PrimaryBtn from '../../components/Btn/PrimaryBtn';

export default function AppAdd({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const { nowPlaylist, addBasicPlaylist, addSongToPlaylist } =
    usePlaylistContext();
  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();
  const search = (pageNum) => {
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        searchSongByName(searchWord.name, pageNum).then((result) => {
          setSearchResults(result.trackmatches.track);
          setResultNum(parseInt(result['opensearch:totalResults']));
        });
      } else if (searchWord.category === '가수') {
        searchSongByArtist(searchWord.name, pageNum).then((result) => {
          setSearchResults(result.trackmatches.track);
          setResultNum(parseInt(result['opensearch:totalResults']));
        });
      }
    } else {
      getTopTracks(pageNum).then((result) => {
        setSearchResults(result.track);
        setResultNum(parseInt(result['@attr'].total));
      });
    }
  };
  useEffect(() => {
    if (searchResults) {
      if (searchResults.length > 6) {
        setSearchResults(searchResults.slice(-6));
      }
    }
  }, [searchResults]);
  const handelPlus = () => {
    search(pageNum + 1);
    setPageNum(pageNum + 1);
  };
  const handelMinus = () => {
    if (pageNum !== 1) {
      search(pageNum - 1);
      setPageNum(pageNum - 1);
    }
  };
  const handelChange = () => {
    setPageNum(1);
    search(1);
  };
  const handleClickAddBasicPlaylist = () => {
    addBasicPlaylist();
  };
  return (
    <>
      <TitleBar text={'노래추가'} />
      {!nowPlaylist ? (
        <MainSec>
          <h3 className='font-sans font-semibold text-xl text-black'>
            플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
          </h3>
          <PrimaryBtn handleClick={handleClickAddBasicPlaylist}>
            추가하기
          </PrimaryBtn>
        </MainSec>
      ) : (
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSearchBarChange={handelChange}
          >
            <InfoBtn
              text={
                'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
              }
            />
          </SongSearchBar>
          <SongTable
            isSearch={true}
            results={searchResults}
            pageNum={pageNum}
            btnText={'추가'}
            onSongClick={addSongToPlaylist}
            resultNum={resultNum}
            onPagePlus={handelPlus}
            onPageMinus={handelMinus}
          />
        </MainSec>
      )}
    </>
  );
}

getAppLayOut(AppAdd);
