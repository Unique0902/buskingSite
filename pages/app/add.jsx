import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/Search/SongSearchBar';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongAddTable from '../../components/Table/SongAddTable';
import { useEffect } from 'react';
import { getAppLayOut } from '../../layouts/appLayout';
import { InformIcn, PlusIcn } from '../../assets/icon/icon';
import HoverIcon from '../../components/Hover/HoverIcon';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import useAddSearch from '../../hooks/UseAddSearch';

export default function AppAdd({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [nowPageNum, setNowPageNum] = useState(1);
  const { nowPlaylist, addSongToPlaylist } = usePlaylistContext();

  const [searchWord, setSearchWord, isLoading, search] = useAddSearch(
    setSearchResults,
    setResultNum,
    nowPageNum
  );
  useEffect(() => {
    if (searchResults) {
      if (searchResults.length > 6) {
        setSearchResults(searchResults.slice(-6));
      }
    }
  }, [searchResults]);
  const handelPlus = () => {
    search(nowPageNum + 1);
    setNowPageNum(nowPageNum + 1);
  };
  const handelMinus = () => {
    if (nowPageNum !== 1) {
      search(nowPageNum - 1);
      setNowPageNum(nowPageNum - 1);
    }
  };
  const handelChange = () => {
    setNowPageNum(1);
    search(1);
  };

  return (
    <>
      <TitleBar text={'노래추가'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSearch={handelChange}
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
          <LoadingCheckWrapper isLoading={isLoading}>
            <SongAddTable
              results={searchResults}
              pageNum={nowPageNum}
              onSongClick={addSongToPlaylist}
              resultNum={resultNum}
              onPagePlus={handelPlus}
              onPageMinus={handelMinus}
            >
              <PlusIcn width={24} height={24} color={'white'} />
            </SongAddTable>
          </LoadingCheckWrapper>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}

getAppLayOut(AppAdd);
