import React from "react";

export const useOnScroll = () => {
  const onScroll = () => {
    const body = document.querySelector("body");
    body!.classList.toggle("block-scroll");
  };
  return { onScroll };
};
