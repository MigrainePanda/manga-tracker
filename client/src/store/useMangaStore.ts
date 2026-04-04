import { create } from 'zustand';
import { MangaType } from '@shared/types';

interface MangaState {
  entries: MangaType[];
  setEntries: (data: MangaType[]) => void;
  clearEntries: () => void;
}

export const useMangaStore = create<MangaState>((set) => ({
  entries: [],
  setEntries: (data) => set({ entries: data }),
  clearEntries: () => set({ entries: [] }),
}));
