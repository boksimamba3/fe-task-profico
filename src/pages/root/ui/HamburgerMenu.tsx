import classes from "./hamburger-menu.module.scss";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function HamburgerMenu({ isOpen = false, onToggle = () => {} }: HamburgerMenuProps) {
  return (
    <button className={classes.btn} aria-pressed={isOpen} onClick={() => onToggle(!isOpen)}>
      <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" strokeWidth="4" fill="none">
          <line className={classes.top} x1="4" y1="7" x2="20" y2="7" />
          <line className={classes.middle} x1="4" y1="12" x2="20" y2="12" />
          <line className={classes.bottom} x1="4" y1="17" x2="20" y2="17" />
        </g>
      </svg>
    </button>
  );
}
