import { Children, isValidElement, ReactElement, useState } from "react";

import { Tab, TabProps } from "./Tab";

import classes from "./tabs.module.scss";

export interface TabListProps {
  activeTabIndex: number;
  children: ReactElement<TabProps>[];
}

export function TabList({ activeTabIndex: initialActiveTabIndex, children }: TabListProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => isValidElement(child) && child.type === Tab,
  );

  const activeTab = tabs[activeTabIndex];

  return (
    <div>
      <ul className={classes.tabs__labels}>
        {tabs.map(({ props: { label } }, index) => (
          <li
            key={index}
            className={`${classes.tabs__label} ${activeTabIndex === index ? classes["tabs__label--active"] : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {label}
          </li>
        ))}
      </ul>
      <div>{activeTab}</div>
    </div>
  );
}
