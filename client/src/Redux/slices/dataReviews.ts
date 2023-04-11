import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";
import { IData } from "../../types/dataTypes";

interface DataReviewsState {
  data: IData[] | [];
}

const initialState: DataReviewsState = {
  data: [],
};

const dataReviewsSlice = createSlice({
  name: "dataReviews",
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataReviewsSlice.actions;

export const selectCount = (state: RootState) => state;

export default dataReviewsSlice.reducer;
