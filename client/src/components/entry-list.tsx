import { MangaType } from '@models/manga';

type EntryListProps = {
  entries: MangaType[];
};

const EntryList = ({ entries }: EntryListProps) => {
  return (
    <>
      <div className="">
        {entries.length > 0 &&
          entries.map(function (entry: MangaType, i: number) {
            return (
              <div key={i} className="py-0.5">
                <p>ID: {entry.idMal}</p>
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
};

export default EntryList;
