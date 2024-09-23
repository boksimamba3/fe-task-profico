import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";

import RootPage from "./pages/root/Root.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import NewsCategoryPage from "./pages/news-category/NewsCategoryPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import SearchPage from "./pages/search/SearchPage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import NewsAPI from "./api/news-api.ts";

import "./index.scss";

function homeLoader({ request }: { request: Request }) {
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

function newsCategoryLoader(category: string) {
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

function searchLoader({ request }: { request: Request }) {
  const q = new URL(request.url).searchParams.get("q");

  const searchResults = NewsAPI.everything(
    { q, searchIn: "title", sortBy: "relevancy" },
    {
      signal: request.signal,
    },
  );

  return defer({ searchResults });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: homeLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "general",
        element: <NewsCategoryPage />,
        handle: { category: "general" },
        loader: newsCategoryLoader("general"),
        errorElement: <ErrorPage />,
      },
      {
        path: "business",
        element: <NewsCategoryPage />,
        handle: { category: "business" },
        loader: newsCategoryLoader("business"),
        errorElement: <ErrorPage />,
      },
      {
        path: "health",
        element: <NewsCategoryPage />,
        handle: { category: "health" },
        loader: newsCategoryLoader("health"),
        errorElement: <ErrorPage />,
      },
      {
        path: "science",
        element: <NewsCategoryPage />,
        handle: { category: "science" },
        loader: newsCategoryLoader("science"),
        errorElement: <ErrorPage />,
      },
      {
        path: "sports",
        element: <NewsCategoryPage />,
        handle: { category: "sports" },
        loader: newsCategoryLoader("sports"),
        errorElement: <ErrorPage />,
      },
      {
        path: "technology",
        element: <NewsCategoryPage />,
        handle: { category: "technology" },
        loader: newsCategoryLoader("technology"),
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
