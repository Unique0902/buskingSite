import React from 'react';
import PageNumScreen from '../PageNumScreen';
import SongAddResult from './SongAddResult';

export default function SongAddTable({
  results,
  pageNum,
  onSongClick,
  resultNum,
  onPagePlus,
  onPageMinus,
  children,
}) {
  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {results && results.length !== 0 && (
          <>
            {results.map((result) => (
              <SongAddResult
                key={results.indexOf(result)}
                index={results.indexOf(result) + 1 + (pageNum - 1) * 6}
                result={result}
                handleSongClick={onSongClick}
              >
                {children}
              </SongAddResult>
            ))}
            <PageNumScreen
              resultNum={resultNum}
              pageNum={pageNum}
              onPagePlus={onPagePlus}
              onPageMinus={onPageMinus}
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