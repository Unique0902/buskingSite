import { createContext, useContext } from 'react';

const LastFmContext = createContext();

export function LastFmContextProvider({ lastfm, children }) {
  const searchSongByName = async (title, pageNum) => {
    return lastfm.searchSongByName(title, pageNum);
  };
  const searchSongByArtist = async (artist, pageNum) => {
    return lastfm.searchSongByArtist(artist, pageNum);
  };
  // const searchArtist = async (artist) => {
  //   return lastfm.searchArtist(artist);
  // };
  // const searchTopTrackByCorrectArtist = async (mbid) => {
  //   return lastfm.searchTopTrackByCorrectArtist(mbid);
  // };
  const getTopTracks = async (pageNum) => {
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
