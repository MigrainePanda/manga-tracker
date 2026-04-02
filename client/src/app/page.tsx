'use client';

import { useState } from 'react';
import handleRequest from '@/lib/apiUtils';

import Navbar from '@/components/layout/navbar';
import EntryList from '@/components/entry-list';

import { UserType } from '@models/user';

export default function Home() {
  const [options, setOptions] = useState<UserType[]>([]);

  const handleClick = async () => {
    setOptions([]);
    const res = await handleRequest('GET', '/users');
    console.log(res);
    setTimeout(() => {
      if (res.status === 200) {
        setOptions(res.data as UserType[]);
      }
    }, 1000);
  };

  return (
    <main className="max-w-full min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-5 bg-blue-950">
        <Navbar />
      </div>
      <div className="flex grow flex-col items-center justify-center p-5 gap-5">
        <button onClick={handleClick} className="cursor-pointer">
          fkjsklfjsdkl
        </button>
        <EntryList entries={options} />
      </div>
    </main>
  );
}
