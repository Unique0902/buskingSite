export type PlaylistDataObj = {
  [playlistId: string]: PlaylistData;
};

export type PlaylistData = {
  id: string;
  name: string;
  songs?: {
    [songId: string]: PlaylistSongData;
  };
};

export type PlaylistSongData = {
  artist: string;
  id: string;
  title: string;
};
