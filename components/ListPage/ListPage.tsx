import React, { useState } from 'react';
import { calculateTotalPageNum } from '../../utils/calculate';
import PagingBar from '../Table/PagingBar';

interface Props<T> {
  resultTotalNum: number;
  resultNumPerPage: number;
  pageDataArr: T[];
  renderData: (data: T, index: number) => React.JSX.Element;
  // handleChangePage: (pageNum: number) => void;
}

const ListPage = <T,>({
  resultTotalNum,
  resultNumPerPage,
  pageDataArr,
  renderData,
}: // handleChangePage,
Props<T>) => {
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  const handlePlusPageNum = () => {};
  const handleMinusPageNum = () => {};
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
