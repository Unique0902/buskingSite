import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { lastFmClient } from '../service/lastfm';
import { SimpleSearchFmData } from '../store/type/fm';
import { NewSearchWord } from '../store/type/searchword';

export const UseListPageDataWithFmData = (songNumPerPage: number) => {
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState<NewSearchWord>({
    name: '',
    category: '',
  });

  const { data: fmSearchData } = useQuery({
    queryKey: [
      'fmSongData',
      'pageNum-' + pageNum,
      searchWord.name
        ? searchWord.name + '+' + searchWord.category
        : 'topTracks',
    ],
    queryFn: async (): Promise<SimpleSearchFmData> => {
      if (!searchWord.name) {
        const topTrackData = await lastFmClient.getTopTracks(
          pageNum,
          songNumPerPage
        );
        return {
          totalResultNum: topTrackData['@attr'].total,
          data: topTrackData.track.map((data) => {
            return { title: data.name, artist: data.artist.name };
          }),
        };
      }
      if (searchWord.category === '제목') {
        const trackData = await lastFmClient.searchSongByName(
          searchWord.name,
          pageNum,
          songNumPerPage
        );
        return {
          totalResultNum: trackData['opensearch:totalResults'],
          data: trackData.trackmatches.track.map((data) => {
            return { title: data.name, artist: data.artist };
          }),
        };
      }
      if (searchWord.category === '가수') {
        const trackData = await lastFmClient.searchSongByArtist(
          searchWord.name,
          pageNum,
          songNumPerPage
        );
        return {
          totalResultNum: trackData['opensearch:totalResults'],
          data: trackData.trackmatches.track.map((data) => {
            return { title: data.name, artist: data.artist };
          }),
        };
      }
      throw new Error('invalid searchWord category!');
    },
    staleTime: 1000 * 60 * 2,
  });

  const fmSongArr = fmSearchData
    ? fmSearchData.data.slice(0, songNumPerPage)
    : [];
  const totalResultNum = parseInt(fmSearchData?.totalResultNum || '0');

  const handleSearch = (searchWord: NewSearchWord) => {
    setPageNum(1);
    setSearchWord(searchWord);
  };

  const handleChangePage = (pageNum: number) => {
    setPageNum(pageNum);
  };
  return {
    fmSongArr,
    totalResultNum,
    handleSearch,
    handleChangePage,
    searchWord,
  };
};
