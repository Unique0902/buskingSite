import { Unsubscribe } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import PlaylistRepository from '../service/playlist_repository';
import {
  PlaylistData,
  PlaylistDataObj,
  PlaylistSongData,
} from '../store/type/playlist';
import { useAuthContext } from './AuthContext';
import { useUserDataContext } from './UserDataContext';

type Props = {
  playlistRepository: PlaylistRepository;
  children: ReactNode;
};

type ContextProps = {
  playlists: PlaylistDataObj | null;
  nowPlaylist: PlaylistData | null;
  addSongToPlaylist: (title: string, artist: string) => Promise<void>;
  removeNowPlaylist: () => Promise<void>;
  removeSongInPlaylist: (sid: string) => Promise<void>;
  addBasicPlaylist: () => Promise<void>;
  updateNowPlaylistName: (name: string) => Promise<void>;
  addPlaylist: (name: string) => Promise<void>;
  changeNowPlaylist: (id: string) => void;
  syncPlaylist: (
    userId: string,
    onUpdate: (value: PlaylistDataObj) => void
  ) => Unsubscribe;
  getPlaylists: (userId: string) => Promise<PlaylistDataObj | null>;
  getPlaylist: (
    userId: string,
    playlistId: string
  ) => Promise<PlaylistData | null>;
  removeUserPlaylists: (userId: string) => Promise<void>;
};

const PlaylistContext = createContext<ContextProps>({} as ContextProps);

export function PlaylistContextProvider({
  playlistRepository,
  children,
}: Props) {
  const [playlists, setPlaylists] = useState<PlaylistDataObj | null>(null);
  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();

  useEffect(() => {
    if (!uid || !userData) {
      return;
    }
    return playlistRepository.syncPlaylist(
      uid,
      (playlists: PlaylistDataObj | null) => {
        setPlaylists(playlists ? playlists : null);
      }
    );
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

  const addSongToPlaylist = async (title: string, artist: string) => {
    if (!nowPlaylist) {
      alert('플레이리스트가 존재하지않습니다! 추가해주세요!');
      return;
    }
    const songArr: PlaylistSongData[] = nowPlaylist.songs
      ? Object.values(nowPlaylist.songs)
      : [];
    const sameSong = songArr.find(
      (song) => song.title === title && song.artist === artist
    );
    if (sameSong) {
      alert('이미 추가된 노래입니다!');
    } else {
      const song = {
        id: Date.now().toString(),
        title: title,
        artist: artist,
      };
      if (!uid) throw new Error('no uid!!');
      await playlistRepository.saveSong(uid, nowPlaylist, song);
      alert(`${artist}의 ${title}가 추가되었습니다.`);
    }
  };

  //TODO: 이렇게 Error로 처리하는게 맞는지 생각해보기
  const removeNowPlaylist = async () => {
    if (!uid) throw new Error('no uid!!');
    if (!nowPlaylist) throw new Error('no nowPlaylist!!');
    await playlistRepository.removePlaylist(uid, nowPlaylist);
    alert('제거되었습니다.');
  };

  const removeSongInPlaylist = async (sid: string) => {
    if (!nowPlaylist) {
      return;
    }
    if (window.confirm('정말 제거하시겠습니까?')) {
      if (!nowPlaylist) throw new Error('no nowPlaylist!!');
      if (!nowPlaylist.songs) throw new Error('no nowPlaylist.songs!!');
      const songArr: PlaylistSongData[] = Object.values(nowPlaylist.songs);
      const song = songArr.find((song) => song.id === sid);
      if (song) {
        if (!uid) throw new Error('no uid!!');
        await playlistRepository.removeSong(uid, nowPlaylist, song);
        window.alert('제거되었습니다.');
      } else {
        throw new Error('cant remove because no song exists');
      }
    }
  };

  const addBasicPlaylist = async () => {
    const PLAYLIST_BASIC_NAME = 'playlist';
    const playlist = {
      id: Date.now().toString(),
      name: PLAYLIST_BASIC_NAME,
    };
    if (!uid) throw new Error('no uid!!');
    await playlistRepository.makePlaylist(uid, playlist);
    alert('플레이 리스트가 생성되었습니다!');
  };

  const updateNowPlaylistName = async (name: string) => {
    if (!uid) throw new Error('no uid!!');
    if (!nowPlaylist) throw new Error('no nowPlaylist!!');
    return playlistRepository.updatePlaylistName(uid, nowPlaylist, name);
  };

  const addPlaylist = async (name: string) => {
    const playlist = {
      id: Date.now().toString(),
      name,
    };
    setNowPlaylist(playlist);
    if (!uid) throw new Error('no uid!!');
    return playlistRepository.makePlaylist(uid, playlist);
  };

  const changeNowPlaylist = (id: string) => {
    if (!playlists) throw new Error('no playlists!!');
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };

  const syncPlaylist = (
    userId: string,
    onUpdate: (value: PlaylistDataObj) => void
  ) => {
    return playlistRepository.syncPlaylist(userId, onUpdate);
  };

  const getPlaylists = async (userId: string) => {
    return playlistRepository.getPlaylists(userId);
  };
  const getPlaylist = async (userId: string, playlistId: string) => {
    return playlistRepository.getPlaylist(userId, playlistId);
  };

  const removeUserPlaylists = async (userId: string) => {
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
