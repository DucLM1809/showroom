import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
  };
  phone: string;
}

// interface UserProps {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   avatarUrl: string;
//   isActive: boolean;
//   isActivate: boolean;
//   authMethod:"NORMAL" | "";
//   createdAt: string;
//   updatedAt: string;
// }

interface UserState {
  users: UserProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<UserProps[]>) {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
