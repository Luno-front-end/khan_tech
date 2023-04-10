import React, { FC, useEffect, useMemo, useRef, useState } from "react";

import axios, { AxiosResponse } from "axios";
import svg from "../../../img/sprite.svg";

import avatarPng from "../../../img/avatar.png";
import pag from "../../../img/Pag.png";
import Api from "../../../Api/getEmployees";
import { PaginationFC } from "./Pagination";
interface Data {
  id: number;
  rating: number;
  employee: string;
  employees_position: string;
  reviewer: string;
  review: string;
}

export const Testimonials: FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [allPage, setAllPage] = useState<number>(0);

  const ratingValue = useRef<any>([]);

  // const [page, setPage] = useState({ count: 0, from: 0, to: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Api.getEmployees(page).then(({ data }) => {
          setData(data.data);
          setAllPage(data.pages);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      setData([]);
    };
  }, []);

  useEffect(() => {
    // data.forEach(({rating}) => {
    // const curreentWidth = rating /0.5
    // ratingValue.current.style.width = `${curreentWidth}`;
    // })
    // console.log();

    const dataEls = (ratingValue.current = ratingValue.current.slice(
      0,
      data.length
    ));

    for (let i = 0; i < dataEls.length; i++) {
      const curreentWidth = data[i].rating / 0.05;

      console.log(dataEls[i].style.width);

      dataEls[i].style.width = `${curreentWidth}%`;
      // data[i].rating
    }

    // dataEls.forEach((item: any) => {
    //   item.style.width = "123"

    // });
  }, [data]);

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="header-testimonials">Testimonials</h2>
        <ul className="list-comment">
          {data.map(
            (
              { id, employee, employees_position, reviewer, rating, review },
              index
            ) => (
              <li className="item-comment" key={id}>
                <div className="comment">
                  <p className="user-name-comment">{employee}</p>
                  <p className="user-work">{employees_position}</p>
                  <p className="user-comment">{review}</p>
                </div>
                <div className="wrapper-user-rating">
                  <img src={avatarPng} alt="icon user" className="icon-user" />
                  <div>
                    <p className="user-name-rating">{reviewer}</p>
                    <div className="rating">
                      <div className="rating-body">
                        <div
                          ref={(el) =>
                            (ratingValue.current[index] = el as HTMLDivElement)
                          }
                          className="rating-active"
                        ></div>
                        <svg className="icon_star">
                          <use href={`${svg}#icon_star`}></use>
                        </svg>
                      </div>
                      <p className="rating_">{rating}</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <div className="wrapper-pagination">
          <PaginationFC allPage={allPage} setPage={setPage} setData={setData} />
        </div>
        {/* Додайте сюди контент вашого компонента */}

        {/* <Pagination /> */}
      </div>
    </section>
  );
};
