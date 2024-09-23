import React from "react";

import { FlashingCircleIcon } from "../../../ui/icon/Icon";
import { Card, CardBody } from "../../../ui/card/Card";
import { Divider } from "../../../ui/divider/Divider";
import { NewsAPIArticle } from "../../../api/news-api";
import { formatHoursAndMinutes } from "../../../utils/format-date";

export interface LatestNewsProps {
  articles: NewsAPIArticle[];
}

export function LatestNews({ articles }: LatestNewsProps) {
  return (
    <div className="latest-news">
      <div className="latest-news__header">
        <FlashingCircleIcon className="text-primary" />
        <h2 className="text-default font-medium ml-3">Latest news</h2>
      </div>
      <div className="latest-news__body">
        {articles.map(({ title, publishedAt }, index) => (
          <React.Fragment key={index}>
            <Card key={index}>
              <CardBody>
                <span className="text-xs text-secondary font-bold">{formatHoursAndMinutes(publishedAt)}</span>
                <p className="text-truncate font-medium">{title}</p>
              </CardBody>
            </Card>
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
  );
}
