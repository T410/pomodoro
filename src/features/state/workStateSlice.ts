import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export enum WorkStateEnum {
	POMODORO = "POMODORO",
	SHORT_BREAK = "SHORT_BREAK",
	LONG_BREAK = "LONG_BREAK",
}

interface WorkState {
	state: WorkStateEnum;
}

const initialState: WorkState & { currentPomodoroCount: number } = {
	state: WorkStateEnum.POMODORO,
	currentPomodoroCount: 1,
};

export const workState = createSlice({
	name: "workState",
	initialState,
	reducers: {
		setWorkState: (state, action: PayloadAction<WorkStateEnum>) => {
			state.state = action.payload;
		},
		incrementPomodoro: (state) => {
			state.currentPomodoroCount++;
		},
	},
});

export const { setWorkState, incrementPomodoro } = workState.actions;
export const selectWorkState = (state: RootState) => state.timeControl.state;
export default workState.reducer;
