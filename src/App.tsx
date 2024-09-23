import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import "./App.scss";
import { SearchIcon } from "./ui/icon/Icon";
import { Divider } from "./ui/divider/Divider";
import { Button } from "./ui/button/Button";
import { navigation } from "./navigation";

function applyNavLinkActiveClass({ isActive }: { isActive: boolean }) {
  return ["navigation__link", isActive ? "navigation__link--active" : ""].join(" ");
}

export default function App() {
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
      <div className="topbar">
        <div className="container">
          <div className="topbar__inner">
            <p className="text-light font-bold">Make MyNews your homepage</p>
            <p className="text-light text-md ml-11">Every day discover what's trending on the internet!</p>
            <div className="ml-auto">
              <Button color="light" variant="text">
                No, thanks
              </Button>
              <Button variant="contained" color="light">
                GET
              </Button>
            </div>
          </div>
        </div>
      </div>

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
          <nav className="navigation">
            <ul className="navigation__list">
              {navigation.map(({ name, Icon, path }, index) => (
                <li key={index} className="navigation__item">
                  <NavLink className={applyNavLinkActiveClass} to={path}>
                    <Icon />
                    <span>{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
