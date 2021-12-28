import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 1,
};

export const counterSlice = createSlice({
	name: "timeControl",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		set: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

export const { increment, set } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
