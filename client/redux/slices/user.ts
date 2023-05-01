import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  name: "",
  role: "",
  imageURL: "",
  email: "",
  phone: "",
  isValid: false
};

export interface User {
  id: string;
  username: string;
  name: string;
  role: "STUDENT_USER" | "COMPANY_USER" | "STUDENT" | "COMPANY" | "TEACHER";
  email: string;
  phone: string;
  imageURL: string;
  isValid: boolean; //是否被認證過
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const { id, username, name, role, email, phone, imageURL, isValid } = action.payload;
      state.id = id;
      state.username = username;
      state.name = name;
      state.role = role;
      state.email = email;
      state.phone = phone;
      state.imageURL = imageURL;
      state.isValid = isValid
    },

    cleanUser: () => initialState,
  },
});

export const { setUser, cleanUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
