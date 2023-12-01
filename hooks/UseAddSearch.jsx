import { useEffect, useState } from 'react';
import { useLastFmContext } from '../context/LastFmContext';

const useAddSearch = (setFilteredDataArr, setResultNum, nowPageNum) => {
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
  const [isLoading, setIsLoading] = useState(false);
  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();

  const search = async () => {
    setIsLoading(true);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const result = await searchSongByName(searchWord.name, nowPageNum);
        console.log(result);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (searchWord.category === '가수') {
        const result = await searchSongByArtist(searchWord.name, nowPageNum);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
    }
    setIsLoading(false);
  };
  const searchTopTrack = async () => {
    setIsLoading(true);
    const result = await getTopTracks(1);
    console.log(result);
    if (result.track) {
      setFilteredDataArr(
        result.track.map((data) => {
          return { ...data, artist: data.artist.name };
        })
      );
      setResultNum(parseInt(result['@attr'].totalPages));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    searchTopTrack();
  }, []);

  return [searchWord, setSearchWord, isLoading, search];
};

export default useAddSearch;
