import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UISlice",
  initialState: {
    loading: {
      section: "general",
      isLoading: false,
    },
    donation_amount: 0,
    profileEditMode: false,
    goalEditMode: false,
    formAlert: {
      type: "success",
      message: null,
    },
  },
  reducers: {
    isLoading: (state, action) => {
      state.loading = {
        section: action?.payload?.section ? action?.payload?.section : false,
        isLoading: true,
      };
    },
    finishLoading: (state) => {
      state.loading = false;
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
    setDonationAmount: (state, action) => {
      state.donation_amount = action.payload;
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
  setDonationAmount,
} = UISlice.actions;

export default UISlice.reducer;
