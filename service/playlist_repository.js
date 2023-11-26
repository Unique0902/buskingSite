import { database } from './firebase';
import { get, onValue, ref, remove, set } from 'firebase/database';

class PlaylistRepository {
  syncPlaylist(userId, onUpdate) {
    const listRef = ref(database, `playlists/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });
  }
  getPlaylists = async (userId) => {
    const listRef = ref(database, `playlists/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
  getPlaylist = async (userId, playlistId) => {
    const listRef = ref(database, `playlists/${userId}/${playlistId}`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
  saveSong = async (userId, playlist, song) => {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    return set(listRef, song);
  };
  makePlaylist = async (userId, playlist) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    return set(listRef, playlist);
  };
  updatePlaylistName = async (userId, playlist, name) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/name`);
    return set(listRef, name);
  };
  removeUserPlaylists = async (userId) => {
    const listRef = ref(database, `playlists/${userId}/`);
    return remove(listRef);
  };
  removePlaylist = async (userId, playlist) => {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    return remove(listRef, playlist);
  };
  removeSong = async (userId, playlist, song) => {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    return remove(listRef, playlist);
  };
  updateSong() {}
}

export default PlaylistRepository;
