import { useEffect } from 'react';
import { MangaType } from '@models/manga';
import { useMangaStore } from '@/store/useMangaStore';

function LibraryList() {
  const entries = useMangaStore((state) => state.entries);

  useEffect(() => {
    useMangaStore.getState().refreshEntries();
  }, []);

  return (
    <>
      <div className="flex grow flex-col items-center justify-start p-5 gap-5">
        {entries.length > 0 &&
          entries.map(function (entry: MangaType, i: number) {
            return (
              <div key={i} className="py-0.5">
                <p>MAL ID: {entry.idMal}</p>
                <p>Type: {entry.type}</p>
                <p>Format: {entry.format}</p>
                <p>Status: {entry.status}</p>
                <p>Chapters: {entry.chapters ?? 'N/A'}</p>
                <p>Volumes: {entry.volumes ?? 'N/A'}</p>
                <p>Titles: {entry.titles}</p>
                <p>Genres: {entry.genres}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default LibraryList;
