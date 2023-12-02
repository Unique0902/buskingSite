import { createContext, ReactNode, useContext } from 'react';
import Lastfm from '../service/lastfm';

type Props = {
  lastfm: Lastfm;
  children: ReactNode;
};

const LastFmContext = createContext(undefined);

export function LastFmContextProvider({ lastfm, children }: Props) {
  const searchSongByName = async (title: string, pageNum: number) => {
    return lastfm.searchSongByName(title, pageNum);
  };
  const searchSongByArtist = async (artist: string, pageNum: number) => {
    return lastfm.searchSongByArtist(artist, pageNum);
  };
  // const searchArtist = async (artist) => {
  //   return lastfm.searchArtist(artist);
  // };
  // const searchTopTrackByCorrectArtist = async (mbid) => {
  //   return lastfm.searchTopTrackByCorrectArtist(mbid);
  // };
  const getTopTracks = async (pageNum: number) => {
    return lastfm.getTopTracks(pageNum);
  };

  return (
    <LastFmContext.Provider
      value={{
        searchSongByName,
        searchSongByArtist,
        getTopTracks,
      }}
    >
      {children}
    </LastFmContext.Provider>
  );
}

export function useLastFmContext() {
  return useContext(LastFmContext);
}
