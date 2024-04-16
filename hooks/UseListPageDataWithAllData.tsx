import { useEffect, useState } from 'react';

export const UseListPageDataWithAllData = <T,>(
  allDataArr: T[],
  songNumPerPage: number
) => {
  const [viewedSongArr, setViewedSongArr] = useState<T[]>([]);
  const handleViewedSongArrByPageNum = (pageNum: number) =>
    setViewedSongArr(
      [...allDataArr].slice(
        (pageNum - 1) * songNumPerPage,
        pageNum * songNumPerPage
      )
    );
  useEffect(() => {
    allDataArr.length > songNumPerPage
      ? setViewedSongArr([...allDataArr].slice(0, songNumPerPage))
      : setViewedSongArr([...allDataArr]);
  }, [allDataArr]);

  return { viewedSongArr, handleViewedSongArrByPageNum };
};
