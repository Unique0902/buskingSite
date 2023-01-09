import { createContext, useContext } from 'react';

const LastFmContext = createContext();

export function LastFmContextProvider({ lastfm, children }) {
  const searchSongByName = (title, pageNum) => {
    return lastfm.searchSongByName(title, pageNum);
  };
  const searchSongByArtist = (artist, pageNum) => {
    return lastfm.searchSongByArtist(artist, pageNum);
  };
  const searchArtist = (artist) => {
    return lastfm.searchArtist(artist);
  };
  const searchTopTrackByCorrectArtist = (mbid) => {
    return lastfm.searchTopTrackByCorrectArtist(mbid);
  };
  const getTopTracks = (pageNum) => {
    return lastfm.getTopTracks(pageNum);
  };

  return (
    <LastFmContext.Provider
      value={{
        searchSongByName,
        searchSongByArtist,
        searchArtist,
        searchTopTrackByCorrectArtist,
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
