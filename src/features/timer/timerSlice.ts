import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface TimerState {
	time: number;
}

const initialState: TimerState = {
	time: 0,
};

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		tick: (state) => {
			state.time -= 1;
		},
		setTime: (state, action: PayloadAction<number>) => {
			state.time = action.payload;
		},
	},
});

export const { tick, setTime } = timerSlice.actions;
export const selectTime = (state: RootState) => state.counter.value;
export default timerSlice.reducer;
