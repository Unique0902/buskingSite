import React, { ReactNode } from 'react';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import PagingBar from './PagingBar';
import SongAddResult from './SongAddResult';
type Props = {
  results: FmTrackData[] | FmEditedTopTrackData[];
  pageNum: number;
  onSongClick: (title: string, artist: string) => Promise<void>;
  resultNum: number;
  onPagePlus: () => void;
  onPageMinus: () => void;
  children: ReactNode;
};
export default function SongAddTable({
  results,
  pageNum,
  onSongClick,
  resultNum,
  onPagePlus,
  onPageMinus,
  children,
}: Props) {
  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {results && results.length !== 0 && (
          <>
            {results.map(
              (result: FmTrackData | FmEditedTopTrackData, index: number) => (
                <SongAddResult
                  key={index}
                  index={index + 1 + (pageNum - 1) * 6}
                  result={result}
                  handleSongClick={onSongClick}
                >
                  {children}
                </SongAddResult>
              )
            )}
            <PagingBar
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
