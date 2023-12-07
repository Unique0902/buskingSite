import { useState } from 'react';

const useAddPagingBar = (
  resultNum: number,
  searchByPageChange: (pageNum: number) => void
) => {
  const [nowPageNum, setNowPageNum] = useState<number>(1);

  const handlePlus = () => {
    if (nowPageNum < resultNum / 6) {
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
  return { nowPageNum, setNowPageNum, handlePlus, handleMinus };
};
export default useAddPagingBar;
