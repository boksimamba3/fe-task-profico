import React from "react";
import { FlashingCircleIcon } from "../ui/icon/Icon";
import { Skeleton } from "../ui/skeleton/Skeleton";
import { Divider } from "../ui/divider/Divider";
import { Card, CardBody, CardFooter, CardImage } from "../ui/card/Card";

export default function HomePage() {
  return (
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
          /*  <Skeleton key={index} style={{ height: "100%" }}></Skeleton> */
          <Card key={index}>
            <CardImage
              src="https://ip.index.hr/remote/bucket.index.hr/b/index/9da1b2ef-dd33-4855-9093-0586b4f7ea4c.jpg?width=765&height=402"
              alt="Article Image"
            />
            <CardBody>
              <span className="text-xs font-bold text-secondary">Category</span>
              <h3 className="text-default font-medium">
                6 Powerful Tips To Creating Testimonials That Sell Your Products
              </h3>
            </CardBody>
            <CardFooter>
              <p className="text-sm text-dark-2">John Doe</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
