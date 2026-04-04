import { useEffect } from 'react';
import { MangaType } from '@models/manga';
import { useMangaStore } from '@/store/useMangaStore';
import LibraryListEntry from './library-list-entry';

function LibraryList() {
  const entries = useMangaStore((state) => state.entries);

  useEffect(() => {
    useMangaStore.getState().refreshEntries();
  }, []);

  return (
    <>
      <div className="flex flex-col p-5 gap-7">
        <h1>Library</h1>
        <div className="flex grow flex-col items-start justify-start gap-5">
          {entries.length > 0 &&
            entries.map(function (entry: MangaType, i: number) {
              return <LibraryListEntry entry={entry} key={i} />;
            })}
        </div>
      </div>
    </>
  );
}

export default LibraryList;
