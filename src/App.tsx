import React from "react";

import "./App.scss";
import {
  BusinessIcon,
  FlashingCircleIcon,
  HealthIcon,
  HomeIcon,
  NewsIcon,
  ScienceIcon,
  SearchIcon,
  SportsIcon,
  TechnologyIcon,
} from "./ui/icon/Icon";
import { Card, CardImage, CardBody, CardFooter } from "./ui/card/Card";
import { Divider } from "./ui/divider/Divider";
import { Button } from "./ui/button/Button";
import { Skeleton } from "./ui/skeleton/Skeleton";

function App() {
  return (
    <React.Fragment>
      <div className="topbar">
        <div className="container">
          <div className="topbar__inner">
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

      <div className="container">
        <header className="header">
          <div>
            <h1 className="text-xxl font-black">
              <span className="text-primary">My</span>News
            </h1>
          </div>

          <div className="search-box">
            <SearchIcon className="search-box__icon" />
            <input className="search-box__input" type="text" placeholder="Search News" />
            <Button color="primary">SEARCH</Button>
          </div>

          <div className="mobile-navigation"></div>
        </header>

        <Divider className="text-gray mt-7 opacity-10" />

        <div className="content mt-6 pb-15">
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__item">
                <a className="navigation__link navigation__link--active" href="#">
                  <HomeIcon />
                  <span>Home</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <NewsIcon />
                  <span>General</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <BusinessIcon />
                  <span>Business</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <HealthIcon />
                  <span>Health</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <ScienceIcon />
                  <span>Science</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <SportsIcon />
                  <span>Sports</span>
                </a>
              </li>
              <li className="navigation__item">
                <a className="navigation__link" href="#">
                  <TechnologyIcon />
                  <span>Technology</span>
                </a>
              </li>
            </ul>
          </nav>

          <main className="news">
            <h2 className="text-lg font-semibold">News</h2>
            <div className="news__layout">
              <div className="latest-news">
                <div className="latest-news__header">
                  <FlashingCircleIcon className="text-primary" />
                  <h2 className="text-default font-medium ml-3">Latest news</h2>
                </div>
                <div className="latest-news__body">
                  {Array.from({ length: 40 }).map((_, index) => (
                    <React.Fragment key={index}>
                      <Skeleton key={index} style={{ height: "100px", marginTop: 16 }}></Skeleton>
                      {/* <Card>
                        <CardBody>
                          <span className="text-xs text-secondary font-bold">14:30</span>
                          <p className="font-medium">6 Powerful Tips To Creating Testimonials That Sell Your Products</p>
                        </CardBody>
                      </Card> */}
                      <Divider className="text-light-2" />
                    </React.Fragment>
                  ))}
                </div>
                <div className="latest-news__footer p-4">
                  <a href="#" className="text-secondary text-md font-medium">
                    See All News
                  </a>
                </div>
              </div>

              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} style={{ height: "100%" }}></Skeleton>
                /*  <Card key={index}>
                  <CardImage
                    src="https://ip.index.hr/remote/bucket.index.hr/b/index/9da1b2ef-dd33-4855-9093-0586b4f7ea4c.jpg?width=765&height=402"
                    alt="Article Image"
                  />
                  <CardBody>
                    <span className="text-xs font-bold text-secondary">Category</span>
                    <h3 className="text-default font-medium">6 Powerful Tips To Creating Testimonials That Sell Your Products</h3>
                  </CardBody>
                  <CardFooter>
                    <p className="text-sm text-dark-2">John Doe</p>
                  </CardFooter>
                </Card> */
              ))}
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
