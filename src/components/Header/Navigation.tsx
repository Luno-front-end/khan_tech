import React, { FC } from "react";

const itemNav = [
  { name: "Home", subMenu: null },
  { name: "Services", subMenu: null },
  { name: "About", subMenu: null },
  { name: "Book now", subMenu: null },
  { name: "Shop", subMenu: null },
  { name: "Blog", subMenu: null },
  { name: "Contact", subMenu: null },
];

export const Navigation: FC = () => {
  return (
    <div className="wrapper-nav">
      <ul className="list-nav">
        {itemNav.map((item, i) => (
          <li className="item-nav" key={i}>
            <a href="#" className="link-nav">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
