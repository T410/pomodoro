import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { calculateTime } from "features/timer/utils";
import { stop } from "features/control/controlSlice";

interface TimerState {
	time: number;
}

const initialTimerState: TimerState = {
	time: 0,
};

export const timerSlice = createSlice({
	name: "timer",
	initialState: initialTimerState,
	reducers: {
		tick: (state) => {
			const newTime = state.time - 1;
			document.title = calculateTime(newTime - 1).toString();
			return {
				...state,
				time: newTime,
			};
		},
		setTime: (state, action: PayloadAction<number>) => {
			return {
				...state,
				time: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(stop, (state) => {
			return {
				...state,
				time: 0,
			};
		});
	},
});

export const { tick, setTime } = timerSlice.actions;
export const selectTime = (state: RootState) => state.timer;

export default timerSlice.reducer;
