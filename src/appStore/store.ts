import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import questionsReducer from "@/appStore/reducers/questionsSlice";

export const store = configureStore({
    reducer: {
        questionnaire: questionsReducer,
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
