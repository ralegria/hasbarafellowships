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
    isLoading: (state, action) => {
      state.loading = {
        section: action?.payload?.section
          ? action?.payload?.section
          : initialState.loading.section,
        isLoading: true,
      };
    },
    finishLoading: (state) => {
      state.loading = initialState.loading;
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
  isLoading,
  finishLoading,
  switchProfileEditMode,
  switchGoalEditMode,
  setNewFormAlert,
} = UISlice.actions;

export default UISlice.reducer;
