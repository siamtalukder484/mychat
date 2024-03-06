import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import activeUserSlice from './slices/activeUserSlice'

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice,
    activeuserdata: activeUserSlice,
  },
})