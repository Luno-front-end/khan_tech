import React, { Dispatch, SetStateAction, useState } from "react";
import { useOnScroll } from "./useOnScroll";

export const useDropdown = () => {
  const [isActiveDropdownService, setIsActiveDropdownService] = useState(false);
  const [isActiveDropdownSubService, setIsActiveDropdownSubService] =
    useState(false);
  const [isActiveDropdownAbout, setIsActiveDropdownAbout] = useState(false);
  const [isActiveDropdownShop, setIsActiveDropdownShop] = useState(false);

  const { onScroll } = useOnScroll();

  const onDropdown = (e: any) => {
    e.preventDefault();
    const textEl = e.target.textContent;
    if (textEl !== "About") setIsActiveDropdownAbout(false);
    if (textEl !== "Shop") setIsActiveDropdownShop(false);
    if (textEl !== "Services") setIsActiveDropdownService(false);

    switch (textEl) {
      case "Services":
        setIsActiveDropdownService(!isActiveDropdownService);

        break;
      case "About":
        setIsActiveDropdownAbout(!isActiveDropdownAbout);

        break;
      case "Shop":
        setIsActiveDropdownShop(!isActiveDropdownShop);

        break;
      case "Sub-Menu 2":
        setIsActiveDropdownSubService(!isActiveDropdownSubService);

        break;

      default:
        break;
    }
  };

  const handleClickService = (
    e: any,
    name: string,
    serviceDropdownItem: string[],
    setActive: Dispatch<SetStateAction<string>>
  ) => {
    switch (name) {
      case serviceDropdownItem[0]:
        setActive(serviceDropdownItem[0]);

        break;
      case serviceDropdownItem[1]:
        setActive(serviceDropdownItem[1]);
        setIsActiveDropdownSubService(!isActiveDropdownSubService);

        break;
      case serviceDropdownItem[2]:
        setActive(serviceDropdownItem[2]);

        break;
      case serviceDropdownItem[3]:
        setActive(serviceDropdownItem[3]);

        break;

      default:
        break;
    }
  };

  const handleClickNavigation = (
    e: any,
    name: string,
    itemNav: string[],
    setActive: Dispatch<SetStateAction<string>>,
    onCloseMenuItem: () => void
  ) => {
    onDropdown(e);
    switch (name) {
      case itemNav[0]:
        setActive(itemNav[0]);
        onCloseMenuItem();
        onScroll();

        break;
      case itemNav[1]:
        setActive(itemNav[1]);

        break;
      case itemNav[2]:
        setActive(itemNav[2]);

        break;
      case itemNav[3]:
        setActive(itemNav[3]);
        onCloseMenuItem();
        onScroll();

        break;
      case itemNav[4]:
        setActive(itemNav[4]);

        break;
      case itemNav[5]:
        setActive(itemNav[5]);
        onCloseMenuItem();
        onScroll();

        break;
      case itemNav[6]:
        setActive(itemNav[6]);
        onCloseMenuItem();
        onScroll();

        break;

      default:
        break;
    }
  };

  const checkDropdownItemClass = (active: string, itemNav: string[]) => {
    if (
      (active === itemNav[1] && isActiveDropdownService) ||
      (active === itemNav[2] && isActiveDropdownAbout) ||
      (active === itemNav[4] && isActiveDropdownShop)
    )
      return "activeDropdown";
    else if (
      active === itemNav[0] ||
      active === itemNav[3] ||
      active === itemNav[5] ||
      active === itemNav[6]
    )
      return "active";
  };

  const checkDropdownItemMobClass = (active: string, itemNav: string[]) => {
    if (
      (active === itemNav[1] && isActiveDropdownService) ||
      (active === itemNav[2] && isActiveDropdownAbout) ||
      (active === itemNav[4] && isActiveDropdownShop)
    )
      return `item-nav active-mob${active}`;
    else return "item-nav";
  };

  return {
    isActiveDropdownService,
    isActiveDropdownSubService,
    isActiveDropdownAbout,
    isActiveDropdownShop,
    setIsActiveDropdownSubService,
    handleClickService,
    checkDropdownItemClass,
    checkDropdownItemMobClass,
    handleClickNavigation,
  };
};
