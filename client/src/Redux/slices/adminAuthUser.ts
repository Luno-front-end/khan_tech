import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";
import { IAdmin } from "../../types/adminDtaTypes";

interface AdminAuthState {
  isAuth: boolean;
  token: string;
  user: IAdmin[];
}

const initialState: AdminAuthState = {
  isAuth: false,
  token: "",
  user: [],
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: initialState,
  reducers: {
    auth: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.isAuth = true;
      state.user = action.payload.user;
    },
  },
});

export const { auth } = adminAuthSlice.actions;

export const selectCount = (state: RootState) => state;

export default adminAuthSlice.reducer;
