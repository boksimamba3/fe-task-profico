import { defer } from "react-router-dom";

import NewsAPI from "../../api/news-api";

export function homeLoader({ request }: { request: Request }) {
  const availableCategories = ["general", "business", "health", "science", "sports", "technology"];

  const categories = Promise.all(
    availableCategories.map((category) =>
      NewsAPI.topHeadlines({ category, pageSize: category === "general" ? 7 : 9 }, { signal: request.signal }).then(
        (data) => [category, data],
      ),
    ),
  );

  const latest = NewsAPI.topHeadlines({ pageSize: 10 }, { signal: request.signal });

  const news = Promise.all([categories, latest]);

  return defer({ news });
}
