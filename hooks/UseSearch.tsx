import { useState } from 'react';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';
import usePagingBar from './UsePagingBar';
import useSearchBar from './UseSearchBar';

const useSearch = <T extends PlaylistSongData | ApplianceData>(
  pureDataArr: T[]
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    searchWord,
    setSearchWord,
    viewedDataArr,
    searchByPageChange,
    searchBySearchWord,
  } = useSearchBar<T>(pureDataArr, isLoading, setIsLoading);

  const { nowPageNum, setNowPageNum, handlePlus, handleMinus } =
    usePagingBar<T>(pureDataArr, searchByPageChange);

  const handleSearchBtnClick = () => {
    if (searchWord.category) {
      setNowPageNum(1);
      searchBySearchWord();
    }
  };

  return {
    searchWord,
    setSearchWord,
    isLoading,
    viewedDataArr,
    nowPageNum,
    handlePlus,
    handleMinus,
    handleSearchBtnClick,
  };
};

export default useSearch;
