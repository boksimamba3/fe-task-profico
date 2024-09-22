import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./App.scss";
import {
  BusinessIcon,
  HealthIcon,
  HomeIcon,
  NewsIcon,
  ScienceIcon,
  SearchIcon,
  SportsIcon,
  TechnologyIcon,
} from "./ui/icon/Icon";
import { Divider } from "./ui/divider/Divider";
import { Button } from "./ui/button/Button";

function applyNavLinkActiveClass({ isActive }: { isActive: boolean }) {
  return ["navigation__link", isActive ? "navigation__link--active" : ""].join(" ");
}

function App() {
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

          <div className="search-box">
            <SearchIcon className="search-box__icon" />
            <input className="search-box__input" type="text" placeholder="Search News" />
            <Button color="primary">SEARCH</Button>
          </div>

          <div className="mobile-navigation"></div>
        </header>

        <Divider className="text-gray mt-7 opacity-10" />

        <div className="content mt-6 pb-15">
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/">
                  <HomeIcon />
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/general">
                  <NewsIcon />
                  <span>General</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/business">
                  <BusinessIcon />
                  <span>Business</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/health">
                  <HealthIcon />
                  <span>Health</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/science">
                  <ScienceIcon />
                  <span>Science</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/sports">
                  <SportsIcon />
                  <span>Sports</span>
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink className={applyNavLinkActiveClass} to="/technology">
                  <TechnologyIcon />
                  <span>Technology</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
