import React, { useState } from 'react';
import MainSec from '../../components/Main/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylist/NoPlaylistCheckWrapper';
import SongResultRow from '../../components/Table/SongResultRow';
import TitleBar from '../../components/Main/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { getAppLayOut } from '../../layouts/appLayout';
import { color } from '../../styles/theme';
import { calculateDataIdxInTable } from '../../utils/calculate';
import ListPage from '../../components/ListPage/ListPage';
import NewSearchBar from '../../components/Search/NewSearchBar';
import NoSongScreen from '../../components/Table/NoSongScreen';
import { UseListPageDataWithFmData } from '../../hooks/UseListPageDataWithFmData';
export default function AppAdd() {
  const { uid } = useAuthContext();
  const { nowPlaylist, addSongToPlaylist } = usePlaylist(uid);

  const SONG_NUM_PER_PAGE = 6;

  const {
    fmSongArr,
    totalResultNum,
    handleSearch,
    handleChangePage,
    searchWord,
  } = UseListPageDataWithFmData(SONG_NUM_PER_PAGE);

  return (
    <>
      <TitleBar text={'노래추가'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <NewSearchBar categories={['제목', '가수']}>
            <NewSearchBar.MainSec>
              <NewSearchBar.MainSec.Select />
              <NewSearchBar.MainSec.Input />
              <NewSearchBar.MainSec.Button
                handleClickBtn={handleSearch}
                text='검색'
              />
            </NewSearchBar.MainSec>
          </NewSearchBar>

          <ListPage
            key={
              searchWord.name
                ? searchWord.name + searchWord.category
                : 'topTrackDataListPage'
            }
            pageDataInform={{
              resultNumPerPage: SONG_NUM_PER_PAGE,
              resultTotalNum: totalResultNum,
            }}
            pageDataArr={fmSongArr || []}
            renderNoData={() => <NoSongScreen />}
            handleChangePage={handleChangePage}
            renderData={(result, idx, nowPageNum) => (
              <SongResultRow key={result.artist + result.title}>
                <SongResultRow.Text
                  text={calculateDataIdxInTable(
                    idx,
                    nowPageNum,
                    SONG_NUM_PER_PAGE
                  ).toString()}
                />
                <SongResultRow.Inform
                  title={result.title}
                  artist={result.artist}
                />
                <SongResultRow.IconButton
                  icon='Plus'
                  size={24}
                  color={color.white}
                  onClick={() => addSongToPlaylist(result.title, result.artist)}
                />
              </SongResultRow>
            )}
          />
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}

getAppLayOut(AppAdd);
