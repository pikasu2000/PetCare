import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlicer";
import petsReducer from "../features/pets/petsSlicer";
import adminReducer from "../features/admin/adminSlice";
import userReducer from "../features/users/userSlicer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
    admin: adminReducer,
    users: userReducer,
  },
});
