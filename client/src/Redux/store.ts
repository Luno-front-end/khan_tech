import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminAuthReducers from "./slices/adminAuthUser";

const customMidleware = getDefaultMiddleware({ serializableCheck: false });

const adminReducer = combineReducers({ adminAuth: adminAuthReducers });
const persistUserConfig = { key: "userAuth", storage: storage };
const psAdminReducers = persistReducer(persistUserConfig, adminReducer);

export const store = configureStore({
  reducer: {
    adminAuth: psAdminReducers,
  },
  middleware: customMidleware,
});

export type RootState = ReturnType<typeof store.getState>;
export const psStore = persistStore(store);
export type AppDispatch = typeof store.dispatch;
