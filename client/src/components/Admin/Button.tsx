import React, { FC, ReactNode, RefObject } from "react";

interface ButtonProps {
  children: ReactNode;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, isDisabled }) => {
  return (
    <button type="submit" className={className} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};
