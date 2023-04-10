import React, { FC } from "react";
import { useDropdown } from "../../../hook/useDropdown";

const serviceDropdownItem = [
  "Turpis consectetur 3",
  "Senectus cursus pretium malesuada.",
  "Luctus neque frin 4",
];

export const SubServiceDropdown: FC = () => {
  const { setIsActiveDropdownSubService, isActiveDropdownSubService } =
    useDropdown();

  return (
    <div className="deopdown-subService">
      <ul className="service-listD">
        {serviceDropdownItem.map((item, i) => (
          <li className="service-itemD" key={i}>
            <a
              href="#"
              className="link-subServiceD"
              onClick={() =>
                setIsActiveDropdownSubService(!isActiveDropdownSubService)
              }
            >
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
