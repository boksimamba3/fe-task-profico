import React, { Suspense } from "react";
import { Await, useLoaderData, useNavigation } from "react-router-dom";

import { Skeleton } from "../../ui/skeleton/Skeleton";
import { Card, CardBody, CardFooter, CardImage } from "../../ui/card/Card";
import { BookmarkIcon } from "../../ui/icon/Icon";
import { useBookmarks } from "../../hooks/useBookmarks";

import classes from "./search.module.scss";

function SearchSkeleton() {
  return (
    <React.Fragment>
      {Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} style={{ height: "100%" }} />
      ))}
    </React.Fragment>
  );
}

export default function SearchPage() {
  const navigation = useNavigation();
  const { searchResults } = useLoaderData();
  const [isBookmarked, toggleBookmark] = useBookmarks();

  if (navigation.state === "loading") {
    return (
      <section className={`${classes.news}`}>
        <SearchSkeleton />;
      </section>
    );
  }

  return (
    <section className={`${classes.news}`}>
      <Suspense fallback={<SearchSkeleton />}>
        <Await resolve={searchResults}>
          {({ articles }) => (
            <React.Fragment>
              {articles.map(({ title, author, urlToImage }, index) => (
                <Card key={index} className="fade-in">
                  <CardImage src={urlToImage ?? "https://placehold.co/600x400?text=No+image"} alt="Article Image" />
                  <CardBody>
                    <h3 className="text-default font-medium text-truncate">{title}</h3>
                  </CardBody>
                  <CardFooter>
                    <p className="text-sm text-dark-2">{author}</p>
                    <div className={classes.bookmark} onClick={() => toggleBookmark(title)}>
                      <BookmarkIcon className={`${isBookmarked(title) ? "text-primary" : "text-gray"}`} />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </React.Fragment>
          )}
        </Await>
      </Suspense>
    </section>
  );
}
