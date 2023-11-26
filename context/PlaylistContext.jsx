import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useUserDataContext } from './UserDataContext';

const PlaylistContext = createContext();

export function PlaylistContextProvider({ playlistRepository, children }) {
  const [playlists, setPlaylists] = useState(null);
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();

  useEffect(() => {
    if (!uid || !userData) {
      return;
    }
    return playlistRepository.syncPlaylist(uid, (playlists) => {
      setPlaylists(playlists ? playlists : null);
    });
  }, [uid, userData]);

  useEffect(() => {
    if (playlists) {
      if (nowPlaylist && playlists[nowPlaylist.id]) {
        setNowPlaylist(playlists[nowPlaylist.id]);
      } else {
        setNowPlaylist(Object.values(playlists)[0]);
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
    setNowPlaylist(playlist);
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
    setNowPlaylist(playlist);
    playlistRepository.makePlaylist(uid, playlist);
  };

  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };

  const syncPlaylist = (userId, onUpdate) => {
    playlistRepository.syncPlaylist(userId, onUpdate);
  };

  const getPlaylists = async (userId) => {
    return playlistRepository.getPlaylists(userId);
  };
  const getPlaylist = async (userId, playlistId) => {
    return playlistRepository.getPlaylist(userId, playlistId);
  };

  const removeUserPlaylists = async (userId) => {
    return playlistRepository.removeUserPlaylists(userId);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        nowPlaylist,
        addSongToPlaylist,
        removeNowPlaylist,
        removeSongInPlaylist,
        addBasicPlaylist,
        updateNowPlaylistName,
        addPlaylist,
        changeNowPlaylist,
        syncPlaylist,
        getPlaylists,
        getPlaylist,
        removeUserPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}
