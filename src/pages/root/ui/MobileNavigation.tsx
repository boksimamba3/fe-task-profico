import { NavLink } from "react-router-dom";
import {
  BookmarkIcon,
  BusinessIcon,
  HealthIcon,
  HomeIcon,
  NewsIcon,
  ScienceIcon,
  SportsIcon,
  TechnologyIcon,
} from "../../../ui/icon/Icon";

import classes from "./mobile-navigation.module.scss";
import { ReactNode } from "react";

function applyNavLinkActiveClass({ isActive }: { isActive: boolean }) {
  return [`${classes.navigation__link}`, isActive ? `${classes["navigation__link--active"]}` : ""].join(" ");
}

interface MobileNavigationProps {
  onNavigate?: () => void;
  children?: ReactNode;
}

export function MobileNavigation({ onNavigate = () => {}, children }: MobileNavigationProps) {
  return (
    <nav className={`${classes.navigation}`}>
      <h1 className="font-black text-xxl">
        <span className="text-primary">My</span>News
      </h1>
      {children && <div className={`${classes.navigation__slot}`}>{children}</div>}
      <ul className={`${classes.navigation__list}`} onClick={() => onNavigate()}>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/">
            <HomeIcon />
            <span>Home</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/general">
            <NewsIcon />
            <span>General</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/business">
            <BusinessIcon />
            <span>Business</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/health">
            <HealthIcon />
            <span>Health</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/science">
            <ScienceIcon />
            <span>Science</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/sports">
            <SportsIcon />
            <span>Sports</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/technology">
            <TechnologyIcon />
            <span>Technology</span>
          </NavLink>
        </li>
        <li className={`${classes.navigation__item}`}>
          <NavLink className={applyNavLinkActiveClass} to="/bookmarks">
            <BookmarkIcon />
            <span>Bookmarks</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
