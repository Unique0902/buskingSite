import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useEffect } from 'react';
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
    const {
      viewedSongArr,
      handleChangePage,
      handleSearch,
      searchedSongArr,
      setSearchedSongArr,
      savedSearchWord,
    } = result.current;
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

  //TODO: handle함수 테스트할수없는지? 함수의 설계 문제인지?
  // it('change pageNum and viewedArr change', () => {
  //   const { result } = renderHook(
  //     ({ allDataArr, songNumPerPage }) =>
  //       UseListPageDataWithAllData(allDataArr, songNumPerPage),
  //     {
  //       initialProps: {
  //         allDataArr: dataArr,
  //         songNumPerPage: 2,
  //       },
  //     }
  //   );
  //   const { viewedSongArr } = result.current;
  //   expect(viewedSongArr).toEqual(dataArr.slice(1, 2));
  // });
});
