import React, { useEffect, useState } from 'react';
import { calculateTotalPageNum } from '../../utils/calculate';
import PagingBar from '../Table/PagingBar';

interface Props<T> {
  pageDataInform: {
    resultTotalNum: number;
    resultNumPerPage: number;
    totalDataArr: T[];
  };
  pageDataArr: T[];
  renderData: (data: T, index: number, nowPageNum: number) => React.JSX.Element;
  handleChangePage: (pageNum: number) => void;
  renderNoData?: () => React.JSX.Element;
}

const ListPage = <T,>({
  pageDataInform: { resultTotalNum, resultNumPerPage, totalDataArr },
  pageDataArr,
  renderData,
  handleChangePage,
  renderNoData,
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
  useEffect(() => {
    setNowPageNum(1);
  }, [totalDataArr]);
  if (pageDataArr.length > resultNumPerPage)
    throw new Error(
      'pageDataArr length must be same or smaller than resultNumPerPage'
    );

  if (pageDataArr.length === 0) return renderNoData ? renderNoData() : <></>;
  return (
    <ul className='p-1 bg-gray-800 rounded-xl'>
      {pageDataArr.map((data, idx) => renderData(data, idx, nowPageNum))}
      <PagingBar
        totalPageNum={calculateTotalPageNum(resultTotalNum, resultNumPerPage)}
        pageNum={nowPageNum}
        onPagePlus={handlePlusPageNum}
        onPageMinus={handleMinusPageNum}
      />
    </ul>
  );
};

export default ListPage;
