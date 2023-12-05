import React, { useEffect, useState } from 'react';
import { ApplianceData } from '../../store/type/busking';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import { PlaylistSongData } from '../../store/type/playlist';
import PagingBar from './PagingBar';

type Props = {
  viewdSongArr:
    | PlaylistSongData[]
    | ApplianceData[]
    | FmTrackData[]
    | FmEditedTopTrackData[];
  renderSongResult: (
    key: number,
    index: number,
    result:
      | PlaylistSongData
      | ApplianceData
      | FmTrackData
      | FmEditedTopTrackData
  ) => React.JSX.Element;
  nowPageNum: number;
  resultNum: number;
  onPagePlus: () => void;
  onPageMinus: () => void;
};

export default function SongTable({
  viewdSongArr,
  renderSongResult,
  nowPageNum,
  resultNum,
  onPagePlus,
  onPageMinus,
}: Props) {
  const handlePlusPage = () => {
    onPagePlus();
  };
  const handleMinusPage = () => {
    onPageMinus();
  };

  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {viewdSongArr.length !== 0 && (
          <>
            {viewdSongArr.map((result, index) =>
              renderSongResult(index, index + 1 + (nowPageNum - 1) * 6, result)
            )}
            <PagingBar
              resultNum={resultNum}
              pageNum={nowPageNum}
              onPagePlus={handlePlusPage}
              onPageMinus={handleMinusPage}
            />
          </>
        )}
        {viewdSongArr.length === 0 && (
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
