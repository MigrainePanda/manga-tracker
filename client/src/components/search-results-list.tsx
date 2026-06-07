'use client';

import { SubmitEvent, useState, useEffect } from 'react';
import handleRequest from '@/lib/apiUtils';
import { useMangaStore } from '@/store/useMangaStore';
import { AnilistSearchResultType } from '@shared/types';
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import SearchResultsListEntry from './search-results-list-entry';

export default function SearchResultsList() {
  const [searchStr, setSearchStr] = useState<string>('');
  const [searchResults, setSearchResults] = useState<AnilistSearchResultType[]>(
    [],
  );
  const library = useMangaStore((state) => state.entries);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSearchResults([]);
    const response = await handleRequest(
      'GET',
      '/anilist/search',
      {},
      { searchStr, perPage: 5 },
    );
    setSearchResults(response.data as AnilistSearchResultType[]);
  }

  useEffect(() => {
    useMangaStore.getState().refreshEntries();
  }, []);

  return (
    <div className="flex grow flex-col items-start justify-start p-5 gap-7">
      <form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="input-group-search">
            Search Anilist for Manga
          </FieldLabel>
          <Field orientation={'horizontal'}>
            <InputGroup>
              <InputGroupInput
                id="input-group-search"
                placeholder="Manga..."
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>clear</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button type={'submit'}>Search</Button>
          </Field>
        </Field>
      </form>
      <div className="flex flex-col gap-5">
        {searchResults.length > 0 &&
          searchResults.map(function (
            entry: AnilistSearchResultType,
            i: number,
          ) {
            return (
              <SearchResultsListEntry
                key={i}
                entry={entry}
                inLibrary={library.some((ele) => ele.idMal === entry.idMal)}
              />
            );
          })}
      </div>
    </div>
  );
}
