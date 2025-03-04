import { createSlice } from "@reduxjs/toolkit";

export const DonationSlice = createSlice({
  name: "DonationSlice",
  initialState: {
    amount: 0,
  },
  reducers: {
    setDonationAmount: (state, action) => {
      console.log(action.payload, { ...state, amount: action.payload });

      state.amount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDonationAmount } = DonationSlice.actions;

export default DonationSlice.reducer;
