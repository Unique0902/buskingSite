import React, { useState, useEffect } from 'react';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import MainSec from '../../components/Main/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylist/NoPlaylistCheckWrapper';
import SongResultRow from '../../components/Table/SongResultRow';
import TitleBar from '../../components/Main/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useBusking } from '../../hooks/UseBusking';
import { usePlaylist } from '../../hooks/UsePlaylist';
import { getAppLayOut } from '../../layouts/appLayout';
import { PlaylistSongDataArrangeOption } from '../../store/data/ArrangeOptions';
import { PlaylistSongData } from '../../store/type/playlist';
import { color } from '../../styles/theme';
import { calculateDataIdxInTable } from '../../utils/calculate';
import ListPage from '../../components/ListPage/ListPage';
import NoSongScreen from '../../components/Table/NoSongScreen';
import { UseListPageDataWithAllData } from '../../hooks/UseListPageDataWithAllData';
import NewSearchBar from '../../components/Search/NewSearchBar';
import { NewSearchWord } from '../../store/type/searchword';
//TODO: 플레이리스트 노래 제목이나 가수 수정기능 추가 이것도 송 아이템에 부가 버튼 만들어서 추가하자
// 자리 부족한 반응형 화면에서는 ... 이모티콘 넣어서 눌렀을때 버튼 리스트 나오게
export default function AppPlaylist() {
  const { uid } = useAuthContext();
  const [songArr, setSongArr] = useState<PlaylistSongData[]>([]);
  const { nowPlaylist, removeSongInPlaylist, editSongInPlaylist } =
    usePlaylist(uid);
  const {
    buskingQuery: { data: buskingData },
    applyOldBuskingSong,
    applyNewBuskingSong,
  } = useBusking(uid);
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setSongArr(Object.values(nowPlaylist.songs))
        : setSongArr([]);
    } else {
      setSongArr([]);
    }
  }, [nowPlaylist]);

  // const { searchWord, setSearchWord, handleSearchBtnClick } =
  //   useSearch<PlaylistSongData>(songArr);

  // -------------

  const [songArrToView, setSongArrToView] = useState<PlaylistSongData[]>([]);
  useEffect(() => {
    setSongArrToView([...songArr]);
  }, [songArr]);
  const searchBySearchWord = (searchWord: NewSearchWord) => {
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const filterdDataArr = songArr.filter((song) =>
          song.title.toLowerCase().includes(searchWord.name)
        );
        setSongArrToView([...filterdDataArr]);
      } else if (searchWord.category === '가수') {
        const filterdDataArr = songArr.filter((song) =>
          song.artist.toLowerCase().includes(searchWord.name)
        );
        setSongArrToView([...filterdDataArr]);
      } else {
        throw new Error('not exist song searchWord category!');
      }
    } else {
      setSongArrToView([...songArr]);
    }
  };
  //TODO: 테스트 만들기 (TDD 안하니까 불안하더라)
  const handleSearchBtnClick = (searchWord: NewSearchWord) => {
    if (searchWord.category) {
      // setNowPageNum(1);
      searchBySearchWord(searchWord);
    }
  };
  // -------------

  const handleClickResult = (sid: string) => {
    removeSongInPlaylist(sid);
  };

  const handleApplySong = (sid: string, uid: string) => {
    if (buskingData && buskingData.playlistId === nowPlaylist?.id) {
      const ipData = 'user';
      const appliance = buskingData.appliance
        ? Object.values(buskingData.appliance)
        : [];
      const appliedSongData = appliance.find((song) => song.sid === sid);
      if (appliedSongData) {
        const isUserApplied = !!appliedSongData.applicants.find(
          (ap) => ap.ip === ipData
        );
        if (isUserApplied) {
          window.alert('이미 신청했습니다!');
          return;
        }
        applyOldBuskingSong(uid, sid, ipData, appliedSongData);
        alert(appliedSongData.title + ' 이 신청되었습니다!');
      } else {
        if (appliance.length === buskingData.maxNum) {
          alert('신청 최대수에 도달했습니다!');
          return;
        }
        const songToApply = songArrToView.find((s) => s.id === sid);
        if (songToApply) {
          applyNewBuskingSong(
            uid,
            songToApply.title,
            songToApply.artist,
            sid,
            ipData
          );
          alert(songToApply.title + ' 이 신청되었습니다!');
        } else {
          throw new Error(
            'there is no song that you apply in playlist songArrToView!!'
          );
        }
      }
    }
  };
  const SONG_NUM_PER_PAGE = 6;

  const { viewedSongArr, handleViewedSongArrByPageNum } =
    UseListPageDataWithAllData(songArrToView, SONG_NUM_PER_PAGE);

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          <NewSearchBar categories={['제목', '가수']}>
            <NewSearchBar.MainSec>
              <NewSearchBar.MainSec.Select />
              <NewSearchBar.MainSec.Input />
              <NewSearchBar.MainSec.Button
                handleClickBtn={handleSearchBtnClick}
                text='검색'
              />
            </NewSearchBar.MainSec>
            <NewSearchBar.SubSec>
              <ArrangeMenuBtn<PlaylistSongData>
                setResults={setSongArrToView}
                arrangeOptionArr={PlaylistSongDataArrangeOption}
              />
            </NewSearchBar.SubSec>
          </NewSearchBar>

          {/* <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}>
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
            <SearchBar.SubSec>
              <ArrangeMenuBtn<PlaylistSongData>
                setResults={setSongArr}
                arrangeOptionArr={PlaylistSongDataArrangeOption}
              />
            </SearchBar.SubSec>
          </SearchBar> */}

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArrToView && songArrToView.length}
          </h2>

          <ListPage
            pageDataInform={{
              resultNumPerPage: SONG_NUM_PER_PAGE,
              resultTotalNum: songArrToView.length,
              totalDataArr: songArrToView,
            }}
            pageDataArr={viewedSongArr}
            renderNoData={() => <NoSongScreen />}
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
                  icon='Minus'
                  size={20}
                  color={color.warning}
                  onClick={() => handleClickResult(result.id)}
                />
                <SongResultRow.EtcButton>
                  <SongResultRow.EtcButton.HiddenShowRowButton
                    text={'노래정보 수정하기'}
                  />
                  {buskingData &&
                    buskingData.playlistId === nowPlaylist?.id && (
                      <SongResultRow.EtcButton.RowButton
                        onClick={() => {
                          uid && handleApplySong(result.id, uid);
                        }}
                        text={'버스킹 리스트에 추가하기'}
                      />
                    )}
                </SongResultRow.EtcButton>
                <SongResultRow.HiddenSection>
                  <SongResultRow.EditForm
                    title={result.title}
                    artist={result.artist}
                    onEdit={(data) => {
                      editSongInPlaylist(result.id, data);
                    }}
                  />
                </SongResultRow.HiddenSection>
              </SongResultRow>
            )}
            handleChangePage={handleViewedSongArrByPageNum}
          />
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppPlaylist);
