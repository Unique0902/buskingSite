import React, { useState } from 'react';
import { calculateTotalPageNum } from '../../utils/calculate';
import PagingBar from '../Table/PagingBar';

interface Props<T> {
  pageDataInform: {
    resultTotalNum: number;
    resultNumPerPage: number;
  };
  pageDataArr: T[];
  renderData: (data: T, index: number) => React.JSX.Element;
  handleChangePage: (pageNum: number) => void;
}

const ListPage = <T,>({
  pageDataInform: { resultTotalNum, resultNumPerPage },
  pageDataArr,
  renderData,
  handleChangePage,
}: Props<T>) => {
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  const totalPageNum = calculateTotalPageNum(resultTotalNum, resultNumPerPage);
  const handlePlusPageNum = (nowPageNum: number, totalPageNum: number) => {
    if (nowPageNum < totalPageNum) {
      setNowPageNum((prev) => {
        handleChangePage(prev + 1);
        return prev + 1;
      });
    }
  };
  const handleMinusPageNum = (nowPageNum: number) => {
    if (nowPageNum > 1) {
      setNowPageNum((prev) => {
        handleChangePage(prev - 1);
        return prev - 1;
      });
    }
  };
  return (
    <>
      {pageDataArr.map((data, idx) => renderData(data, idx))}
      <PagingBar
        totalPageNum={totalPageNum}
        pageNum={nowPageNum}
        onPagePlus={() => handlePlusPageNum(nowPageNum, totalPageNum)}
        onPageMinus={() => handleMinusPageNum(nowPageNum)}
      />
    </>
  );
};

export default ListPage;
