import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: {
    section: "general",
    isLoading: false,
  },
  profileEditMode: false,
  goalEditMode: false,
  formAlert: {
    type: "success",
    message: null,
  },
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    switchLoading: (state, action) => {
      state.loading = {
        section: action?.payload?.section ?? initialState.loading.section,
        isLoading: !state.loading.isLoading,
      };
    },
    switchProfileEditMode: (state) => {
      state.profileEditMode = !state.profileEditMode;
    },
    switchGoalEditMode: (state) => {
      state.goalEditMode = !state.goalEditMode;
    },
    setNewFormAlert: (state, action) => {
      state.formAlert = { ...state.formAlert, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  switchLoading,
  switchProfileEditMode,
  switchGoalEditMode,
  setNewFormAlert,
} = UISlice.actions;

export default UISlice.reducer;
