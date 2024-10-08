
import reducers from "./rootReducers";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;