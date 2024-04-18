import React, { useEffect, useState } from 'react';
import { calculateTotalPageNum } from '../../utils/calculate';
import PagingBar from '../Table/PagingBar';

interface Props<T> {
  pageDataInform: {
    resultTotalNum: number;
    resultNumPerPage: number;
  };
  pageDataArr: T[];
  renderData: (data: T, index: number, nowPageNum: number) => React.JSX.Element;
  handleChangePage: (pageNum: number) => void;
  renderNoData?: () => React.JSX.Element;
}
// PageNum을 ListPage가 가지면 장점: props 개수가 줄음, 밖에서 pageNum관련해서 처리할것을 handleChangePage 함수로 통일가능
// PageNum을 ListPage가 가지면 단점: 밖에서 pageNum을 참조하고싶음 handleChangePage을 이용해야만함, 밖에서 pageNum을 조작X
// PageNum을 ListPage가 가지면 단점: pageNum을 참조할수있는 순간은 pageNum이 변하는순간뿐임..
const ListPage = <T,>({
  pageDataInform: { resultTotalNum, resultNumPerPage },
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
