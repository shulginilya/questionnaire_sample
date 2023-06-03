import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/appStore/store";

export interface CounterState {
    value: number;
};

const initialState: CounterState = {
    value: 0
};

export const demoSlice = createSlice({
    name: "demo",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
});

export const { increment, decrement, incrementByAmount } = demoSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default demoSlice.reducer;
