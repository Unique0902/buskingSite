import React from 'react';

import HoverIcon from '../../components/Hover/HoverIcon';
import LoadingCheckWrapper from '../../components/Loading/LoadingCheckWrapper';
import MainSec from '../../components/Main/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylist/NoPlaylistCheckWrapper';
import SearchBar from '../../components/Search/SearchBar';
import SongResultRow from '../../components/Table/SongResultRow';
import SongTable from '../../components/Table/SongTable';
import TitleBar from '../../components/Main/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useMediaQueryContext } from '../../context/MediaQueryContext';
import useAddSearch from '../../hooks/UseAddSearch';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { getAppLayOut } from '../../layouts/appLayout';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import { color } from '../../styles/theme';
// TODO: searchBar, songTable 기능 테스트 적은후 하기
// 자꾸 구조 바꿀때마다 오류나는게 걱정나니
export default function AppAdd() {
  const { uid } = useAuthContext();
  const { nowPlaylist, addSongToPlaylist } = usePlaylist(uid);
  const {
    searchResults,
    searchWord,
    setSearchWord,
    isLoading,
    nowPageNum,
    resultNum,
    handlePlus,
    handleMinus,
    handleSearchBtnClick,
  } = useAddSearch();

  const { isSmScreen } = useMediaQueryContext();

  return (
    <>
      <TitleBar text={'노래추가'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}>
            <SearchBar.MainSec>
              <SearchBar.MainSec.Select
                optionValueArr={songSearchWordCategories}
              />
              <SearchBar.MainSec.InputWithButton
                handleClickBtn={handleSearchBtnClick}
              />
              <SearchBar.MainSec.Button
                handleClickBtn={handleSearchBtnClick}
                text='검색'
                isSmScreen={isSmScreen}
              />
            </SearchBar.MainSec>
          </SearchBar>
          <LoadingCheckWrapper isLoading={isLoading}>
            <SongTable<FmEditedTopTrackData | FmTrackData>
              viewdSongArr={searchResults}
              nowPageNum={nowPageNum}
              renderSongResult={(index, result) => (
                <SongResultRow key={result.artist + result.name}>
                  <SongResultRow.Text text={index.toString()} />
                  <SongResultRow.Inform
                    title={result.name}
                    artist={result.artist}
                  />
                  <SongResultRow.IconButton
                    icon='Plus'
                    size={24}
                    color={color.white}
                    onClick={() =>
                      addSongToPlaylist(result.name, result.artist)
                    }
                  />
                </SongResultRow>
              )}
            >
              <SongTable.PagingBar
                resultNum={resultNum}
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

getAppLayOut(AppAdd);
