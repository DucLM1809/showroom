import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice'
import userReducer from "./slices/usersSlice"

export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userReducer,
  }
})
