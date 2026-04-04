'use client';

import { AnilistSearchResultType } from '@shared/types';
import { Button } from './ui/button';
import { useMangaStore } from '@/store/useMangaStore';

type SearchResultsListEntryProps = {
  entry: AnilistSearchResultType;
};

export default function SearchResultsListEntry({
  entry,
}: SearchResultsListEntryProps) {
  function handleClick() {
    useMangaStore.getState().refreshEntries();
  }

  return (
    <div>
      <p>ID: {entry.idMal}</p>
      <p>
        Titles: {entry.title.romaji}, {entry.title.english},{' '}
        {entry.title.native}
      </p>
      <p>
        Type/Format: {entry.type}/{entry.format}
      </p>
      <p>Status: {entry.status}</p>
      <p>
        Volumes/Chapters: {entry.volumes ?? 'N/A'}/{entry.chapters ?? 'N/A'}
      </p>
      <p>Genres: {entry.genres.join(', ')}</p>
      <Button onClick={handleClick}>Add to library</Button>
    </div>
  );
}
