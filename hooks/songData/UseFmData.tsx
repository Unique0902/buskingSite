import { useQuery } from '@tanstack/react-query';

import { lastFmClient } from '../../service/lastfm';

const useFmData = () => {
  const fmService = lastFmClient;
  const searchSongByName = (title: string, pageNum: number) => {
    return useQuery({
      queryKey: ['searchSongByName', title, pageNum],
      queryFn: () => fmService.searchSongByName(title, pageNum),
    });
  };
  const searchSongByArtist = (artist: string, pageNum: number) => {
    return useQuery({
      queryKey: ['searchSongByArtist', artist, pageNum],
      queryFn: () => fmService.searchSongByArtist(artist, pageNum),
    });
  };
  const getTopTracks = (pageNum: number) => {
    return useQuery({
      queryKey: ['getTopTracks', pageNum],
      queryFn: () => fmService.getTopTracks(pageNum),
    });
  };
  return { searchSongByName, searchSongByArtist, getTopTracks };
};
export default useFmData;
