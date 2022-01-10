import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../app/store";
import { setTime } from "../timer/timerSlice";
import { ConfigState } from "../config/configSlice";

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

interface WithConfig extends PayloadAction<ConfigState | undefined> {
	config?: ConfigState;
}

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
		nextAction: (state, action: WithConfig) => {
			switch (state.work) {
				case WorkStateEnum.POMODORO:
					const pomodorosBeforeLongBreak = action.config?.pomodorosBeforeLongBreak ?? 4;
					if (state.pomodoroCount % pomodorosBeforeLongBreak === 0) {
						return {
							...state,
							work: WorkStateEnum.LONG_BREAK,
						};
					} else {
						return {
							...state,
							work: WorkStateEnum.SHORT_BREAK,
						};
					}

				default:
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

export const { play, pause, stop, nextAction, setWorkState } = controlSlice.actions;
export const selectState = (state: RootState) => state.control;
export const next = () => (dispatch: AppDispatch, getState: () => RootState) => {
	dispatch(nextAction());
	const workState = getState().control.work;
	const config = getState().config;
	dispatch(setTime(config[workState]));
};

export default controlSlice.reducer;
