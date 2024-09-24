import { Suspense, Fragment } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import { Card, CardBody, CardFooter, CardImage } from "../../ui/card/Card";
import { LatestNews } from "./ui/LatestNews";
import { Skeleton } from "../../ui/skeleton/Skeleton";
import { BookmarkIcon } from "../../ui/icon/Icon";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import classes from "./home.module.scss";
import { TabList } from "../../ui/tabs/TabList";
import { Tab } from "../../ui/tabs/Tab";
import { NewsAPIArticle, NewsAPIResponse } from "../../api/news-api";

function HomeSkeleton() {
  return (
    <section className="news-category mb-10">
      {Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} style={{ height: "100%" }} />
      ))}
      <Skeleton className="latest-news" style={{ height: "100%" }} />
    </section>
  );
}

export default function HomePage() {
  const { news } = useLoaderData();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");

  function renderArticles(articles: NewsAPIArticle[]): JSX.Element {
    return (
      <Fragment>
        {articles.map((article, index) => (
          <Card key={index} className="fade-in">
            <CardImage src={article.urlToImage ?? "https://placehold.co/600x400?text=No+image"} alt="Article Image" />
            <CardBody>
              <h3 className="text-default font-medium text-truncate">{article.title}</h3>
            </CardBody>
            <CardFooter>
              <p className="text-sm text-dark-2">{article.author}</p>
              <div className={classes.bookmark} onClick={() => toggleBookmark(article)}>
                <BookmarkIcon className={`${isBookmarked(article) ? "text-primary" : "text-gray"}`} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </Fragment>
    );
  }

  function renderLatestNews(articles: NewsAPIArticle[], totalItems: number): JSX.Element {
    return <LatestNews initialArticles={articles} totalItems={totalItems} />;
  }

  function renderMobileView(newsCategories: [string, NewsAPIResponse][], latestNews: NewsAPIResponse): JSX.Element {
    return (
      <TabList activeTabIndex={0}>
        <Tab label="Featured">
          {newsCategories.map(([category, { articles }]) => (
            <Fragment key={category}>
              <Link to={category} className="text-dark text-lg font-semibold text-capitalize">
                {category}
              </Link>
              <section className={`${classes.news__category} mb-10`}>{renderArticles(articles)}</section>
            </Fragment>
          ))}
        </Tab>
        <Tab label="Latest">
          <section className={`${classes.news__category} mb-10`}>
            {renderLatestNews(latestNews.articles, latestNews.totalResults)}
          </section>
        </Tab>
      </TabList>
    );
  }

  function renderDesktopView(newsCategories: [string, NewsAPIResponse][], latestNews: NewsAPIResponse): JSX.Element {
    return (
      <Fragment>
        {newsCategories.map(([category, { articles }], index) => (
          <Fragment key={category}>
            <Link to={category} className="text-dark text-lg font-semibold text-capitalize">
              {category}
            </Link>
            <section className={`${classes.news__category} mb-10`}>
              {renderArticles(articles)}
              {index === 0 && renderLatestNews(latestNews.articles, latestNews.totalResults)}
            </section>
          </Fragment>
        ))}
      </Fragment>
    );
  }

  return (
    <main className={`${classes.news}`}>
      <Suspense fallback={<HomeSkeleton />}>
        <Await resolve={news}>
          {([newsCategories, latestNews]) =>
            isMobile ? renderMobileView(newsCategories, latestNews) : renderDesktopView(newsCategories, latestNews)
          }
        </Await>
      </Suspense>
    </main>
  );
}
