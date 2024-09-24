import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Navigation } from "./ui/Navigation";
import { Divider } from "../../ui/divider/Divider";
import { TopBar } from "./ui/TopBar";
import { SearchBox } from "./ui/SearchBox";
import { HamburgerMenu } from "./ui/HamburgerMenu";

import classes from "./root.module.scss";
import { MobileNavigation } from "./ui/MobileNavigation";

export default function RootPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    setIsMobileMenuOpen(false);
    navigate(`/search?q=${query}`);
  }

  return (
    <React.Fragment>
      <ScrollRestoration />
      <TopBar />
      <div className="container px-4">
        <header className={`${classes.header}`}>
          <div className={`${classes.header__title}`}>
            <h1 className="font-black">
              <span className="text-primary">My</span>News
            </h1>
          </div>

          <form className={`${classes.header__search}`} onSubmit={handleSearch}>
            <SearchBox query={query} onQueryChange={onQueryChange} />
          </form>

          <div className={`${classes.header__menu}`}>
            <HamburgerMenu isOpen={isMobileMenuOpen} onToggle={(isOpen) => setIsMobileMenuOpen(isOpen)} />
            {isMobileMenuOpen && (
              <MobileNavigation onNavigate={() => setIsMobileMenuOpen(false)}>
                <form onSubmit={handleSearch}>
                  <SearchBox query={query} onQueryChange={onQueryChange} />
                </form>
              </MobileNavigation>
            )}
          </div>
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
