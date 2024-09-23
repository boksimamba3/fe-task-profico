import { defer } from "react-router-dom";

import NewsAPI from "../../api/news-api";

export function newsCategoryLoader(category: string) {
  return function categoryLoader({ request }: { request: Request }) {
    const newsCategory = NewsAPI.topHeadlines(
      { category: category },
      {
        signal: request.signal,
      },
    );

    return defer({ newsCategory });
  };
}
