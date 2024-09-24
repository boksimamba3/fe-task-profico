import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import { Card, CardBody, CardFooter, CardImage } from "../../ui/card/Card";
import { LatestNews } from "./ui/LatestNews";
import { Skeleton } from "../../ui/skeleton/Skeleton";
import { BookmarkIcon } from "../../ui/icon/Icon";
import { useBookmarks } from "../../hooks/useBookmarks";

import classes from "./home.module.scss";

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

  return (
    <main className={`${classes.news}`}>
      <Suspense fallback={<HomeSkeleton />}>
        <Await resolve={news}>
          {([newsCategory, latestNews]) => (
            <React.Fragment>
              {newsCategory.map(([category, { articles }]) => (
                <React.Fragment key={category}>
                  <Link to={category} className="text-dark text-lg font-semibold text-capitalize">
                    {category}
                  </Link>
                  <section className={`${classes.news__category} mb-10`}>
                    {articles.map((article, index) => (
                      <Card key={index} className="fade-in">
                        <CardImage
                          src={article.urlToImage ?? "https://placehold.co/600x400?text=No+image"}
                          alt="Article Image"
                        />
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
                    {category === "general" ? (
                      <LatestNews initialArticles={latestNews.articles} totalItems={latestNews.totalResults} />
                    ) : null}
                  </section>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
