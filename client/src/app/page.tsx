'use client';

import Navbar from '@/components/layout/navbar';
import LibraryList from '@/components/library-list';
import SearchResultsList from '@/components/search-results-list';

export default function Home() {
  return (
    <main className="max-w-full min-h-screen flex flex-col">
      <div className="flex items-center justify-center py-5 bg-blue-950">
        <Navbar />
      </div>
      <div className="grid grid-cols-2 p-5 gap-5">
        <SearchResultsList />
        <LibraryList />
      </div>
    </main>
  );
}
