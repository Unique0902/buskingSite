import { useEffect, useState } from 'react';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';

const usePagingBar = <T extends PlaylistSongData | ApplianceData>(
  pureDataArr: T[],
  searchByPageChange: (pageNum: number) => void
) => {
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
  return { nowPageNum, setNowPageNum, handlePlus, handleMinus };
};
export default usePagingBar;
