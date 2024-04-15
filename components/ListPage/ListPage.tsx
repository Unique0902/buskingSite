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
  const handlePlusPageNum = () => {
    setNowPageNum((prev) => {
      handleChangePage(prev + 1);
      return prev + 1;
    });
  };
  const handleMinusPageNum = () => {
    setNowPageNum((prev) => {
      handleChangePage(prev - 1);
      return prev - 1;
    });
  };
  if (pageDataArr.length > resultNumPerPage)
    throw new Error(
      'pageDataArr length must be same or smaller than resultNumPerPage'
    );
  return (
    <>
      {pageDataArr.map((data, idx) => renderData(data, idx))}
      <PagingBar
        totalPageNum={calculateTotalPageNum(resultTotalNum, resultNumPerPage)}
        pageNum={nowPageNum}
        onPagePlus={handlePlusPageNum}
        onPageMinus={handleMinusPageNum}
      />
    </>
  );
};

export default ListPage;
