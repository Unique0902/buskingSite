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

type DarkModeState = {
  darkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
};

const useStore = create<UserDataState & PlaylistState & DarkModeState>(
  (set) => ({
    bears: 0,
    nowPlaylistId: null,
    darkMode: false,
    setDarkMode: (isDarkMode) => set(() => ({ darkMode: isDarkMode })),
    setNowPlaylistId: (id) => set(() => ({ nowPlaylistId: id })),
    clearNowPlaylistId: () => set(() => ({ nowPlaylistId: null })),
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  })
);

export default useStore;
