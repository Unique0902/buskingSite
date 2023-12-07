import React, { useEffect, useState } from 'react';
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
const useAddSearchBar = (
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [searchResults, setSearchResults] = useState<
    FmTrackData[] | FmEditedTopTrackData[]
  >([]);
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [isTopTrackTime, setIsTopTrackTime] = useState<boolean>(true);
  const [savedSearchWord, setSavedSearchWord] = useState<SearchWord | null>(
    null
  );
  const [resultNum, setResultNum] = useState<number>(0);

  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();

  const searchBySearchBtn = async () => {
    if (isLoading) {
      return;
    }
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
    if (isLoading) {
      return;
    }
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
    if (isLoading) {
      return;
    }
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

  useEffect(() => {
    if (searchResults) {
      if (searchResults.length > 6) {
        setSearchResults(searchResults.slice(-6));
      }
    }
  }, [searchResults]);

  // 얘는 지혼자 데이터 변할일 없어서 필요없음
  // useEffect(() => {
  //   setNowPageNum(1);
  // }, [searchResults]);

  return {
    searchWord,
    setSearchWord,
    searchResults,
    resultNum,
    searchBySearchBtn,
    searchByPageChange,
  };
};

export default useAddSearchBar;
