import { Fragment, ReactNode } from "react";

export interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <Fragment>{children}</Fragment>;
}
