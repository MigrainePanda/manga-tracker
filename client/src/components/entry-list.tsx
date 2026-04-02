import { UserType } from '@models/user';

type EntryListProps = {
  entries: UserType[];
};

const EntryList = ({ entries }: EntryListProps) => {
  return (
    <>
      <div className="">
        {entries.length > 0 &&
          entries.map(function (entry: UserType, i: number) {
            return (
              <p key={i} className="py-0.5">
                {entry.username}|{entry.name}
              </p>
            );
          })}
      </div>
    </>
  );
};

export default EntryList;
