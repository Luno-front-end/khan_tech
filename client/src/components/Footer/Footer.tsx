import React, { FC } from "react";
import { CompanyInfo } from "./CompanyInfo";
import { Departments } from "./Departments";
import { HeadOffice } from "./HeadOffice";
import { QuickLinks } from "./QuickLinks";

export const Footer: FC = () => {
  return (
    <div className="container">
      <div className="flex-box">
        <Departments />
        <QuickLinks />
        <HeadOffice />
        <CompanyInfo />
      </div>
      <p className="copyright">©2021 All Rights Reserved</p>
    </div>
  );
};
