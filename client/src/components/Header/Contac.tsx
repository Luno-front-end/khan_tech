import React, { FC } from "react";

export const Contac: FC = () => {
  return (
    <div className="wrapper-contact-header">
      <p className="contact-header-text">Need Help?</p>
      <a href="tel:(514) 543-9936" className="contact-header-link">
        (514) 543-9936
      </a>
    </div>
  );
};
