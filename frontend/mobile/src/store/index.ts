import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import loaderReducer from "./slices/loaderSlice";
import weatherReducer from "./slices/weatherSlice";

const store = configureStore({
  reducer: {
    location: locationReducer,
    loader: loaderReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
