import { ComponentPropsWithoutRef } from "react";

import classes from "./card.module.scss";

export function Card({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={`${classes.card} ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({ className, ...props }: ComponentPropsWithoutRef<"img">) {
  return <img {...props} className={`${classes.card__image} ${className}`} />;
}

export function CardBody({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={`${classes.card__body} ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={`${classes.card__footer} ${className}`}>
      {children}
    </div>
  );
}
