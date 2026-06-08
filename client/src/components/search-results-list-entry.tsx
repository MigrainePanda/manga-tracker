'use client';

import { AnilistSearchResultType } from '@shared/types';
import { Button } from './ui/button';
import { useMangaStore } from '@/store/useMangaStore';
import handleRequest from '@/lib/apiUtils';
import Image from 'next/image';
import { useState } from 'react';

type SearchResultsListEntryProps = {
  entry: AnilistSearchResultType;
  inLibrary: boolean;
};

export default function SearchResultsListEntry({
  entry,
  inLibrary,
}: SearchResultsListEntryProps) {
  const [errMsg, setErrMsg] = useState<string>('');
  const [action, setAction] = useState(
    !inLibrary ? (
      <Button onClick={handleClick}>Add to library</Button>
    ) : (
      <p>In library</p>
    ),
  );

  async function handleClick() {
    const base_owned_volumes = Object.fromEntries(
      Array.from({ length: entry.volumes || 0 }, (_, i) => [i + 1, 0]),
    );
    const response = await handleRequest('POST', '/manga', {
      idMal: entry.idMal,
      titles: [entry.title.romaji, entry.title.english, entry.title.native],
      type: entry.type,
      format: entry.format,
      status: entry.status,
      chapters: entry.chapters,
      volumes: entry.volumes,
      owned_volumes: base_owned_volumes,
      genres: entry.genres,
      cover_image: entry.coverImage.large,
      mime_type: 'image/jpeg',
    });
    if (response.error) {
      const data = response.data as { message: string };
      console.error(response.data);
      setErrMsg(data.message as string);
      return;
    }
    useMangaStore.getState().refreshEntries();
    setAction(<p>In library</p>);
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
      <Image
        src={entry.coverImage.large}
        alt={`Cover of ${entry.title.romaji}`}
        width={0}
        height={0}
        className="rounded-lg shadow-md w-28 h-auto"
        unoptimized={true} // Needed for blob/data URLs
        loading="lazy"
      />
      {action}
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
}
