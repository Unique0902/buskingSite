import React, { useEffect, useState } from 'react';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';

interface Props {
  pureDataArr: PlaylistSongData[] | ApplianceData[];
  resultNum: number;
  searchByPageChange: (pageNum: number) => Promise<void>;
}

const UseTable = ({ pureDataArr, resultNum, searchByPageChange }: Props) => {
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  useEffect(() => {
    setNowPageNum(1);
  }, [pureDataArr]);
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
  return [nowPageNum, setNowPageNum, handlePlus, handleMinus] as const;
};

export default UseTable;
