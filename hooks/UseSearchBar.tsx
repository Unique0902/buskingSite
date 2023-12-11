import React, { useEffect, useState } from 'react';

import { songSearchWordCategories } from '../store/data/CategoryTypes';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';
import { SearchWord } from '../store/type/searchword';

const useSearchBar = <T extends PlaylistSongData | ApplianceData>(
  pureDataArr: T[],
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: songSearchWordCategories[0],
  });
  const [searchedDataArr, setSearchedDataArr] = useState<T[]>([]);
  const [viewedDataArr, setViewedDataArr] = useState<T[]>([]);

  useEffect(() => {
    if (!searchWord.name) {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      setSearchedDataArr(pureDataArr);
      setViewedDataArr(getDataByPageNum(1, pureDataArr));
      setIsLoading(false);
    }
  }, [pureDataArr]);

  const searchBySearchWord = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const filterdDataArr = pureDataArr.filter((song) =>
          song.title.toLowerCase().includes(searchWord.name)
        );
        setSearchedDataArr(filterdDataArr);
        setViewedDataArr(getDataByPageNum(1, filterdDataArr));
        //페이지num 1로 초기화하기
      } else if (searchWord.category === '가수') {
        const filterdDataArr = pureDataArr.filter((song) =>
          song.artist.toLowerCase().includes(searchWord.name)
        );
        setSearchedDataArr(filterdDataArr);
        setViewedDataArr(getDataByPageNum(1, filterdDataArr));
      } else {
        throw new Error('not exist song searchWord category!');
      }
    } else {
      setSearchedDataArr(pureDataArr);
      setViewedDataArr(getDataByPageNum(1, pureDataArr));
    }
    setIsLoading(false);
  };

  const getDataByPageNum = (pageNum: number, dataArr: T[]): T[] => {
    return dataArr.slice((pageNum - 1) * 6, pageNum * 6);
  };

  const searchByPageChange = (pageNum: number) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setViewedDataArr(getDataByPageNum(pageNum, searchedDataArr));
    setIsLoading(false);
  };

  return {
    searchWord,
    setSearchWord,
    viewedDataArr,
    searchBySearchWord,
    searchByPageChange,
  };
};

export default useSearchBar;
