import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  name: "",
  role: "",
  imageURL: "",
};

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  imageURL: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const { id, username, name, role, imageURL } = action.payload;
      state.id = id;
      state.username = username;
      state.name = name;
      state.role = role;
      state.imageURL = imageURL;
    },

    cleanUser: () => initialState,
  },
});

export const { setUser, cleanUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
