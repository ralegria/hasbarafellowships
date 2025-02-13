import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  amount: 0,
};
export const DonationSlice = createSlice({
  name: "DonationSlice",
  initialState,
  reducers: {
    setDonationAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDonationAmount } = DonationSlice.actions;

export default DonationSlice.reducer;
