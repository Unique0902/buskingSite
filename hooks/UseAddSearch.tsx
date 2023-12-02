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
const useAddSearch = (
  setFilteredDataArr: React.Dispatch<
    React.SetStateAction<FmTrackData[] | FmEditedTopTrackData[]>
  >,
  setResultNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTopTrackTime, setIsTopTrackTime] = useState<boolean>(true);
  const [savedSearchWord, setSavedSearchWord] = useState<SearchWord | null>(
    null
  );
  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();

  const searchBySearchBtn = async () => {
    setIsLoading(true);
    setIsTopTrackTime(false);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const result = await searchSongByName(searchWord.name, 1);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (searchWord.category === '가수') {
        const result = await searchSongByArtist(searchWord.name, 1);
        setFilteredDataArr(result.trackmatches.track);
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
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (savedSearchWord.category === '가수') {
        const result = await searchSongByArtist(savedSearchWord.name, pageNum);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
    }
    setIsLoading(false);
  };

  const searchTopTrack = async (pageNum: number) => {
    setIsLoading(true);
    const result = await getTopTracks(pageNum);
    if (result.track) {
      setFilteredDataArr(
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

  return [
    searchWord,
    setSearchWord,
    isLoading,
    searchBySearchBtn,
    searchByPageChange,
  ] as const;
};

export default useAddSearch;
