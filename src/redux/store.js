import { configureStore } from "@reduxjs/toolkit";

import UISlice from "./slices/UISlice";
import UserSlice from "./slices/UserSlice";

export default configureStore({
  reducer: {
    UI: UISlice,
    user: UserSlice,
  },
});
