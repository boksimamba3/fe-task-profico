import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouteObject, RouterProvider } from "react-router-dom";

import "./index.scss";

import RootPage from "./pages/root/Root.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import NewsCategoryPage from "./pages/news-category/NewsCategoryPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import SearchPage from "./pages/search/SearchPage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import NewsAPI from "./api/news-api.ts";
import { categoriesNavigation } from "./navigation.ts";

function newsCategoryLoader(category: string) {
  return function categoryLoader({ request }: { request: Request }) {
    const response = NewsAPI.topHeadlines(
      { category: category },
      {
        signal: request.signal,
      },
    );

    return defer({ response });
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: function searchLoader({ request }) {
          const q = new URL(request.url).searchParams.get("q");

          const response = NewsAPI.everything(
            { q, searchIn: "title", sortBy: "relevancy" },
            {
              signal: request.signal,
            },
          );

          return defer({ response });
        },
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
