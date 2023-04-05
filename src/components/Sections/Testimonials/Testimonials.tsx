import React, { FC } from "react";

import avatarPng from "../../../img/avatar.png";

export const Testimonials: FC = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>Testimonials</h2>

        <ul>
          <li className="wrapper-comment">
            <div className="comment">
              <p>Jane Cooper</p>
              <p>CTO - Dovas Inc.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
                nec, egestas neque ipsum duis habitasse enim. Id ullamcorper at
                posuere mauris adipiscing aliquet risus. Malesuada amet.
              </p>
            </div>
            <div>
              <img src={avatarPng} alt="" />
              <p>Dianne Russell</p>
              <p>★★★★★</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
