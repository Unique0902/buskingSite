import React from 'react';

import HoverIcon from '../../components/Hover/HoverIcon';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import MainSec from '../../components/MainSec';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import RenderedWhenFullScreen from '../../components/Responsive/RenderedWhenFullScreen';
import SearchBar from '../../components/Search/SearchBar';
import SongResultRow from '../../components/Table/SongResultRow';
import SongTable from '../../components/Table/SongTable';
import TitleBar from '../../components/TitleBar';
import { usePlaylistContext } from '../../context/PlaylistContext';
// import useFmData from '../../hooks/songData/UseFmData';
import useAddSearch from '../../hooks/UseAddSearch';
import { getAppLayOut } from '../../layouts/appLayout';
import { songSearchWordCategories } from '../../store/data/CategoryTypes';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import { color } from '../../styles/theme';
// TODO: searchBar, songTable 기능 테스트 적은후 하기
// 자꾸 구조 바꿀때마다 오류나는게 걱정나니 ㅜ..
export default function AppAdd() {
  const { nowPlaylist, addSongToPlaylist } = usePlaylistContext();
  //TODO: 커스텀 훅들도 좀 분리좀하자 ㅜ..
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

  // const { data } = useFmData({ title: 'dynamite', pageNum: 1 });
  // console.log(data);
  return (
    <>
      <TitleBar text={'노래추가'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          {/* compound 디자인패턴 이용한 리팩토링!! 좀더 가독성이 좋아진 기분이랄까 커스텀 변경도 쉬워짐!! */}
          {/* compound 디자인 관련해서는 고민해봐야될듯 atomic 디자인을 적용해볼까..? 안에 어떻게할지 적어놓음 */}
          {/* 아토믹 디자인은 디자인 시안이 나와있을때, 스토리북을 함께 사용하면서 하나하나 개발하는게 효율적인듯 */}
          {/* TODO: hidden으로 숨기는거랑 usemediaQuery로 판단하여 조건 렌더링하는거랑 무엇이 옳은지 찾아보기 */}
          {/* 리페인팅 개념과 리렌더링 개념이며 하위 렌더링도 생각해봐야할 요소이고 자세한건 useMediaQuery 구현사항
          을 봐야 알듯 */}
          {/*  아래를 좀더 간단하고 직관적이게 할수있는 방법이 없을까? <<요정도면 충분할듯 */}
          {/* context로 searchWord랑 setSearchWord를 전달하면 4줄정도는 줄일수있겠네.. 
          컴포넌트들의 의존성을 줄일방법을 찾고싶네 ㅜ..
          */}
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
              <RenderedWhenFullScreen>
                <HoverIcon
                  text='Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
                  icon='Inform'
                />
              </RenderedWhenFullScreen>
            </SearchBar.SubSec>
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
