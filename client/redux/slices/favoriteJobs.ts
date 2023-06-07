import { createSlice } from "@reduxjs/toolkit";

// 都只存vacancyId
const initialState: { data: string[] } = {
  data: []
}

export type FavoriteJobs = string[]

const favoriteJobs = createSlice({
  name: "favoriteJobs",
  initialState,
  reducers: {
    setFavoriteJobs(state, action) {
      const { favoriteJobIds } = action.payload
      state.data = favoriteJobIds
    },
    newFavoriteJob(state, action) {
      const { vacancyId } = action.payload
      let newArr = state.data
      newArr.push(vacancyId)
      state.data = newArr
    },
    deleteFavoriteJob(state, action) {
      const { vacancyId } = action.payload
      state.data.filter((vacancyId_) => vacancyId_ !== vacancyId)
    },
    cleanFavoriteJobs: () => initialState,
  }
})

export const { setFavoriteJobs, newFavoriteJob, deleteFavoriteJob, cleanFavoriteJobs } = favoriteJobs.actions
export const favoriteJobsReducer = favoriteJobs.reducer