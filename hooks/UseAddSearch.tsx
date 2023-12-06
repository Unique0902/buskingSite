import { useEffect, useState } from 'react';
import Icon from '../assets/icon/icon';
import HoverIcon from '../components/Hover/HoverIcon';
import RenderedWhenFullScreen from '../components/Responsive/RenderedWhenFullScreen';
import SearchBar from '../components/Search/SearchBar';
import { useLastFmContext } from '../context/LastFmContext';
import {
  FmEditedTopTrackData,
  FmTopTrackData,
  FmTrackData,
} from '../store/type/fm';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
const useAddSearch = () => {
  //searchResults까지 그냥 넣어버림 ㅎㅎ
  const [searchResults, setSearchResults] = useState<
    FmTrackData[] | FmEditedTopTrackData[]
  >([]);
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTopTrackTime, setIsTopTrackTime] = useState<boolean>(true);
  const [savedSearchWord, setSavedSearchWord] = useState<SearchWord | null>(
    null
  );
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  const [resultNum, setResultNum] = useState<number>(0);

  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();

  const searchBySearchBtn = async () => {
    setIsLoading(true);
    setIsTopTrackTime(false);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const result = await searchSongByName(searchWord.name, 1);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (searchWord.category === '가수') {
        const result = await searchSongByArtist(searchWord.name, 1);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
      setSavedSearchWord({ ...searchWord });
    }
    setIsLoading(false);
  };

  const searchByPageChange = async (pageNum: number) => {
    setIsLoading(true);
    if (isTopTrackTime) {
      searchTopTrack(pageNum);
      return;
    }
    if (savedSearchWord) {
      if (savedSearchWord.category === '제목') {
        const result = await searchSongByName(savedSearchWord.name, pageNum);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (savedSearchWord.category === '가수') {
        const result = await searchSongByArtist(savedSearchWord.name, pageNum);
        setSearchResults(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
    }
    setIsLoading(false);
  };

  const searchTopTrack = async (pageNum: number) => {
    setIsLoading(true);
    const result = await getTopTracks(pageNum);
    if (result.track) {
      setSearchResults(
        result.track.map((data: FmTopTrackData): FmEditedTopTrackData => {
          return { ...data, artist: data.artist.name };
        })
      );
      setResultNum(parseInt(result['@attr'].total));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchTopTrack(1);
  }, []);

  //얘는 지혼자 데이터 변할일 없어서 필요없음
  // useEffect(() => {
  //   setNowPageNum(1);
  // }, [searchResults]);

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

  //어차피 여기서 pageNum 초기화함
  const handleSearchBySearchBtn = () => {
    setNowPageNum(1);
    searchBySearchBtn();
  };

  const handleSearchBtnClick = () => {
    if (searchWord.category) {
      handleSearchBySearchBtn();
    }
  };

  //TODO: react 작동원리 이해하여 이거와 내부에서 컴포넌트 선언하는거의 차이 알기
  // 컴포넌트를 생성한거를 불러오는거와 그냥 return 함수 가져오는것의 차이?

  const renderSearchBar = () => {
    return (
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}>
        <SearchBar.MainSec>
          <SearchBar.MainSec.Select optionValueArr={['제목', '가수']} />

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
            <RenderedWhenFullScreen>
              <HoverIcon
                text={
                  'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
                }
                icon='Inform'
              />
            </RenderedWhenFullScreen>
          )}
        ></SearchBar.SubSec>
      </SearchBar>
    );
  };

  return [
    {
      searchResults,
      searchWord,
      setSearchWord,
      isLoading,
      nowPageNum,
      resultNum,
      handlePlus,
      handleMinus,
      handleSearchBtnClick,
      renderSearchBar,
    },
  ] as const;
};

export default useAddSearch;
