import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

import { useAuthContext } from './AuthContext';
import PlaylistRepository from '../service/playlist_repository';
import {
  PlaylistData,
  PlaylistDataObj,
  PlaylistSongData,
} from '../store/type/playlist';

type Props = {
  playlistRepository: PlaylistRepository;
  children: ReactNode;
};

type ContextProps = {
  playlistQueryResult: UseQueryResult<PlaylistDataObj | null, Error>;
  nowPlaylist: PlaylistData | null;
  addSongToPlaylist: (title: string, artist: string) => void;
  editSongInPlaylist: (
    sid: string,
    editData: { title: string; artist: string }
  ) => void;
  removeNowPlaylist: () => void;
  removeSongInPlaylist: (sid: string) => void;
  addBasicPlaylist: () => void;
  updateNowPlaylistName: (name: string) => void;
  addPlaylist: (name: string) => void;
  changeNowPlaylist: (id: string) => void;
  removeUserPlaylists: (userId: string) => void;
};

const PlaylistContext = createContext<ContextProps>({} as ContextProps);

export function PlaylistContextProvider({
  playlistRepository,
  children,
}: Props) {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();
  const playlistQueryResult = useQuery({
    // key에다가 uid를 넣어주어야할까? <<당연..
    queryKey: [uid, 'playlistData'],
    queryFn: () => playlistRepository.getPlaylists(uid as string),
    staleTime: 1000 * 60 * 2,
    enabled: !!uid,
  });

  const { data: playlistData } = playlistQueryResult;

  const playlistDataMutation = useMutation({
    mutationFn: ({
      mutationFunction,
    }: {
      mutationFunction: () => Promise<void>;
    }) => mutationFunction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [uid, 'playlistData'],
        // refetchType: 'all', 언마운트 되었을때도 revalidate 진행되는 option
      });
    },
  });

  const [nowPlaylist, setNowPlaylist] = useState<PlaylistData | null>(null);

  useEffect(() => {
    if (playlistData) {
      if (nowPlaylist && playlistData[nowPlaylist.id]) {
        setNowPlaylist(playlistData[nowPlaylist.id]);
      } else {
        setNowPlaylist(Object.values(playlistData)[0]);
      }
    } else {
      setNowPlaylist(null);
    }
  }, [playlistData]);

  const addSongToPlaylist = (title: string, artist: string) => {
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
      playlistDataMutation.mutate({
        mutationFunction: () =>
          playlistRepository.saveSong(uid, nowPlaylist, song),
      });
      alert(`${artist}의 ${title}가 추가되었습니다.`);
    }
  };

  const removeNowPlaylist = () => {
    if (!uid) throw new Error('no uid!!');
    if (!nowPlaylist) throw new Error('no nowPlaylist!!');
    playlistDataMutation.mutate({
      mutationFunction: () =>
        playlistRepository.removePlaylist(uid, nowPlaylist),
    });
    alert('제거되었습니다.');
  };

  const removeSongInPlaylist = (sid: string) => {
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
        playlistDataMutation.mutate({
          mutationFunction: () =>
            playlistRepository.removeSong(uid, nowPlaylist, song),
        });
        window.alert('제거되었습니다.');
      } else {
        throw new Error('cant remove because no song exists');
      }
    }
  };

  const editSongInPlaylist = (
    sid: string,
    editData: { title: string; artist: string }
  ) => {
    if (!uid) throw new Error('no uid!!');
    if (!nowPlaylist) throw new Error('no nowPlaylist!!');
    if (!nowPlaylist.songs) throw new Error('no nowPlaylist.songs!!');
    if (!editData.title || !editData.artist) {
      throw new Error('no editData!!');
    }
    const songArr: PlaylistSongData[] = Object.values(nowPlaylist.songs);
    const song = songArr.find((song) => song.id === sid);
    const editedSong = { ...editData, id: sid };
    if (song) {
      playlistDataMutation.mutate({
        mutationFunction: () =>
          playlistRepository.editSong(uid, nowPlaylist, editedSong),
      });
      window.alert('수정되었습니다.');
    } else {
      throw new Error('cant edit song because no song exists');
    }
  };

  const addBasicPlaylist = () => {
    const PLAYLIST_BASIC_NAME = 'playlist';
    const playlist = {
      id: Date.now().toString(),
      name: PLAYLIST_BASIC_NAME,
    };
    if (!uid) throw new Error('no uid!!');
    playlistDataMutation.mutate({
      mutationFunction: () => playlistRepository.makePlaylist(uid, playlist),
    });
    alert('플레이 리스트가 생성되었습니다!');
  };

  const updateNowPlaylistName = (name: string) => {
    if (!uid) throw new Error('no uid!!');
    if (!nowPlaylist) throw new Error('no nowPlaylist!!');
    playlistDataMutation.mutate({
      mutationFunction: () =>
        playlistRepository.updatePlaylistName(uid, nowPlaylist, name),
    });
  };

  const addPlaylist = (name: string) => {
    const playlist = {
      id: Date.now().toString(),
      name,
    };
    setNowPlaylist(playlist);
    if (!uid) throw new Error('no uid!!');
    playlistDataMutation.mutate({
      mutationFunction: () => playlistRepository.makePlaylist(uid, playlist),
    });
  };

  const changeNowPlaylist = (id: string) => {
    if (!playlistData) throw new Error('no playlists!!');
    if (playlistData[id]) {
      setNowPlaylist(playlistData[id]);
    }
  };

  const removeUserPlaylists = (userId: string) => {
    playlistDataMutation.mutate({
      mutationFunction: () => playlistRepository.removeUserPlaylists(userId),
    });
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlistQueryResult,
        nowPlaylist,
        addSongToPlaylist,
        removeNowPlaylist,
        editSongInPlaylist,
        removeSongInPlaylist,
        addBasicPlaylist,
        updateNowPlaylistName,
        addPlaylist,
        changeNowPlaylist,
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
