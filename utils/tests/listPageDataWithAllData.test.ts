import { describe, expect, it } from '@jest/globals';
import { PlaylistSongData } from '../../store/type/playlist';
import {
  searchSong,
  sliceSongArrByNumPerPage,
} from '../listPageDataWithAllData';

describe('listPageDataWithAllData util function test', () => {
  it('sliceSongArrByNumPerPage test', () => {
    let numPerPage = 2;
    let pageNum = 1;
    const songArr = [
      { title: 'title1', artist: 'artist1' },
      { title: 'title2', artist: 'artist2' },
      { title: 'title3', artist: 'artist3' },
      { title: 'title4', artist: 'artist4' },
      { title: 'title5', artist: 'artist5' },
    ];
    expect(sliceSongArrByNumPerPage(songArr, numPerPage, pageNum)).toEqual([
      { title: 'title1', artist: 'artist1' },
      { title: 'title2', artist: 'artist2' },
    ]);
    pageNum = 2;
    expect(sliceSongArrByNumPerPage(songArr, numPerPage, pageNum)).toEqual([
      { title: 'title3', artist: 'artist3' },
      { title: 'title4', artist: 'artist4' },
    ]);
  });

  it('searchSong util func test', () => {
    const dataArr: PlaylistSongData[] = [
      { artist: 'data1-artist-1', id: 'data1-id', title: 'abcd' },
      { artist: 'data1-artist-2', id: 'data1-id', title: 'data1-title-1' },
      { artist: 'abcd', id: 'data1-id', title: 'data1-title-2' },
      { artist: 'data2-artist', id: 'data2-id', title: 'data2-title' },
      { artist: 'data3-artist', id: 'data3-id', title: 'data3-title' },
    ];
    expect(
      searchSong(dataArr, { name: 'data1-artist', category: '가수' })
    ).toEqual([
      { artist: 'data1-artist-1', id: 'data1-id', title: 'abcd' },
      { artist: 'data1-artist-2', id: 'data1-id', title: 'data1-title-1' },
    ]);
    expect(
      searchSong(dataArr, { name: 'data1-title', category: '제목' })
    ).toEqual([
      { artist: 'data1-artist-2', id: 'data1-id', title: 'data1-title-1' },
      { artist: 'abcd', id: 'data1-id', title: 'data1-title-2' },
    ]);
  });
});
