'use client';

import { useState } from 'react';
import handleRequest from '@/lib/apiUtils';

import Navbar from '@/components/layout/navbar';
import EntryList from '@/components/entry-list';

import { MangaType } from '@models/manga';

export default function Home() {
  const [options, setOptions] = useState<MangaType[]>([]);

  const handleClick1 = async () => {
    setOptions([]);
    const res = await handleRequest('GET', '/manga');
    setTimeout(() => {
      if (res.status === 200) {
        const data = res.data as MangaType[];
        setOptions(data);
      }
    }, 500);
  };

  const handleClick2 = async () => {
    await handleRequest('POST', '/manga', {
      idMal: 100,
      titles: JSON.stringify(['a', 'b', 'c']),
      type: 'type',
      format: 'format',
      status: 'status',
      chapters: 3,
      volumes: 4,
      genres: JSON.stringify(['e', 'f', 'g']),
    });
  };

  return (
    <main className="max-w-full min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-5 bg-blue-950">
        <Navbar />
      </div>
      <div className="flex grow items-center justify-center p-5 gap-5">
        <div className="flex grow flex-col items-center justify-center p-5 gap-5">
          <button onClick={handleClick1} className="cursor-pointer">
            fkjsklfjsdkl
          </button>
          <EntryList entries={options} />
        </div>
        <div className="flex grow flex-col items-center justify-center p-5 gap-5">
          <button onClick={handleClick2} className="cursor-pointer">
            oipoiopiop
          </button>
        </div>
      </div>
    </main>
  );
}
