import React, { FC } from "react";

import svg from "../../../img/sprite.svg";

export const CompanyInfo: FC = () => {
  return (
    <div className="wrapper-company-info">
      <svg className="icon-logo-footer">
        <use href={`${svg}#logo`}></use>
      </svg>
      <p className="text-info-company">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit
        tincidunt ut sed. Velit euismod integer convallis ornare eu.
      </p>
    </div>
  );
};
