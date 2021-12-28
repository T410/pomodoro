import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { WorkStateEnum } from "../state/workStateSlice";

interface ConfigState {
	[WorkStateEnum.POMODORO]: number;
	[WorkStateEnum.SHORT_BREAK]: number;
	[WorkStateEnum.LONG_BREAK]: number;
	pomodorosBeforeLongBreak: number;
}

const initialState: ConfigState = {
	[WorkStateEnum.POMODORO]: 25 * 60,
	[WorkStateEnum.SHORT_BREAK]: 5 * 60,
	[WorkStateEnum.LONG_BREAK]: 15 * 60,
	pomodorosBeforeLongBreak: 4,
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setDurations: (state, action: PayloadAction<{ [key in keyof typeof WorkStateEnum]: number }>) => {
			for (const key in action.payload) {
				state[WorkStateEnum[key as WorkStateEnum]] = action.payload[key as WorkStateEnum] * 60;
			}
		},
		setPomodorosBeforeLongBreak: (state, action: PayloadAction<number>) => {
			state.pomodorosBeforeLongBreak = action.payload;
		},
	},
});

export const { setDurations, setPomodorosBeforeLongBreak } = configSlice.actions;
export const selectPomodoroDuration = (state: RootState) => state.config[WorkStateEnum.POMODORO];
export const selectShortBreakDuration = (state: RootState) => state.config[WorkStateEnum.SHORT_BREAK];
export const selectLongBreakDuration = (state: RootState) => state.config[WorkStateEnum.LONG_BREAK];
export const selectPomodorosBeforeLongBreak = (state: RootState) => state.config.pomodorosBeforeLongBreak;
export default configSlice.reducer;
