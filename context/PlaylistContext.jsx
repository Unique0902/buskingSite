import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

const PlaylistContext = createContext();

export function PlaylistContextProvider({ playlistRepository, children }) {
  const [playlists, setPlaylists] = useState(null);
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const [nowPlaylistId, setNowPlaylistId] = useState(null);
  const { uid } = useAuthContext();

  useEffect(() => {
    if (!uid) {
      return;
    }
    playlistRepository.syncPlaylist(uid, (playlists) => {
      setPlaylists(playlists ? playlists : null);
    });
  }, [uid]);

  useEffect(() => {
    if (playlists) {
      if (nowPlaylistId && playlists[nowPlaylistId]) {
        setNowPlaylist(playlists[nowPlaylistId]);
      } else {
        setNowPlaylist(Object.values(playlists)[0]);
        setNowPlaylistId(Object.values(playlists)[0].id);
      }
    } else {
      setNowPlaylist(null);
    }
  }, [playlists]);

  const addSongToPlaylist = (title, artist) => {
    if (nowPlaylist.length === 0) {
      alert('플레이리스트가 존재하지않습니다! 추가해주세요!');
      return;
    }
    const songArr = nowPlaylist.songs ? Object.values(nowPlaylist.songs) : [];
    const sameSong = songArr.find(
      (song) => song.title === title && song.artist === artist
    );
    if (sameSong) {
      alert('이미 추가된 노래입니다!');
    } else {
      const song = {
        id: Date.now(),
        title: title,
        artist: artist,
      };
      playlistRepository.saveSong(uid, nowPlaylist, song, () => {
        alert(`${artist}의 ${title}가 추가되었습니다.`);
      });
    }
  };

  const removeNowPlaylist = () => {
    playlistRepository.removePlaylist(uid, nowPlaylist, () => {
      alert('제거되었습니다.');
    });
  };

  const removeSongInPlaylist = (sid) => {
    if (!nowPlaylist) {
      return;
    }
    if (window.confirm('정말 제거하시겠습니까?')) {
      const song = Object.values(nowPlaylist.songs).find(
        (song) => song.id === sid
      );
      if (song) {
        setNowPlaylistId(null);
        playlistRepository.removeSong(uid, nowPlaylist, song, () => {
          window.alert('제거되었습니다.');
        });
      } else {
        console.log('노래없음');
      }
    }
  };

  const addBasicPlaylist = () => {
    const playlist = {
      id: Date.now(),
      name: 'playlist',
    };
    setNowPlaylistId(playlist.id);
    playlistRepository.makePlaylist(uid, playlist);
  };
  const updateNowPlaylistName = (name) => {
    playlistRepository.updatePlaylistName(uid, nowPlaylist, name);
  };

  const addPlaylist = (name) => {
    const playlist = {
      id: Date.now(),
      name,
    };
    setNowPlaylistId(playlist.id);
    playlistRepository.makePlaylist(uid, playlist);
  };

  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
      setNowPlaylistId(parseInt(id));
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        nowPlaylist,
        nowPlaylistId,
        addSongToPlaylist,
        removeNowPlaylist,
        removeSongInPlaylist,
        addBasicPlaylist,
        updateNowPlaylistName,
        addPlaylist,
        changeNowPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}
