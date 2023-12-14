import React, { useState, useEffect } from 'react';

import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import MainSec from '../../components/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import SearchBar from '../../components/Search/SearchBar';
import SongResultRow from '../../components/Table/SongResultRow';
import SongTable from '../../components/Table/SongTable';
import TitleBar from '../../components/TitleBar';
import { useBuskingContext } from '../../context/BuskingContext';
import { usePlaylistContext } from '../../context/PlaylistContext';
import useSearch from '../../hooks/UseSearch';
import { getAppLayOut } from '../../layouts/appLayout';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { PlaylistSongData } from '../../store/type/playlist';
import { color } from '../../styles/theme';
//TODO: 플레이리스트 노래 제목이나 가수 수정기능 추가 이것도 송 아이템에 부가 버튼 만들어서 추가하자
// 자리 부족한 반응형 화면에서는 ... 이모티콘 넣어서 눌렀을때 버튼 리스트 나오게
export default function AppPlaylist() {
  const [songArr, setSongArr] = useState<PlaylistSongData[]>([]);
  const { nowPlaylist, removeSongInPlaylist, editSongInPlaylist } =
    usePlaylistContext();
  const {
    buskingQueryResult: { data: buskingData },
  } = useBuskingContext();
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
  const {
    searchWord,
    setSearchWord,
    isLoading,
    viewedDataArr,
    nowPageNum,
    handlePlus,
    handleMinus,
    handleSearchBtnClick,
  } = useSearch<PlaylistSongData>(songArr);

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
              <SearchBar.MainSec.Select
                optionValueArr={songSearchWordCategories}
              />

              <SearchBar.MainSec.InputWithButton
                handleClickBtn={handleSearchBtnClick}
              />
              <SearchBar.MainSec.Button
                handleClickBtn={handleSearchBtnClick}
                text='검색'
              />
            </SearchBar.MainSec>
            <SearchBar.SubSec>
              <ArrangeMenuBtn
                results={songArr}
                setResults={setSongArr}
                isBusking={false}
              />
            </SearchBar.SubSec>
          </SearchBar>

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <LoadingCheckWrapper isLoading={isLoading}>
            <SongTable<PlaylistSongData>
              viewdSongArr={viewedDataArr}
              nowPageNum={nowPageNum}
              renderSongResult={(index, result) => (
                <SongResultRow key={result.artist + result.title}>
                  <SongResultRow.Text text={index.toString()} />
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
                    {buskingData && (
                      <SongResultRow.EtcButton.RowButton
                        onClick={() => {}}
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
