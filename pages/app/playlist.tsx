import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import PrimarySongTable from '../../components/Table/PrimarySongTable';
import { MinusIcn } from '../../assets/icon/icon';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import useSearchBar from '../../hooks/UseSearchBar';
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
  // const [searchWord, setSearchWord, search] = useSearchBar(
  //   (nowPlaylist && nowPlaylist.songs) || null,
  //   setSongArr
  // );
  const [
    {
      searchWord,
      isLoading,
      viewedDataArr,
      nowPageNum,
      handlePlus,
      handleMinus,
      handleSearchBtnClick,
      handleInputChange,
      handleSelectChange,
    },
  ] = useSearch(songArr);

  const handleClickResult = (sid: string) => {
    removeSongInPlaylist(sid);
  };

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <div className='relative flex flex-row items-center gap-4 mb-6 max-lg:flex-col'>
            <SearchBar>
              <SearchBar.MainSec>
                <SearchBar.MainSec.Select
                  searchWord={searchWord}
                  handleSelectChange={handleSelectChange}
                >
                  <SearchBar.MainSec.Option value='제목' />
                  <SearchBar.MainSec.Option value='가수' />
                </SearchBar.MainSec.Select>
                <SearchBar.MainSec.Input
                  inputValue={searchWord.name}
                  handleClickBtn={handleSearchBtnClick}
                  handleInputChange={handleInputChange}
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
          </div>

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <LoadingCheckWrapper isLoading={isLoading}>
            <SongTable
              viewdSongArr={viewedDataArr}
              nowPageNum={nowPageNum}
              resultNum={songArr.length}
              onPagePlus={handlePlus}
              onPageMinus={handleMinus}
              renderSongResult={(key, index, result) => (
                <PrimarySongResult
                  key={key}
                  index={index}
                  result={result as PlaylistSongData}
                  handleSongClick={handleClickResult}
                >
                  <MinusIcn width={24} height={24} color={'white'} />
                </PrimarySongResult>
              )}
            ></SongTable>
          </LoadingCheckWrapper>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppPlaylist);
