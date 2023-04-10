import React, { FC, useState } from "react";
import svg from "../../../img/sprite.svg";
import { SubServiceDropdown } from "./SubServiceDropdown";
import { useDropdown } from "../../../hook/useDropdown";

const serviceDropdownItem = [
  "Sub-Menu 1",
  "Sub-Menu 2",
  "Turpis consectetur 3",
  "Luctus neque frin 4",
];

export const ServiceDropdown: FC = () => {
  const [active, setActive] = useState<any>("");
  const { isActiveDropdownSubService, handleClickService } = useDropdown();

  return (
    <div className="deopdown-service">
      <ul className="service-listD">
        {serviceDropdownItem.map((item, i) => (
          <li className="service-itemD" key={i}>
            <a
              href="#"
              className={
                active === item ? "link-serviceD active" : "link-serviceD"
              }
              onClick={(e) =>
                handleClickService(e, item, serviceDropdownItem, setActive)
              }
            >
              <span>{item}</span>
              <svg className="icon-arrowD">
                <use href={`${svg}#icon_arrow`}></use>
              </svg>
            </a>
          </li>
        ))}
      </ul>
      {isActiveDropdownSubService && <SubServiceDropdown />}
    </div>
  );
};
