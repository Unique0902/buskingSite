import React, { useState } from 'react';
import ListPage from './ListPage';

interface Props<T> {
  pageDataInform: {
    resultTotalNum: number;
    resultNumPerPage: number;
  };
  pageDataArr: T[];
  renderData: (data: T, index: number) => React.JSX.Element;
  handleChangePage: (pageNum: number) => void;
  renderNoData: () => React.JSX.Element;
}

const ListSearchPage = <T,>({
  pageDataInform,
  pageDataArr,
  renderData,
  handleChangePage,
  renderNoData,
}: Props<T>) => {
  const [searchWord, setSearchWord] = useState({ name: '', category: '' });
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  return (
    <div>
      <ListPage
        pageDataInform={pageDataInform}
        pageDataArr={pageDataArr}
        renderData={renderData}
        handleChangePage={handleChangePage}
        renderNoData={renderNoData}
      />
    </div>
  );
};

export default ListSearchPage;
