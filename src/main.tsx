import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouteObject, RouterProvider } from "react-router-dom";

import "./index.scss";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import NewsCategoryPage from "./pages/NewsCategoryPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import NewsAPI from "./api/news-api.ts";

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
