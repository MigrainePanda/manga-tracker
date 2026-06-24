'use client';

import { useRef, useCallback, Dispatch, SetStateAction } from 'react';
import handleRequest from '@/lib/apiUtils';
import { Button } from './ui/button';
import { MangaType } from '@shared/types';

type LibraryListEntryProps = {
  entry: MangaType;
  setOwnedVolumes: Dispatch<SetStateAction<Record<number, number>>>;
  pair: [string, number];
};

export default function LibraryListEntryVolume({
  entry,
  setOwnedVolumes,
  pair,
}: LibraryListEntryProps) {
  const [volNum, isOwned] = pair;
  const volNumber = Number(volNum);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Always send the LATEST collection state, not a stale closure
  const saveToServer = useCallback(
    (volumesToSave: Record<number, number>) => {
      handleRequest('PUT', `/manga/${entry.id}/collection`, {
        new_owned_volumes: volumesToSave,
      }).catch(() => {
        // optional: roll back / show error toast here
      });
    },
    [entry.id],
  );

  async function onClickUpdateOwnedVolumes() {
    setOwnedVolumes((prev) => {
      const updated = {
        ...prev,
        [volNumber]: prev[volNumber] ? 0 : 1,
      };

      // Reset any pending debounce timer and schedule a new save
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveToServer(updated);
      }, 500);

      return updated;
    });
  }

  return (
    <>
      <Button
        className={`w-[9%] ${isOwned ? 'bg-blue-950 text-white' : ''}`}
        onClick={onClickUpdateOwnedVolumes}
      >
        {volNum}
      </Button>
    </>
  );
}
