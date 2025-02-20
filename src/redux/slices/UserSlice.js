import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogged: false,
  info: {},
  goal: {
    collected: 0,
    expected: 0,
    percentage: 0,
  },
};
export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLogStatus: (state, action) => {
      state.isLogged = action.payload;
    },
    setUserInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    setGoal: (state, action) => {
      state.goal = {
        ...state.goal,
        ...action.payload,
        percentage: (state.goal.collected / state.goal.expected) * 100,
      };
    },
    setEmptyGoal: (state) => {
      state.goal = initialState.goal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, setGoal, setEmptyGoal, setLogStatus } =
  UserSlice.actions;

export default UserSlice.reducer;
