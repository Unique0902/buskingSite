import React, { useEffect, useState } from 'react';
import { ApplianceData } from '../../store/type/busking';
import { PlaylistSongData } from '../../store/type/playlist';
import PagingBar from './PagingBar';
type Props = {
  results: PlaylistSongData[] | ApplianceData[];
  renderSongResult: (
    key: number,
    index: number,
    result: PlaylistSongData | ApplianceData
  ) => React.JSX.Element;
};
export default function PrimarySongTable({ results, renderSongResult }: Props) {
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  const handelPlusPage = () => {
    if (nowPageNum < results.length / 6) {
      setNowPageNum((num) => num + 1);
    }
  };
  const handelMinusPage = () => {
    if (nowPageNum !== 1) {
      setNowPageNum((num) => num - 1);
    }
  };
  useEffect(() => {
    if (results && results.length > 0) {
      setNowPageNum(1);
    }
  }, [results]);
  const resultsToView = results.slice((nowPageNum - 1) * 6, nowPageNum * 6);
  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {resultsToView && resultsToView.length !== 0 && (
          <>
            {resultsToView.map(
              (result: PlaylistSongData | ApplianceData, index: number) =>
                renderSongResult(
                  index,
                  index + 1 + (nowPageNum - 1) * 6,
                  result
                )
            )}
            <PagingBar
              resultNum={results.length}
              pageNum={nowPageNum}
              onPagePlus={handelPlusPage}
              onPageMinus={handelMinusPage}
            />
          </>
        )}
        {(!results || results.length === 0) && (
          <>
            <h2 className='my-5 text-2xl font-normal text-center text-white'>
              노래가 존재하지 않습니다.
            </h2>
          </>
        )}
      </ul>
    </section>
  );
}
