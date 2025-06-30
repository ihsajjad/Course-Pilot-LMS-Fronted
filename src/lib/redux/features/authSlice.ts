import { CurrentUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: CurrentUser;
  isLoading: boolean;
}

const initialState: InitialState = {
  user: {
    _id: "",
    email: "",
    name: "",
    role: "User",
    profile: "",
    enrolledCourses: [],
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitialState>) => {
      state.user = action.payload.user;
      state.isLoading = action.payload.isLoading;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.isLoading = initialState.isLoading;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;