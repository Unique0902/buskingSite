import { useEffect, useState } from 'react';
import { useLastFmContext } from '../context/LastFmContext';
import { FmTopTrackData, FmTrackData } from '../store/type/fm';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
const useAddSearch = (
  setFilteredDataArr: React.Dispatch<
    React.SetStateAction<FmTrackData[] | FmTopTrackData[]>
  >,
  setResultNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { searchSongByName, searchSongByArtist, getTopTracks } =
    useLastFmContext();

  const search = async (pageNum: number) => {
    setIsLoading(true);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const result = await searchSongByName(searchWord.name, pageNum);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      } else if (searchWord.category === '가수') {
        const result = await searchSongByArtist(searchWord.name, pageNum);
        setFilteredDataArr(result.trackmatches.track);
        setResultNum(parseInt(result['opensearch:totalResults']));
      }
    }
    setIsLoading(false);
  };

  const searchTopTrack = async () => {
    setIsLoading(true);
    const result = await getTopTracks(1);
    if (result.track) {
      setFilteredDataArr(
        result.track.map((data: FmTopTrackData) => {
          return { ...data, artist: data.artist.name };
        })
      );
      setResultNum(parseInt(result['@attr'].total));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchTopTrack();
  }, []);

  return [searchWord, setSearchWord, isLoading, search] as const;
};

export default useAddSearch;
