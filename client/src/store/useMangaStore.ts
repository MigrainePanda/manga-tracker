import { create } from 'zustand';
import { MangaType } from '@shared/types';
import handleRequest from '@/lib/apiUtils';
interface MangaState {
  entries: MangaType[];
  setEntries: (data: MangaType[]) => void;
  clearEntries: () => void;
  refreshEntries: () => Promise<void>;
}

export const useMangaStore = create<MangaState>((set) => ({
  entries: [],
  setEntries: (data) => set({ entries: data }),
  clearEntries: () => set({ entries: [] }),
  refreshEntries: async () => {
    try {
      const response = await handleRequest('GET', '/manga');
      const parsedData = (response.data as MangaType[]).map((item) => ({
        ...item,
        titles:
          typeof item.titles === 'string'
            ? JSON.parse(item.titles)
            : item.titles,
        genres:
          typeof item.genres === 'string'
            ? JSON.parse(item.genres)
            : item.genres,
      }));
      useMangaStore.getState().setEntries(parsedData);
      console.log('Refreshed');
    } catch {
      console.error('Failed to fetch');
    }
  },
}));
