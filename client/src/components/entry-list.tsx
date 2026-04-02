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
              <p key={i} className="py-0.5">
                {entry.id} | {entry.title}
              </p>
            );
          })}
      </div>
    </>
  );
};

export default EntryList;
