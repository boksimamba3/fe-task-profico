import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/root/Root.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import NewsCategoryPage from "./pages/news-category/NewsCategoryPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import SearchPage from "./pages/search/SearchPage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import { homeLoader } from "./pages/home/loader.ts";
import { searchLoader } from "./pages/search/loader.ts";
import { newsCategoryLoader } from "./pages/news-category/loader.ts";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
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
