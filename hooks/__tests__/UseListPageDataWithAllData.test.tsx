import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { PlaylistSongData } from '../../store/type/playlist';
import { UseListPageDataWithAllData } from '../UseListPageDataWithAllData';

describe('UseListPageDataWithAllData custom hook test', () => {
  const dataArr: PlaylistSongData[] = [
    { artist: 'data1-artist', id: 'data1-id', title: 'data1-title' },
    { artist: 'data2-artist', id: 'data2-id', title: 'data2-title' },
    { artist: 'data3-artist', id: 'data3-id', title: 'data3-title' },
  ];
  it('first searchedSongArr equals allDataArr', () => {
    const { result } = renderHook(
      ({ allDataArr, songNumPerPage }) =>
        UseListPageDataWithAllData(allDataArr, songNumPerPage),
      {
        initialProps: {
          allDataArr: dataArr,
          songNumPerPage: 6,
        },
      }
    );
    const { searchedSongArr } = result.current;
    expect(searchedSongArr).toEqual(dataArr);
  });

  it('allDataArr is sliced to viewedSongArr by songNumPerPage', () => {
    const songNumPerPage = 2;
    const { result } = renderHook(
      ({ allDataArr, songNumPerPage }) =>
        UseListPageDataWithAllData(allDataArr, songNumPerPage),
      {
        initialProps: {
          allDataArr: dataArr,
          songNumPerPage: songNumPerPage,
        },
      }
    );
    const { viewedSongArr } = result.current;
    expect(viewedSongArr.length).toBe(songNumPerPage);
    expect(viewedSongArr).toEqual(dataArr.slice(0, songNumPerPage));
  });
});
