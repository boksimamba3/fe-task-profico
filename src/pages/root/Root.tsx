import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Navigation } from "./ui/Navigation";
import { Button } from "../../ui/button/Button";
import { SearchIcon } from "../../ui/icon/Icon";
import { Divider } from "../../ui/divider/Divider";
import { TopBar } from "./ui/TopBar";

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
      <TopBar />
      <div className="container">
        <header className="header">
          <div>
            <h1 className="text-xxl font-black">
              <span className="text-primary">My</span>News
            </h1>
          </div>

          <form onSubmit={handleSearch}>
            <div className="search-box">
              <SearchIcon className="search-box__icon" />
              <input
                className="search-box__input"
                type="search"
                value={query}
                onChange={onQueryChange}
                placeholder="Search News"
              />
              <Button color="primary">SEARCH</Button>
            </div>
          </form>

          <div className="mobile-navigation"></div>
        </header>

        <Divider className="text-gray mt-7 opacity-10" />

        <div className="content mt-6 pb-15">
          <Navigation />
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
