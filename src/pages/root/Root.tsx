import React, { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Navigation } from "./ui/Navigation";
import { Divider } from "../../ui/divider/Divider";
import { TopBar } from "./ui/TopBar";
import { SearchBox } from "./ui/SearchBox";

import classes from "./root.module.scss";

export default function RootPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = React.useState(searchParams.get("q") || "");

  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
    }
  }, [location]);

  function onQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) return;

    navigate(`/search?q=${query}`);
  }

  return (
    <React.Fragment>
      <ScrollRestoration />
      <TopBar />
      <div className="container">
        <header className={`${classes.header}`}>
          <div>
            <h1 className="text-xxl font-black">
              <span className="text-primary">My</span>News
            </h1>
          </div>

          <form onSubmit={handleSearch}>
            <SearchBox query={query} onQueryChange={onQueryChange} />
          </form>

          <div className="mobile-navigation"></div>
        </header>

        <Divider className="text-gray mt-7 opacity-10" />

        <div className={`${classes.content} mt-6 pb-15`}>
          <Navigation />
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
