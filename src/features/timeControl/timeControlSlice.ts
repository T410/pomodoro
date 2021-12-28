import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export enum TimeStateEnum {
	STOPPED = "STOPPED",
	PLAYING = "PLAYING",
	PAUSED = "PAUSED",
}

interface ControlState {
	state: TimeStateEnum;
}

const initialState: ControlState = {
	state: TimeStateEnum.STOPPED,
};

export const timeControl = createSlice({
	name: "timeControl",
	initialState,
	reducers: {
		play: (state) => {
			state.state = TimeStateEnum.PLAYING;
		},
		pause: (state) => {
			state.state = TimeStateEnum.PAUSED;
		},
		stop: (state) => {
			state.state = TimeStateEnum.STOPPED;
		},
	},
});

export const { play, pause, stop } = timeControl.actions;
export const selectTimeState = (state: RootState) => state.counter.value;
export default timeControl.reducer;
