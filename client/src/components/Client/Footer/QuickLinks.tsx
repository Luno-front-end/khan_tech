import React, { FC } from "react";

export const QuickLinks: FC = () => {
  return (
    <div className="wrapper-quick-links">
      <h2 className="header-list-footer">Quick Links</h2>
      <ul className="list-footer">
        <li className="item-footer">
          <a href="" className="link-footer">
            What do we do?
          </a>
        </li>
        <li className="item-footer">
          <a href="" className="link-footer">
            Our expertise
          </a>
        </li>
        <li className="item-footer">
          <a href="" className="link-footer">
            Request an Appointment
          </a>
        </li>
        <li className="item-footer">
          <a href="" className="link-footer">
            Book with a Specialist
          </a>
        </li>
      </ul>
    </div>
  );
};
