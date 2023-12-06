import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import { MinusIcn } from '../../assets/icon/icon';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import { PlaylistSongData } from '../../store/type/playlist';
import SearchBar from '../../components/Search/SearchBar';
import PrimarySongResult from '../../components/Table/PrimarySongResult';
import useSearch from '../../hooks/UseSearch';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import SongTable from '../../components/Table/SongTable';

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

  //TODO: searchword가 searchBar의 여러 컴포넌트에 전해지는게 맘에 안듬, searchWord state도 searchBar에서 관리하게하고싶음
  //바깥 컴포넌트에서 말고 useAddSearch의 로직이 워낙 복잡하다 보니.. 쉽지않네
  const [
    {
      searchWord,
      setSearchWord,
      isLoading,
      viewedDataArr,
      nowPageNum,
      handlePlus,
      handleMinus,
      handleSearchBtnClick,
    },
  ] = useSearch<PlaylistSongData>(songArr);

  const handleClickResult = (sid: string) => {
    removeSongInPlaylist(sid);
  };

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}>
            <SearchBar.MainSec>
              <SearchBar.MainSec.Select>
                <SearchBar.MainSec.Option value='제목' />
                <SearchBar.MainSec.Option value='가수' />
              </SearchBar.MainSec.Select>
              <SearchBar.MainSec.InputWithButton
                handleClickBtn={handleSearchBtnClick}
              />
              <SearchBar.MainSec.Button
                handleClickBtn={handleSearchBtnClick}
                text='검색'
              />
            </SearchBar.MainSec>
            <SearchBar.SubSec
              render={() => (
                <ArrangeMenuBtn
                  results={songArr}
                  setResults={setSongArr}
                  isBusking={false}
                />
              )}
            ></SearchBar.SubSec>
          </SearchBar>

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <LoadingCheckWrapper isLoading={isLoading}>
            <SongTable<PlaylistSongData>
              viewdSongArr={viewedDataArr}
              nowPageNum={nowPageNum}
              renderSongResult={(index, result) => (
                <PrimarySongResult
                  key={result.id}
                  index={index}
                  result={result}
                  handleSongClick={handleClickResult}
                >
                  <MinusIcn width={24} height={24} color={'white'} />
                </PrimarySongResult>
              )}
            >
              <SongTable.PagingBar
                resultNum={songArr.length}
                pageNum={nowPageNum}
                onPagePlus={handlePlus}
                onPageMinus={handleMinus}
              />
            </SongTable>
          </LoadingCheckWrapper>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppPlaylist);
