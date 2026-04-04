'use client';

import { MangaType } from '@shared/types';

type LibraryListEntryProps = {
  entry: MangaType;
};

export default function LibraryListEntry({ entry }: LibraryListEntryProps) {
  return (
    <div>
      <p>ID: {entry.idMal}</p>
      <p>Titles: {entry.titles.join(', ')}</p>
      <p>
        Type/Format: {entry.type}/{entry.format}
      </p>
      <p>Status: {entry.status}</p>
      <p>
        Volumes/Chapters: {entry.volumes ?? 'N/A'}/{entry.chapters ?? 'N/A'}
      </p>
      <p>Genres: {entry.genres.join(', ')}</p>
    </div>
  );
}
