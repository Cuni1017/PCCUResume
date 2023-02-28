import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";

import { User } from "./slices/user";

export interface Store {
  user: User;
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export * from "./slices/user";
