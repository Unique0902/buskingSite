import { create } from 'zustand';

type UserDataState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useStore = create<UserDataState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
