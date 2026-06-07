'use client';

import { AnilistSearchResultType } from '@shared/types';
import { Button } from './ui/button';
import { useMangaStore } from '@/store/useMangaStore';
import handleRequest from '@/lib/apiUtils';
import Image from 'next/image';
import { useState } from 'react';

type SearchResultsListEntryProps = {
  entry: AnilistSearchResultType;
};

export default function SearchResultsListEntry({
  entry,
}: SearchResultsListEntryProps) {
  const [errMsg, setErrMsg] = useState<string>('');

  async function handleClick() {
    const response = await handleRequest('POST', '/manga', {
      idMal: entry.idMal,
      titles: [entry.title.romaji, entry.title.english, entry.title.native],
      type: entry.type,
      format: entry.format,
      status: entry.status,
      chapters: entry.chapters,
      volumes: entry.volumes,
      genres: entry.genres,
      cover_image: entry.coverImage.large,
      mime_type: 'image/jpeg',
    });
    if (response.error) {
      console.error(response.data);
      setErrMsg(response.data as string);
    }
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
        Volumes - Chapters: {entry.volumes ?? 'N/A'} - {entry.chapters ?? 'N/A'}
      </p>
      <p>Genres: {entry.genres.join(', ')}</p>
      {/* <div style={{ position: 'relative', width: '250px', height: '100px' }}>
        <Image
          src={entry.coverImage.large}
          alt={`Cover of ${entry.title.romaji}`}
          className="rounded-lg shadow-md"
          unoptimized={true} // Needed for blob/data URLs
          loading="lazy"
        />
      </div> */}
      <Image
        src={entry.coverImage.large}
        alt={`Cover of ${entry.title.romaji}`}
        width={0}
        height={0}
        className="rounded-lg shadow-md w-28 h-auto"
        unoptimized={true} // Needed for blob/data URLs
        loading="lazy"
      />
      <Button onClick={handleClick}>Add to library</Button>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
}
