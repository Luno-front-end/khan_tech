import React from "react";

import svg from "../../img/sprite.svg";

export const HeadOffice = () => {
  return (
    <div className="wrapper-head-office">
      <h2 className="header-list-footer">Head Office</h2>
      <ul>
        <li className="item-office">
          <svg className="icon-pin">
            <use href={`${svg}#icon_pin`}></use>
          </svg>
          <a href="#" className="link-footer">
            <address>4517 Washington Ave. Manchester, Kentucky 39495</address>
          </a>
        </li>
        <li className="item-office">
          <svg className="icon-email">
            <use href={`${svg}#icon_email`}></use>
          </svg>
          <a href="mailto:darrell@mail.com" className="link-footer">
            darrell@mail.com
          </a>
        </li>
        <li className="item-office">
          <svg className="icon-phone">
            <use href={`${svg}#icon_phone`}></use>
          </svg>
          <a href="tel:(671) 555-0110" className="link-footer">
            (671) 555-0110
          </a>
        </li>
      </ul>
    </div>
  );
};
