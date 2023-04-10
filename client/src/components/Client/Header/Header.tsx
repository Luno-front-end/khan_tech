import React, { FC, useState } from "react";
import { Contac } from "./Contac";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { BurgerMenu } from "./BurgerMenu";

export const Header: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="wrapper-header">
        <div className="wrapper-info-header">
          <Logo />
          <Contac />
        </div>
        <Navigation isActive={isActive} setIsActive={setIsActive} />
        <BurgerMenu isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};
