import { defer } from "react-router-dom";

import NewsAPI from "../../api/news-api";

export function newsCategoryLoader(category: string) {
  return function ({ request }: { request: Request }) {
    const newsCategory = NewsAPI.topHeadlines(
      { category: category },
      {
        signal: request.signal,
      },
    );

    return defer({ newsCategory });
  };
}

export function bookmarksLoader() {
  const newsCategory = NewsAPI.bookmarks();

  return defer({ newsCategory });
}
