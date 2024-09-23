import React, { useEffect, useState } from "react";

import { FlashingCircleIcon } from "../../../ui/icon/Icon";
import { Card, CardBody } from "../../../ui/card/Card";
import { Divider } from "../../../ui/divider/Divider";
import NewsAPI, { NewsAPIArticle } from "../../../api/news-api";
import { formatDateToHoursAndMinutes } from "../../../utils/format-date";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

export interface LatestNewsProps {
  initialArticles: NewsAPIArticle[];
  totalItems: number;
}

export function LatestNews({ initialArticles, totalItems }: LatestNewsProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [trackerRef, rootRef, isTrackerVisible] = useIntersectionObserver({ rootMargin: "150px 0px 0px 0px" });

  useEffect(() => {
    async function loadMore() {
      const hasNextPage = page * pageSize < totalItems;
      if (isTrackerVisible && hasNextPage && !loading) {
        try {
          setLoading(true);
          const response = await NewsAPI.topHeadlines({ page: page + 1, pageSize });
          setLoading(false);
          setArticles((articles) => [...articles, ...response.articles]);
          setPage((page) => page + 1);
        } catch (err) {
          console.error(err);
        }
      }
    }

    loadMore();
  }, [isTrackerVisible, page, pageSize, totalItems]);

  const hasNextPage = page * pageSize < totalItems;

  return (
    <div className="latest-news">
      <div className="latest-news__header">
        <FlashingCircleIcon className="text-primary" />
        <h2 className="text-default font-medium ml-3 mb-4">Latest news</h2>
      </div>
      <div ref={rootRef} className="latest-news__body pt-4">
        {articles.map(({ title, publishedAt }, index) => (
          <React.Fragment key={index}>
            <Card key={index}>
              <CardBody className={index === 0 ? "pt-0" : ""}>
                <span className="text-xs text-secondary font-bold">{formatDateToHoursAndMinutes(publishedAt)}</span>
                <p className="text-truncate font-medium">{title}</p>
              </CardBody>
            </Card>
            <Divider className="text-light-2" />
          </React.Fragment>
        ))}
        {hasNextPage && <div ref={trackerRef}></div>}
      </div>
      <div className="latest-news__footer p-4">
        <a href="#" className="text-secondary text-md font-medium">
          See All News
        </a>
      </div>
    </div>
  );
}
