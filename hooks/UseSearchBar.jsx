import { useState } from 'react';

const useSearchBar = (data, setFilteredDataArr) => {
  const [searchWord, setSearchWord] = useState({ name: '', category: '제목' });
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
  return [searchWord, setSearchWord, search];
};

export default useSearchBar;
