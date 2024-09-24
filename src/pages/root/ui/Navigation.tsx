import { NavLink } from "react-router-dom";
import {
  BusinessIcon,
  HealthIcon,
  HomeIcon,
  NewsIcon,
  ScienceIcon,
  SportsIcon,
  TechnologyIcon,
} from "../../../ui/icon/Icon";

import classes from "./navigation.module.scss";

function applyNavLinkActiveClass({ isActive }: { isActive: boolean }) {
  return [`${classes.navigation__link}`, isActive ? `${classes["navigation__link--active"]}` : ""].join(" ");
}

export function Navigation() {
  return (
    <nav className={`${classes.navigation}`}>
      <ul className={`${classes.navigation__list}`}>
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
      </ul>
    </nav>
  );
}
