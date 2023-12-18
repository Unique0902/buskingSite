import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PlaylistRepository from '../service/playlist_repository';
import useStore from '../store/state/useStore';
import { PlaylistSongData } from '../store/type/playlist';

const playlistRepository = new PlaylistRepository();

export function usePlaylist(uid: string | undefined) {
  const queryClient = useQueryClient();
  const nowPlaylistId = useStore((state) => state.nowPlaylistId);
  const setNowPlaylistId = useStore((state) => state.setNowPlaylistId);
  const clearNowPlaylistId = useStore((state) => state.clearNowPlaylistId);
  const playlistQuery = useQuery({
    queryKey: [uid, 'playlistData'],
    queryFn: () => playlistRepository.getPlaylists(uid as string),
    staleTime: 1000 * 60 * 2,
    enabled: !!uid,
  });

  const { data: playlistData } = playlistQuery;

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

  if (playlistData && nowPlaylistId && !playlistData[nowPlaylistId]) {
    clearNowPlaylistId();
  }

  const nowPlaylist = playlistData
    ? nowPlaylistId
      ? playlistData[nowPlaylistId]
      : Object.values(playlistData)[0]
    : null;

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
    setNowPlaylistId(playlist.id);
    if (!uid) throw new Error('no uid!!');
    playlistDataMutation.mutate({
      mutationFunction: () => playlistRepository.makePlaylist(uid, playlist),
    });
  };

  const changeNowPlaylist = (id: string) => {
    if (!playlistData) throw new Error('no playlists!!');
    if (playlistData[id]) {
      setNowPlaylistId(id);
    }
  };

  const removeUserPlaylists = (userId: string) => {
    playlistDataMutation.mutate({
      mutationFunction: () => playlistRepository.removeUserPlaylists(userId),
    });
  };

  return {
    playlistQuery,
    addSongToPlaylist,
    nowPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    editSongInPlaylist,
    addBasicPlaylist,
    updateNowPlaylistName,
    addPlaylist,
    changeNowPlaylist,
    removeUserPlaylists,
  };
}
