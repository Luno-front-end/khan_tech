import React, { FC } from "react";

import logo from "../../img/logo.svg";

export const Logo: FC = () => {
  return (
    <div className="wrapper-logo">
      <a href="#" className="link-logo">
        <img src={logo} alt="" className="icon-logo" width="140" height="56" />
      </a>
    </div>
  );
};
