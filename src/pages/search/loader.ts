import { defer } from "react-router-dom";

import NewsAPI from "../../api/news-api";

export function searchLoader({ request }: { request: Request }) {
  const q = new URL(request.url).searchParams.get("q");

  const searchResults = NewsAPI.everything(
    { q, searchIn: "title", sortBy: "relevancy" },
    {
      signal: request.signal,
    },
  );

  return defer({ searchResults });
}
