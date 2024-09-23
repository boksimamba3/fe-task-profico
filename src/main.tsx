import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouteObject, RouterProvider } from "react-router-dom";

import "./index.scss";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import NewsCategoryPage from "./pages/NewsCategoryPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import NewsAPI from "./api/news-api.ts";
import SearchPage from "./pages/SearchPage.tsx";

// TODO: move to navigation
const NEWS_CATEGORIES = ["general", "business", "health", "science", "sports", "technology"];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
          ).then((r) => new Promise((resolve) => setTimeout(() => resolve(r), 3000)));

          return defer({ response });
        },
        errorElement: <ErrorPage />,
      },
      ...NEWS_CATEGORIES.map(
        (category): RouteObject => ({
          path: category,
          element: <NewsCategoryPage />,
          handle: { category },
          loader: function categoryLoader({ request }) {
            const response = NewsAPI.topHeadlines(
              { category },
              {
                signal: request.signal,
              },
            );

            return defer({ response });
          },
          errorElement: <ErrorPage />,
        }),
      ),
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
