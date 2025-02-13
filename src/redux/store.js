import { configureStore } from "@reduxjs/toolkit";

import UISlice from "./slices/UISlice";
import UserSlice from "./slices/UserSlice";
import DonationSlice from "./slices/DonationSlice";

export default configureStore({
  reducer: {
    UI: UISlice,
    user: UserSlice,
    donations: DonationSlice,
  },
});
