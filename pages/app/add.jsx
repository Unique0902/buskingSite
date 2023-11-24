import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongAddTable from '../../components/Table/SongAddTable';
import { useEffect } from 'react';
import { getAppLayOut } from '../../layouts/appLayout';
import InfoBtn from '../../components/InfoBtn';
import { useLastFmContext } from '../../context/LastFmContext';
import NoPlaylistSection from '../../components/NoPlaylistSection';
import { PlusIcn } from '../../assets/icon/icon';

export default function AppAdd({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const { nowPlaylist, addSongToPlaylist } = usePlaylistContext();
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

  return (
    <>
      <TitleBar text={'노래추가'} />
      {!nowPlaylist ? (
        <NoPlaylistSection />
      ) : (
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            handleSearchBtnClick={handelChange}
          >
            <InfoBtn
              text={
                'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
              }
            />
          </SongSearchBar>
          <SongAddTable
            results={searchResults}
            pageNum={pageNum}
            onSongClick={addSongToPlaylist}
            resultNum={resultNum}
            onPagePlus={handelPlus}
            onPageMinus={handelMinus}
          >
            <PlusIcn width={24} height={24} color={'white'} />
          </SongAddTable>
        </MainSec>
      )}
    </>
  );
}

getAppLayOut(AppAdd);
