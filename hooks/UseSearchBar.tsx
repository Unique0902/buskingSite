import { useState } from 'react';
import { PlaylistSongData, PlaylistSongObj } from '../store/type/playlist';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
const useSearchBar = (
  data: PlaylistSongObj | null,
  setFilteredDataArr: React.Dispatch<React.SetStateAction<PlaylistSongData[]>>
) => {
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [searchedDataArr, setSearchedDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedSearchWord, setSavedSearchWord] = useState<SearchWord | null>(
    null
  );

  const search = () => {
    if (data) {
      setIsLoading(true);
      const wholeSongArrary = Object.values(data);
      if (searchWord.name) {
        if (searchWord.category === '제목') {
          setFilteredDataArr(
            wholeSongArrary.filter((song) =>
              song.title.toLowerCase().includes(searchWord.name)
            )
          );
        } else if (searchWord.category === '가수') {
          setFilteredDataArr(
            wholeSongArrary.filter((song) =>
              song.artist.toLowerCase().includes(searchWord.name)
            )
          );
        }
      } else {
        setFilteredDataArr(wholeSongArrary);
      }
      setSavedSearchWord({ ...searchWord });
      setIsLoading(false);
    }
  };
  const getDataByPageNum = (nowPageNum: number): PlaylistSongData[] => {
    if (!data) {
      return [];
    }
    const wholeDataArrary = Object.values(data);
    const dataToView = wholeDataArrary.slice(
      (nowPageNum - 1) * 6,
      nowPageNum * 6
    );
    return dataToView;
  };

  const searchByPageChange = (pageNum: number) => {
    setIsLoading(true);

    setIsLoading(false);
  };
  return [searchWord, setSearchWord, search] as const;
};

export default useSearchBar;
