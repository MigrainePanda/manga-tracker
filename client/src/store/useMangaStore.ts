import { create } from 'zustand';
import { MangaType } from '@shared/types';
import handleRequest from '@/lib/apiUtils';
import Fuse from 'fuse.js';

interface MangaState {
  entries: MangaType[];
  filteredEntries: MangaType[];
  fuse: Fuse<MangaType>;
  query: string;

  setEntries: (data: MangaType[]) => void;
  clearEntries: () => void;
  refreshEntries: () => Promise<void>;
  setQuery: (query: string) => void;
}

const FUSE_OPTIONS = {
  keys: ['titles'],
  threshold: 0.3,
};

const parseManga = (item: MangaType): MangaType => ({
  ...item,
  titles:
    typeof item.titles === 'string' ? JSON.parse(item.titles) : item.titles,
  owned_volumes:
    typeof item.owned_volumes === 'string'
      ? JSON.parse(item.owned_volumes)
      : item.owned_volumes,
  genres:
    typeof item.genres === 'string' ? JSON.parse(item.genres) : item.genres,
});

export const useMangaStore = create<MangaState>((set, get) => ({
  entries: [],
  filteredEntries: [],
  fuse: new Fuse<MangaType>([], FUSE_OPTIONS),
  query: '',

  setEntries: (data) => {
    const fuse = new Fuse(data, FUSE_OPTIONS);
    const { query } = get();
    const filteredEntries = query
      ? fuse.search(query, { limit: 20 }).map((r) => r.item)
      : data;
    set({ entries: data, fuse, filteredEntries });
  },

  clearEntries: () =>
    set({
      entries: [],
      filteredEntries: [],
      fuse: new Fuse<MangaType>([], FUSE_OPTIONS),
      query: '',
    }),

  refreshEntries: async () => {
    try {
      const response = await handleRequest('GET', '/manga');
      const parsed = (response.data as MangaType[]).map(parseManga);
      get().setEntries(parsed);
      console.log('Refreshed');
    } catch {
      console.error('Failed to fetch');
    }
  },

  setQuery: (query: string) => {
    const { fuse, entries } = get();
    const filteredEntries = query
      ? fuse.search(query, { limit: 20 }).map((r) => r.item)
      : entries;
    set({ query, filteredEntries });
  },
}));
