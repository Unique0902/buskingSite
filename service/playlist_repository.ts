import { database } from './firebase';
import { get, onValue, ref, remove, set } from 'firebase/database';
import {
  PlaylistData,
  PlaylistDataObj,
  PlaylistSongData,
} from '../store/type/playlist';

class PlaylistRepository {
  syncPlaylist(
    userId: string,
    onUpdate: (value: PlaylistDataObj | null) => void
  ) {
    const listRef = ref(database, `playlists/${userId}`);
    return onValue(listRef, (snapshot) => {
      const value: PlaylistDataObj | null = snapshot.val();
      onUpdate(value);
    });
  }
  getPlaylists = async (userId: string): Promise<PlaylistDataObj | null> => {
    const listRef = ref(database, `playlists/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
  getPlaylist = async (
    userId: string,
    playlistId: string
  ): Promise<PlaylistData | null> => {
    const listRef = ref(database, `playlists/${userId}/${playlistId}`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
  saveSong = async (
    userId: string,
    playlist: PlaylistData,
    song: PlaylistSongData
  ) => {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    return set(listRef, song);
  };
  makePlaylist = async (userId: string, playlist: PlaylistData) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    return set(listRef, playlist);
  };
  updatePlaylistName = async (
    userId: string,
    playlist: PlaylistData,
    newPlaylistName: string
  ) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/name`);
    return set(listRef, newPlaylistName);
  };
  removeUserPlaylists = async (userId: string) => {
    const listRef = ref(database, `playlists/${userId}/`);
    return remove(listRef);
  };
  removePlaylist = async (userId: string, playlist: PlaylistData) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    return remove(listRef);
  };
  removeSong = async (
    userId: string,
    playlist: PlaylistData,
    song: PlaylistSongData
  ) => {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    return remove(listRef);
  };
}

export default PlaylistRepository;
