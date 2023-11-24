import React, { useEffect, useState } from 'react';
import PageNumScreen from '../PageNumScreen';
import PrimarySongResult from './PrimarySongResult';

export default function PrimarySongTable({
  results,
  handleClickResult,
  children,
}) {
  const [nowPageNum, setNowPageNum] = useState(1);
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
        {results && results.length !== 0 && (
          <>
            {resultsToView.map((result) => (
              <PrimarySongResult
                key={resultsToView.indexOf(result)}
                index={resultsToView.indexOf(result) + 1 + (nowPageNum - 1) * 6}
                result={result}
                handleSongClick={handleClickResult}
              >
                {children}
              </PrimarySongResult>
            ))}
            <PageNumScreen
              resultNum={results.length}
              pageNum={nowPageNum}
              onPagePlus={handelPlusPage}
              onPageMinus={handelMinusPage}
            />
          </>
        )}
        {(!results || results.length === 0) && (
          <>
            <h2 className='my-5 font-sans text-2xl font-normal text-center text-white'>
              노래가 존재하지 않습니다.
            </h2>
          </>
        )}
      </ul>
    </section>
  );
}
