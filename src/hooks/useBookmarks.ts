import { useCallback, useMemo } from "react";

import { NewsAPIArticle } from "../api/news-api";
import { hashCode } from "../utils/hash-code";
import { useLocalStorage } from "./useLocalStorage";

interface ArticleBookmark extends NewsAPIArticle {
  hash: number;
}

export function useBookmarks(): {
  bookmarks: NewsAPIArticle[];
  toggleBookmark: (article: NewsAPIArticle) => void;
  isBookmarked: (article: NewsAPIArticle) => boolean;
} {
  const [bookmarks, setBookmarks] = useLocalStorage<ArticleBookmark[]>("bookmarks", []);

  const toggleBookmark = useCallback(
    (article: NewsAPIArticle) => {
      const hash = hashCode(article.title);
      const exists = bookmarks.find((bookmark) => bookmark.hash === hash);
      if (exists) {
        setBookmarks((bookmarks) => bookmarks.filter((bookmark) => bookmark.hash !== hash));
      } else {
        setBookmarks((bookmarks) => [{ ...article, hash }, ...bookmarks]);
      }
    },
    [bookmarks, setBookmarks],
  );

  const hashCodes = useMemo(() => bookmarks.map((bookmark) => bookmark.hash), [bookmarks]);

  const isBookmarked = useCallback(
    (article: NewsAPIArticle) => {
      return hashCodes.includes(hashCode(article.title));
    },
    [hashCodes],
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}
