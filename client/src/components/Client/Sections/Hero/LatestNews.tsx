import React, { FC } from "react";

export const LatestNews: FC = () => {
  return (
    <div className="wrapper-news">
      <h3 className="news-header">Our Latest News</h3>
      <div className="box-news">
        <p className="text-news">Basic Swedish Back Massage Techniques</p>
        <p className="date-news">28 Feb 2021</p>
      </div>
      <div className="box-news">
        <p className="text-news">How to Learn Coding for Beginners</p>
        <p className="date-news">28 Feb 2021</p>
      </div>
      <div className="box-news">
        <p className="text-news">Google’s Influence Over Think Tanks</p>
        <p className="date-news">28 Feb 2021</p>
      </div>
    </div>
  );
};
