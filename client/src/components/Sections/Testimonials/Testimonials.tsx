import React, { FC, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";

import avatarPng from "../../../img/avatar.png";
import pag from "../../../img/Pag.png";
import Api from "../../../Api/getEmployees";

export const Testimonials: FC = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Api.getEmployees().then(({ data }) => {
          setData(data.data);
          setCount(data.count);
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

  console.log(data);
  console.log(count);

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="header-testimonials">Testimonials</h2>
        <ul className="list-comment">
          {data.map(
            ({
              id,
              employee,
              employees_position,
              reviewer,
              rating,
              review,
            }) => (
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
                    <p className="rating">★★★★★ {rating}</p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <img src={pag} alt="" />
      </div>
    </section>
  );
};
