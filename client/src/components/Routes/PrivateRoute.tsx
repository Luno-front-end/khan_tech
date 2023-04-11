import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { FC, ReactNode } from "react";
import { RootState } from "../../Redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useSelector(
    (state: RootState) => state.adminAuth.adminAuth.isAuth
  );

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
