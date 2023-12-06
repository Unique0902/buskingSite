import { useEffect, useState } from 'react';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
const useSearch = <T extends PlaylistSongData | ApplianceData>(
  pureDataArr: T[]
) => {
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [searchedDataArr, setSearchedDataArr] = useState<T[]>([]);
  const [viewedDataArr, setViewedDataArr] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const [nowPageNum, setNowPageNum] = useState<number>(1);
  useEffect(() => {
    setNowPageNum(1);
  }, [pureDataArr]);

  const handlePlus = () => {
    if (nowPageNum < pureDataArr.length / 6) {
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

  const handleSearchBySearchWord = () => {
    setNowPageNum(1);
    searchBySearchWord();
  };

  const handleSearchBtnClick = () => {
    if (searchWord.category) {
      handleSearchBySearchWord();
    }
  };

  return [
    {
      searchWord,
      setSearchWord,
      isLoading,
      viewedDataArr,
      nowPageNum,
      handlePlus,
      handleMinus,
      handleSearchBtnClick,
    },
  ] as const;
};

export default useSearch;
