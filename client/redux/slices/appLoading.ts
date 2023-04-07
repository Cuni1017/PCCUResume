import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false
}

export interface AppLoading {
  isLoading: boolean
}

const appLoadingSlice = createSlice({
  name: "appLoading",
  initialState: initialState,
  reducers: {
    setIsAppLoading(state, action) {
      const { isLoading } = action.payload
      state.isLoading = isLoading;
    },

    cancelAppIsLoading: () => initialState
  }
})

export const { setIsAppLoading, cancelAppIsLoading } = appLoadingSlice.actions
export const appLoadingReducer = appLoadingSlice.reducer