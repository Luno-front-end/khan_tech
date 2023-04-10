import React, { Dispatch, FC, SetStateAction, useState } from "react";
import svg from "../../../img/sprite.svg";
import { useDropdown } from "../../../hook/useDropdown";
import { ServiceDropdown } from "../Dorpdown/ServiceDropdown";

const itemNav = [
  "Home",
  "Services",
  "About",
  "Book now",
  "Shop",
  "Blog",
  "Contact",
];

interface NavigationProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const Navigation: FC<NavigationProps> = ({ isActive, setIsActive }) => {
  const [active, setActive] = useState<any>("Home");
  const {
    isActiveDropdownService,
    checkDropdownItemMobClass,
    checkDropdownItemClass,
    handleClickNavigation,
  } = useDropdown();

  const onCloseMenuItem = () => {
    setIsActive(false);
  };

  return (
    <div className={isActive ? "wrapper-nav active-mob-menu" : "wrapper-nav "}>
      <ul className="list-nav">
        {itemNav.map((item, i) => (
          <li
            className={
              active === item
                ? checkDropdownItemMobClass(active, itemNav)
                : "item-nav"
            }
            key={i}
          >
            <a
              href="#"
              className={
                active === item
                  ? `link-nav ${checkDropdownItemClass(active, itemNav)}`
                  : "link-nav"
              }
              onClick={(e) =>
                handleClickNavigation(
                  e,
                  item,
                  itemNav,
                  setActive,
                  onCloseMenuItem
                )
              }
            >
              {item}
              <svg className="icon-arrow">
                <use href={`${svg}#icon_arrow`}></use>
              </svg>
            </a>
          </li>
        ))}
      </ul>

      {isActiveDropdownService && <ServiceDropdown />}
    </div>
  );
};
