import React, { useState, useEffect } from 'react';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import LoadingCheckWrapper from '../../components/Loading/LoadingCheckWrapper';
import MainSec from '../../components/Main/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylist/NoPlaylistCheckWrapper';
import SearchBar from '../../components/Search/SearchBar';
import SongResultRow from '../../components/Table/SongResultRow';
import SongTable from '../../components/Table/SongTable';
import TitleBar from '../../components/Main/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useMediaQueryContext } from '../../context/MediaQueryContext';
import { useBusking } from '../../hooks/UseBusking';
import { usePlaylist } from '../../hooks/UsePlaylist';
import useSearch from '../../hooks/UseSearch';
import { getAppLayOut } from '../../layouts/appLayout';
import { PlaylistSongDataArrangeOption } from '../../store/data/ArrangeOptions';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { PlaylistSongData } from '../../store/type/playlist';
import { color } from '../../styles/theme';
import {
  calculateDataIdxInTable,
  calculateTotalPageNum,
} from '../../utils/calculate';
import ListPage from '../../components/ListPage/ListPage';
import NoSongScreen from '../../components/Table/NoSongScreen';
import { UseListPageDataWithAllData } from '../../hooks/UseListPageDataWithAllData';
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

  //searchword가 searchBar의 여러 컴포넌트에 전해지는게 맘에 안듬, searchWord state도 searchBar에서 관리하게하고싶음 <<이건 불가능
  //그래도 전자는 해결
  //바깥 컴포넌트에서 말고 useAddSearch의 로직이 워낙 복잡하다 보니.. 쉽지않네
  const { searchWord, setSearchWord, handleSearchBtnClick } =
    useSearch<PlaylistSongData>(songArr);

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
        const songToApply = songArr.find((s) => s.id === sid);
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
            'there is no song that you apply in playlist SongArr!!'
          );
        }
      }
    }
  };
  const { isSmScreen } = useMediaQueryContext();
  const SONG_NUM_PER_PAGE = 6;

  const { viewedSongArr, handleViewedSongArrByPageNum } =
    UseListPageDataWithAllData(songArr, SONG_NUM_PER_PAGE);

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          {/* TODO: SearchBar속에 searchWord 들어가서 콜백함수로 실행되게 리팩토링하기 4/16 */}
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
            <SearchBar.SubSec>
              <ArrangeMenuBtn<PlaylistSongData>
                setResults={setSongArr}
                arrangeOptionArr={PlaylistSongDataArrangeOption}
              />
            </SearchBar.SubSec>
          </SearchBar>

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <ListPage
            pageDataInform={{
              resultNumPerPage: SONG_NUM_PER_PAGE,
              resultTotalNum: songArr.length,
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
