import React, { useEffect } from "react";
import { Main } from "./Admin/Main";
import Api from "../Api/getEmployees";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { auth } from "../Redux/slices/adminAuthUser";

export const Admin = () => {
  const infoUser = useSelector((state: RootState) => state.adminAuth.adminAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    Api.auth(infoUser.token)
      .then((res) => dispatch(auth(res)))
      .catch((err) => console.log(err));
  }, []);

  return <Main />;
  // return <SignIn />;
};
