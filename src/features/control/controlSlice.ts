import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export enum TimeStateEnum {
	STOPPED = "STOPPED",
	PLAYING = "PLAYING",
	PAUSED = "PAUSED",
}

export enum WorkStateEnum {
	POMODORO = "POMODORO",
	SHORT_BREAK = "SHORT_BREAK",
	LONG_BREAK = "LONG_BREAK",
}

interface ControlState {
	time: TimeStateEnum;
	work: WorkStateEnum;
	pomodoroCount: number;
}

const initialTimeState: ControlState = {
	time: TimeStateEnum.STOPPED,
	work: WorkStateEnum.POMODORO,
	pomodoroCount: 1,
};

export const controlSlice = createSlice({
	name: "control",
	initialState: initialTimeState,
	reducers: {
		play: (state) => {
			return {
				...state,
				time: TimeStateEnum.PLAYING,
			};
		},
		pause: (state) => {
			return {
				...state,
				time: TimeStateEnum.PAUSED,
			};
		},
		stop: (state) => {
			document.title = "Pomodoro";
			return {
				...state,
				time: TimeStateEnum.STOPPED,
			};
		},
		next: (state) => {
			switch (state.work) {
				case WorkStateEnum.POMODORO:
					if (state.pomodoroCount % 4 /*config.pomodorosBeforeLongBreak */ === 0) {
						// dispatch(setTime(config.LONG_BREAK));
						// dispatch(setWorkState(WorkStateEnum.LONG_BREAK));
						return {
							...state,
							work: WorkStateEnum.LONG_BREAK,
						};
					} else {
						// dispatch(setTime(config.SHORT_BREAK));
						// dispatch(setWorkState(WorkStateEnum.SHORT_BREAK));
						return {
							...state,
							work: WorkStateEnum.SHORT_BREAK,
						};
					}

				default:
					// dispatch(setTime(config.POMODORO));
					// dispatch(setWorkState(WorkStateEnum.POMODORO));
					return {
						...state,
						work: WorkStateEnum.POMODORO,
						pomodoroCount: state.pomodoroCount + 1,
						play: TimeStateEnum.PLAYING,
					};
			}
		},
		setWorkState: (state, action: PayloadAction<WorkStateEnum>) => {
			return {
				...state,
				work: action.payload,
			};
		},
	},
});

export const { play, pause, stop, next, setWorkState } = controlSlice.actions;
export const selectState = (state: RootState) => state.control;

export default controlSlice.reducer;
