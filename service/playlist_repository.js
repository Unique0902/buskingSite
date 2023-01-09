import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class PlaylistRepository {
  syncPlaylist(userId, onUpdate) {
    const listRef = ref(database, `playlists/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });
  }
  saveSong(userId, playlist, song, onUpdate) {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    set(listRef, song);
    onUpdate();
  }
  makePlaylist(userId, playlist) {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    set(listRef, playlist);
  }
  updatePlaylistName(userId, playlist, name) {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/name`);
    set(listRef, name);
  }
  removeUserPlaylists(userId) {
    const listRef = ref(database, `playlists/${userId}/`);
    remove(listRef);
  }
  removePlaylist(userId, playlist, onUpdate) {
    const listRef = ref(database, `playlists/${userId}/${playlist.id}/`);
    remove(listRef, playlist);
    onUpdate();
  }
  removeSong(userId, playlist, song, onUpdate) {
    const listRef = ref(
      database,
      `playlists/${userId}/${playlist.id}/songs/${song.id}`
    );
    remove(listRef, playlist);
    onUpdate();
  }
  updateSong() {}
}

export default PlaylistRepository;
