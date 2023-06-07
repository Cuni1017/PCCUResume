import { configureStore } from "@reduxjs/toolkit";
import { User, userReducer } from "./slices/user";
import { AppLoading, appLoadingReducer } from "./slices/appLoading";
import { FavoriteJobs, favoriteJobsReducer } from "./slices/favoriteJobs"

export interface Store {
  user: User;
  appLoading: AppLoading
  favoriteJobs: FavoriteJobs
}

const store = configureStore({
  reducer: {
    user: userReducer,
    appLoading: appLoadingReducer,
    favoriteJobs: favoriteJobsReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from "./slices/user";
export * from "./slices/appLoading"
