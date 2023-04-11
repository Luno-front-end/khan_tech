import React, { FC, useEffect, useRef, useState } from "react";

import avatarPng from "../../../../img/avatar.png";
import Api from "../../../../Api/getEmployees";
import { PaginationFC } from "./Pagination";
import { RatingFC } from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { setData } from "../../../../Redux/slices/dataReviews";

const Testimonials: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [allPage, setAllPage] = useState<number>(0);
  const data = useSelector((state: RootState) => state.data.data);
  const dispatch = useDispatch();

  const ratingValue = useRef<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Api.getEmployees(page).then(({ data }) => {
          dispatch(setData(data.data));
          setAllPage(data.pages);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const dataEls = (ratingValue.current = ratingValue.current.slice(
      0,
      data.length
    ));

    for (let i = 0; i < dataEls.length; i++) {
      const curreentWidth = data[i].rating / 0.05;

      dataEls[i].style.width = `${curreentWidth}%`;
    }
  }, [data]);

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="header-testimonials">Testimonials</h2>
        {data.length !== 0 ? (
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
                    <img
                      src={avatarPng}
                      alt="icon user"
                      className="icon-user"
                    />
                    <div>
                      <p className="user-name-rating">{reviewer}</p>

                      <RatingFC value={rating} />
                      <p className="rating_">{rating}</p>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No records</p>
        )}

        <div className="wrapper-pagination">
          <PaginationFC allPage={allPage} setData={setData} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
