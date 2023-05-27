import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import loadersReduces from "./loadersSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    loaders: loadersReduces,
  },
});

export default store;
