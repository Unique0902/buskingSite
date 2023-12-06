import React, { ReactNode, useEffect, useState } from 'react';
import { ApplianceData } from '../../store/type/busking';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import { PlaylistSongData } from '../../store/type/playlist';
import PagingBar from './PagingBar';

type Props<T> = {
  viewdSongArr: T[];
  renderSongResult: (index: number, result: T) => React.JSX.Element;
  nowPageNum: number;
  children: ReactNode;
};

export default function SongTable<
  T extends
    | PlaylistSongData
    | ApplianceData
    | FmTrackData
    | FmEditedTopTrackData
>({ viewdSongArr, renderSongResult, nowPageNum, children }: Props<T>) {
  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {viewdSongArr.length !== 0 && (
          <>
            {viewdSongArr.map((result, index) =>
              renderSongResult(index + 1 + (nowPageNum - 1) * 6, result)
            )}

            {children}
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

SongTable.PagingBar = PagingBar;
