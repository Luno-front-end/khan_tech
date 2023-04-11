import React, { FC } from "react";

import svg from "../../../img/sprite.svg";

export const Logo: FC = () => {
  return (
    <div className="wrapper-logo">
      <a href="#" className="link-logo">
        <svg className="icon-logo">
          <use href={`${svg}#logo`}></use>
        </svg>
      </a>
    </div>
  );
};
