'use client';

import { useEffect, useState } from 'react';
import handleRequest from '@/lib/apiUtils';
import { MangaType } from '@shared/types';
import { Button } from './ui/button';
import Image from 'next/image';
import { useMangaStore } from '@/store/useMangaStore';

type LibraryListEntryProps = {
  entry: MangaType;
};

export default function LibraryListEntry({ entry }: LibraryListEntryProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abortController: AbortController;

    async function fetchCover() {
      try {
        setLoading(true);
        abortController = new AbortController();

        // Fetch the image data (should return Buffer/blob)
        const response = await handleRequest(
          'GET',
          `/manga/cover-images/${entry.id}`,
        );
        const data = response.data;

        // Handle the response - depends on what handleRequest returns
        if (data instanceof Blob) {
          // If it's already a Blob, create object URL
          const url = URL.createObjectURL(data);
          setImageUrl(url);
        } else if (typeof data === 'string') {
          // If it's already a URL or data URL
          setImageUrl(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image');
        console.error('Image fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCover();

    // Cleanup: revoke object URL to prevent memory leaks
    return () => {
      if (abortController) {
        abortController.abort();
      }
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [entry.id, imageUrl]);

  async function handleClick() {
    const response = await handleRequest('DELETE', `/manga/${entry.id}`);
    if (response.error) {
      console.error(response.error);
    }
    useMangaStore.getState().refreshEntries();
  }

  return (
    <div>
      <p>ID: {entry.idMal}</p>
      <p>Titles: {entry.titles.join(', ')}</p>
      <p>
        Type/Format: {entry.type}/{entry.format}
      </p>
      <p>Status: {entry.status}</p>
      <p>
        Volumes - Chapters: {entry.volumes ?? 'N/A'} - {entry.chapters ?? 'N/A'}
      </p>
      <p>Genres: {entry.genres.join(', ')}</p>
      <span>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && imageUrl && (
          <Image
            src={imageUrl}
            alt={`Cover of ${entry.titles[0]}`}
            width={93}
            height={137}
            className="rounded-lg shadow-md"
            unoptimized={true} // Needed for blob/data URLs
          />
        )}
        {!loading && !error && !imageUrl && <p>No image available</p>}
      </span>
      <Button onClick={handleClick}>Remove from library</Button>
    </div>
  );
}
