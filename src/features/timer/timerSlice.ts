import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "app/store";
import { next } from "features/control/controlSlice";
import { calculateTime } from "features/timer/utils";

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
		tickReducer: (state) => {
			const newTime = state.time - 1;
			document.title = calculateTime(newTime).toString();
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
});

export const { tickReducer, setTime } = timerSlice.actions;
export const selectTime = (state: RootState) => state.timer;
export const tick = () => (dispatch: AppDispatch, getState: () => RootState) => {
	const time = selectTime(getState());
	if (time.time > 0) {
		dispatch(tickReducer());
	} else {
		dispatch(next());
	}
};

export default timerSlice.reducer;
