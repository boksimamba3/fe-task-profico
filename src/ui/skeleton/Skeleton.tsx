import { ComponentPropsWithoutRef } from "react";

import classes from "./skeleton.module.scss";

export function Skeleton({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={`${classes.skeleton} ${className}`}></div>;
}
