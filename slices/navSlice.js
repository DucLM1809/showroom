import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSignedIn: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload
    }
  }
})

export const { setIsSignedIn } = navSlice.actions

export const selectIsSignedIn = (state) => state.nav.isSignedIn

export default navSlice.reducer
