import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouteObject, RouterProvider } from "react-router-dom";

import "./index.scss";
import App from "./App.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import NewsCategoryPage from "./pages/news-category/NewsCategoryPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import SearchPage from "./pages/search/SearchPage.tsx";
import NewsAPI from "./api/news-api.ts";
import { categoriesNavigation } from "./navigation.ts";

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
          ).then((response) => new Promise((resolve) => setTimeout(() => resolve(response), 1000)));

          return defer({ response });
        },
        errorElement: <ErrorPage />,
      },
      ...categoriesNavigation.map(
        (category): RouteObject => ({
          path: category.name,
          element: <NewsCategoryPage />,
          handle: { category: category.name },
          loader: function categoryLoader({ request }) {
            const response = NewsAPI.topHeadlines(
              { category: category.name.toLowerCase() },
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
