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

function applyNavLinkActiveClass({ isActive }: { isActive: boolean }) {
  return ["navigation__link", isActive ? "navigation__link--active" : ""].join(" ");
}

export function Navigation() {
  return (
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
  );
}
