import { Button } from "../../../ui/button/Button";
import { SearchIcon } from "../../../ui/icon/Icon";

import classes from "./search-box.module.scss";

export interface SearchBoxProps {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBox({ query, onQueryChange }: SearchBoxProps) {
  return (
    <div className={`${classes.searchbox}`}>
      <SearchIcon className={`${classes.searchbox__icon}`} />
      <input
        className={`${classes.searchbox__input}`}
        type="search"
        value={query}
        onChange={onQueryChange}
        placeholder="Search News"
      />
      <Button className={`${classes.searchbox__btn}`} color="primary">
        SEARCH
      </Button>
    </div>
  );
}
