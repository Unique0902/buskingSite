import { useState } from 'react';
import { SearchWord } from '../store/type/searchword';

const useAddPagingBar = (
  resultNum: number,
  searchByPageChange: (searchWord: SearchWord, pageNum: number) => void,
  searchWord: SearchWord
) => {
  const [nowPageNum, setNowPageNum] = useState<number>(1);

  const handlePlus = () => {
    if (nowPageNum < resultNum / 6) {
      searchByPageChange(searchWord, nowPageNum + 1);
      setNowPageNum(nowPageNum + 1);
    }
  };
  const handleMinus = () => {
    if (nowPageNum !== 1) {
      searchByPageChange(searchWord, nowPageNum - 1);
      setNowPageNum(nowPageNum - 1);
    }
  };
  return { nowPageNum, setNowPageNum, handlePlus, handleMinus };
};
export default useAddPagingBar;
