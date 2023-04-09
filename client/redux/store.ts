import { configureStore } from "@reduxjs/toolkit";
import { User, userReducer } from "./slices/user";
import { AppLoading, appLoadingReducer } from "./slices/appLoading";

export interface Store {
  user: User;
  appLoading: AppLoading
}

const store = configureStore({
  reducer: {
    user: userReducer,
    appLoading: appLoadingReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from "./slices/user";
export * from "./slices/appLoading"
