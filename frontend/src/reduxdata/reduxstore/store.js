import { configureStore } from "@reduxjs/toolkit";
import sceneReducer from "./reduxslice";

export const store = configureStore({
  reducer: {
    appScene: sceneReducer,
  },
});