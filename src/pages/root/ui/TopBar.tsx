import { Button } from "../../../ui/button/Button";

import classes from "./tobar.module.scss";

export function TopBar() {
  return (
    <div className={`${classes.topbar}`}>
      <div className="container">
        <div className={`${classes.topbar__inner}`}>
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
  );
}
