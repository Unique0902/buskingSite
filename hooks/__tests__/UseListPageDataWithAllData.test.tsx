import { describe, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { UseListPageDataWithAllData } from '../UseListPageDataWithAllData';

describe('UseListPageDataWithAllData custom hook test', () => {
  it('basic', () => {
    const { result } = renderHook(
      ({ allDataArr, songNumPerPage }) =>
        UseListPageDataWithAllData(allDataArr, songNumPerPage),
      {
        initialProps: {
          allDataArr: [
            { artist: '', id: '', title: '' },
            { artist: '', id: '', title: '' },
            { artist: '', id: '', title: '' },
          ],
          songNumPerPage: 6,
        },
      }
    );
    const {
      viewedSongArr,
      handleViewedSongArrByPageNum,
      handleSearch,
      searchedSongArr,
      setSearchedSongArr,
      savedSearchWord,
    } = result.current;
  });
});
