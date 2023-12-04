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
  const search = () => {
    if (data) {
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
    }
  };
  return [searchWord, setSearchWord, search] as const;
};

export default useSearchBar;
