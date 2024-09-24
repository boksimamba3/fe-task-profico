import { hashCode } from "../utils/hash-code";
import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

export function useBookmarks(): [(title: string) => boolean, (title: string) => void] {
  const [bookmarks, setBookmarks] = useLocalStorage<number[]>("bookmarks", []);

  const toggleBookmark = useCallback(
    (title: string) => {
      const code = hashCode(title);
      if (bookmarks.includes(code)) {
        setBookmarks((bookmarks) => bookmarks.filter((bookmark) => bookmark !== code));
      } else {
        setBookmarks((bookmarks) => [...bookmarks, code]);
      }
    },
    [bookmarks, setBookmarks],
  );

  const isBookmarked = useCallback(
    (title: string) => {
      return bookmarks.includes(hashCode(title));
    },
    [bookmarks],
  );

  return [isBookmarked, toggleBookmark];
}
