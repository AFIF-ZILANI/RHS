"use client";

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './features/registerSlice/slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        registerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const AppSelector : TypedUseSelectorHook<RootState> = useSelector