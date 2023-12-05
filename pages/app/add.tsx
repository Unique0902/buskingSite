import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import { usePlaylistContext } from '../../context/PlaylistContext';
import SongAddTable from '../../components/Table/SongAddTable';
import { useEffect } from 'react';
import { getAppLayOut } from '../../layouts/appLayout';
import { InformIcn, PlusIcn } from '../../assets/icon/icon';
import HoverIcon from '../../components/Hover/HoverIcon';
import LoadingCheckWrapper from '../../components/LoadingCheckWrapper';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import useAddSearch from '../../hooks/UseAddSearch';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import SearchBar from '../../components/Search/SearchBar';
import RenderedWhenFullScreen from '../../components/Responsive/RenderedWhenFullScreen';
import SongTable from '../../components/Table/SongTable';
import SongAddResult from '../../components/Table/SongAddResult';

export default function AppAdd() {
  const [searchResults, setSearchResults] = useState<
    FmTrackData[] | FmEditedTopTrackData[]
  >([]);
  const [resultNum, setResultNum] = useState<number>(0);
  const [nowPageNum, setNowPageNum] = useState<number>(1);

  const { nowPlaylist, addSongToPlaylist } = usePlaylistContext();

  const [
    searchWord,
    setSearchWord,
    isLoading,
    searchBySearchBtn,
    searchByPageChange,
  ] = useAddSearch(setSearchResults, setResultNum);

  useEffect(() => {
    setNowPageNum(1);
  }, [searchResults]);
  useEffect(() => {
    if (searchResults) {
      if (searchResults.length > 6) {
        setSearchResults(searchResults.slice(-6));
      }
    }
  }, [searchResults]);
  const handlePlus = () => {
    if (nowPageNum < resultNum / 6) {
      searchByPageChange(nowPageNum + 1);
      setNowPageNum(nowPageNum + 1);
    }
  };
  const handleMinus = () => {
    if (nowPageNum !== 1) {
      searchByPageChange(nowPageNum - 1);
      setNowPageNum(nowPageNum - 1);
    }
  };
  const handleSearchBySearchBtn = () => {
    setNowPageNum(1);
    searchBySearchBtn();
  };

  // TODO:이름 좀더 명확하게 변경 필요
  const handleClickBtn = () => {
    if (searchWord.category) {
      handleSearchBySearchBtn();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord({ ...searchWord, name: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWord({
      ...searchWord,
      category: e.target.value as '제목' | '가수',
    });
  };

  return (
    <>
      <TitleBar text={'노래추가'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          {/* compound 디자인패턴 이용한 리팩토링!! 좀더 가독성이 좋아진 기분이랄까 커스텀 변경도 쉬워짐!! */}
          <div className='relative flex flex-row items-center gap-4 mb-6'>
            {/* TODO:compound 디자인 관련해서는 고민해봐야될듯 atomic 디자인을 적용해볼까..? 안에 어떻게할지 적어놓음 */}
            {/* TODO: hidden으로 숨기는거랑 usemediaQuery로 판단하여 조건 렌더링하는거랑 무엇이 옳은지 찾아보기 */}
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
                  handleClickBtn={handleClickBtn}
                  handleInputChange={handleInputChange}
                />
                <SearchBar.MainSec.Button
                  handleClickBtn={handleClickBtn}
                  text='검색'
                />
              </SearchBar.MainSec>
              <SearchBar.SubSec
                render={() => (
                  <RenderedWhenFullScreen>
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
                  </RenderedWhenFullScreen>
                )}
              ></SearchBar.SubSec>
            </SearchBar>
          </div>

          <LoadingCheckWrapper isLoading={isLoading}>
            <SongTable
              viewdSongArr={searchResults}
              nowPageNum={nowPageNum}
              resultNum={resultNum}
              onPagePlus={handlePlus}
              onPageMinus={handleMinus}
              renderSongResult={(key, index, result) => (
                <SongAddResult
                  key={key}
                  index={index}
                  result={result as FmEditedTopTrackData | FmTrackData}
                  handleSongClick={addSongToPlaylist}
                >
                  <PlusIcn width={24} height={24} color={'white'} />
                </SongAddResult>
              )}
            ></SongTable>
          </LoadingCheckWrapper>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}

getAppLayOut(AppAdd);
