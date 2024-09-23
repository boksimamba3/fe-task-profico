import React, { Suspense } from "react";
import { Await, UIMatch, useLoaderData, useMatches } from "react-router-dom";
import { Card, CardBody, CardFooter, CardImage } from "../../ui/card/Card";
import { Skeleton } from "../../ui/skeleton/Skeleton";

function NewsCategorySkeleton() {
  return (
    <React.Fragment>
      {Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} style={{ height: "100%" }} />
      ))}
    </React.Fragment>
  );
}

export default function NewsCategoryPage() {
  const matches = useMatches();
  const { newsCategory } = useLoaderData();

  const match = matches.find((match): match is UIMatch<unknown, { category: string }> =>
    Boolean(match.handle && typeof match.handle === "object" && "category" in match.handle),
  );

  const category = match?.handle.category ?? "";

  return (
    <section className="news-section">
      <h2 className="text-lg font-semibold text-capitalize">{category}</h2>
      <div className="news-category">
        <Suspense fallback={<NewsCategorySkeleton />}>
          <Await resolve={newsCategory}>
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
                    </CardFooter>
                  </Card>
                ))}
              </React.Fragment>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
