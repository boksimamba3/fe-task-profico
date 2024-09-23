export interface NewsAPIRequestBase {
  q?: string | null;
  pageSize?: number;
  page?: number;
  language?: string;
}

export interface NewsAPIRequestTopHeadlines extends NewsAPIRequestBase {
  category?: string;
}

export interface NewsAPIRequestEverything extends NewsAPIRequestBase {
  searchIn?: "title" | "description" | "content";
  sortBy?: "relevancy" | "popularity" | "publishedAt";
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

export interface NewsAPIArticle {
  author?: string;
  title: string;
  urlToImage?: string;
  publishedAt: string;
}

export class NewsAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `NewsAPIError`;
  }
}

class NewsAPI {
  private readonly apiKey = "e6e2081592c34785a1e045eb7046fa7d";

  async topHeadlines(request: NewsAPIRequestTopHeadlines, requestInit?: RequestInit): Promise<NewsAPIResponse> {
    const { category, language = "en", pageSize = 100, page = 1 } = request;
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.append("language", language);
    url.searchParams.append("pageSize", pageSize.toString());
    url.searchParams.append("page", page.toString());
    url.searchParams.append("apiKey", this.apiKey);

    if (category) {
      url.searchParams.append("category", category);
    }

    const response = await fetch(url.toString(), requestInit);

    if (!response.ok) {
      throw new NewsAPIError(`Failed to fetch news for top headlines`);
    }

    return response.json();
  }

  async everything(request: NewsAPIRequestEverything, requestInit?: RequestInit): Promise<NewsAPIResponse> {
    const { q, language = "en", pageSize = 10, page = 1, searchIn = "title", sortBy = "popularity" } = request;
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.append("language", language);
    url.searchParams.append("pageSize", pageSize.toString());
    url.searchParams.append("page", page.toString());
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("apiKey", this.apiKey);

    if (q) {
      url.searchParams.append("q", q);
      url.searchParams.append("searchIn", searchIn);
    }

    const response = await fetch(url.toString(), requestInit);

    if (!response.ok) {
      throw new NewsAPIError(`Failed to fetch news for everything`);
    }

    return response.json();
  }
}

export default new NewsAPI();
