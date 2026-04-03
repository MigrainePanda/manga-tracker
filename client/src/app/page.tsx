'use client';

import { useState } from 'react';
import handleRequest from '@/lib/apiUtils';

import Navbar from '@/components/layout/navbar';
import EntryList from '@/components/entry-list';

import { AnilistSearchResultType } from '@shared/types';
import { MangaType } from '@models/manga';

export default function Home() {
  const [options, setOptions] = useState<MangaType[]>([]);
  const [searchStr, setSearchStr] = useState<string>('');
  const [searchResults, setSearchResults] = useState<AnilistSearchResultType[]>(
    [],
  );

  async function handleClick1(): Promise<void> {
    setOptions([]);
    const res = await handleRequest('GET', '/manga');
    setTimeout(() => {
      if (res.status === 200) {
        const data = res.data as MangaType[];
        setOptions(data);
      }
    }, 500);
  }

  async function handleClick2(): Promise<void> {
    // await handleRequest('POST', '/manga', {
    //   idMal: 100,
    //   titles: ['a', 'b', 'c'],
    //   type: 'type',
    //   format: 'format',
    //   status: 'status',
    //   chapters: 3,
    //   volumes: 4,
    //   genres: ['e', 'f', 'g'],
    // });
    setSearchResults([]);
    const response = await handleRequest(
      'GET',
      '/anilist/search',
      {},
      { searchStr, perPage: 5 },
    );
    console.log(response);
    setSearchResults(response.data as AnilistSearchResultType[]);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchStr(e.target.value);
  }

  return (
    <main className="max-w-full min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-5 bg-blue-950">
        <Navbar />
      </div>
      <div className="flex grow items-start justify-center p-5 gap-5">
        <div className="flex grow flex-col items-center justify-center p-5 gap-5">
          <button onClick={handleClick1} className="cursor-pointer">
            fkjsklfjsdkl
          </button>
          <EntryList entries={options} />
        </div>
        <div className="flex grow flex-col items-center justify-center p-5 gap-5">
          <input
            type="text"
            className="border-2 border-red-500"
            value={searchStr}
            onChange={handleChange}
            placeholder="Manga..."
          />
          <button onClick={handleClick2} className="cursor-pointer">
            oipoiopiop
          </button>
          <div>
            {searchResults.length > 0 &&
              searchResults.map(function (
                entry: AnilistSearchResultType,
                i: number,
              ) {
                return (
                  <div key={i} className="py-2">
                    <p>ID: {entry.idMal}</p>
                    <p>
                      Titles: {entry.title.romanji}, {entry.title.english},{' '}
                      {entry.title.native}
                    </p>
                    <p>
                      Type/Format: {entry.type}/{entry.format}
                    </p>
                    <p>Status: {entry.status}</p>
                    <p>
                      Volumes/Chapters: {entry.volumes ?? 'N/A'}/
                      {entry.chapters ?? 'N/A'}
                    </p>
                    <p>Genres: {entry.genres.join(', ')}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
