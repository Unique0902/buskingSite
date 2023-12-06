import { useEffect, useState } from 'react';
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord({ ...searchWord, name: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWord({
      ...searchWord,
      category: e.target.value as '제목' | '가수',
    });
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
      handleInputChange,
      handleSelectChange,
    },
  ] as const;
};

export default useAddSearch;
