import React from 'react';
import PageNumScreen from './PageNumScreen';
import SearchResults from './SearchResults';

export default function SongTable({
  isSearch,
  results,
  pageNum,
  btnText,
  onSongClick,
  resultNum,
  onPagePlus,
  onPageMinus,
}) {
  return (
    <section className='w-full'>
      <ul className='bg-gray-800 rounded-xl p-1'>
        {results && results.length !== 0 && (
          <>
            <SearchResults
              isSearch={isSearch}
              results={results}
              pageNum={pageNum}
              btnText={btnText}
              onSongClick={onSongClick}
            />
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
            <h2 className='text-white font-normal text-center my-5 text-2xl font-sans'>
              노래가 존재하지 않습니다.
            </h2>
          </>
        )}
      </ul>
    </section>
  );
}
