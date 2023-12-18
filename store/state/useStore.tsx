import { create } from 'zustand';

type UserDataState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

type PlaylistState = {
  nowPlaylistId: string | null;
  setNowPlaylistId: (id: string) => void;
  clearNowPlaylistId: () => void;
};

const useStore = create<UserDataState & PlaylistState>((set) => ({
  bears: 0,
  nowPlaylistId: null,
  setNowPlaylistId: (id) => set(() => ({ nowPlaylistId: id })),
  clearNowPlaylistId: () => set(() => ({ nowPlaylistId: null })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
