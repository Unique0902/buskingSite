import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongAddTable from '../../components/Table/SongAddTable';
import { useEffect } from 'react';
import { getAppLayOut } from '../../layouts/appLayout';
import { useLastFmContext } from '../../context/LastFmContext';
import NoPlaylistSection from '../../components/NoPlaylistSection';
import { InformIcn, PlusIcn } from '../../assets/icon/icon';
import LoadingSpinner from '../../components/LoadingSpinner';
import HoverIcon from '../../components/Hover/HoverIcon';

export default function AppAdd({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const { nowPlaylist, addSongToPlaylist } = usePlaylistContext();
  const { searchSongByName, searchSongByArtist } = useLastFmContext();
  const search = async (pageNum) => {
    setIsLoading(true);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const result = await searchSongByName(searchWord.name, pageNum);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (searchWord.category === '가수') {
        const result = await searchSongByArtist(searchWord.name, pageNum);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
    }
    setIsLoading(false);
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
            <HoverIcon
              text={
                'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
              }
            >
              <InformIcn
                color={'blue'}
                width={24}
                height={24}
                className='ml-3 text-2xl text-blue-500 max-lg:w-5 max-lg:h-5 max-lg:hidden'
              />
            </HoverIcon>
          </SongSearchBar>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
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
          )}
        </MainSec>
      )}
    </>
  );
}

getAppLayOut(AppAdd);
