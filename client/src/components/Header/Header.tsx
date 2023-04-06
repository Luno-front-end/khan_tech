import React, { FC } from "react";
import { Contac } from "./Contac";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Header: FC = () => {
  return (
    <div className="container">
      <div className="wrapper-header">
        <div className="wrapper-info-header">
          <Logo />
          <Contac />
        </div>
        <Navigation />
      </div>
    </div>
  );
};
