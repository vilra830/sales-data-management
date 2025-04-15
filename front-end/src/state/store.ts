import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./sales-data/productSlice";
import inventoryReducer from "./sales-data/inventorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
