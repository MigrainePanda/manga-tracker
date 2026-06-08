import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MangaType } from '@models/manga';
import { useMangaStore } from '@/store/useMangaStore';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import LibraryListEntry from './library-list-entry';

function LibraryList() {
  const [searchStr, setSearchStr] = useState<string>('');
  const filteredEntries = useMangaStore((s) => s.filteredEntries);
  const setStoreQuery = useMangaStore((s) => s.setQuery);
  const refreshEntries = useMangaStore((s) => s.refreshEntries);

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setStoreQuery(value);
  }, 200);

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  return (
    <>
      <div className="flex flex-col p-5 gap-7">
        <h1>Library</h1>

        {/* search entries */}
        <form>
          <Field>
            <FieldLabel htmlFor="input-group-search">
              Search Library by Title
            </FieldLabel>
            <Field orientation={'horizontal'}>
              <InputGroup>
                <InputGroupInput
                  id="input-group-search"
                  placeholder="Manga..."
                  value={searchStr}
                  onChange={(e) => {
                    setSearchStr(e.target.value);
                    debouncedSetQuery(e.target.value);
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>clear</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </Field>
        </form>

        {/* list entries */}
        <div className="flex grow flex-col items-start justify-start gap-5">
          {filteredEntries.length > 0 &&
            filteredEntries.map(function (entry: MangaType, i: number) {
              return <LibraryListEntry entry={entry} key={i} />;
            })}
        </div>
      </div>
    </>
  );
}

export default LibraryList;
