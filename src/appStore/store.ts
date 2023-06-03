import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import demoReducer from "./reducers/demo";

export const store = configureStore({
    reducer: {
        counter: demoReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
