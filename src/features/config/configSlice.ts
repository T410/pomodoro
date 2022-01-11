import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import { WorkStateEnum } from "features/control/controlSlice";

export interface ConfigState {
	[WorkStateEnum.POMODORO]: number;
	[WorkStateEnum.SHORT_BREAK]: number;
	[WorkStateEnum.LONG_BREAK]: number;
	pomodorosBeforeLongBreak: number;
}

const initialConfigState: ConfigState = {
	[WorkStateEnum.POMODORO]: 25 * 60,
	[WorkStateEnum.SHORT_BREAK]: 5 * 60,
	[WorkStateEnum.LONG_BREAK]: 15 * 60,
	pomodorosBeforeLongBreak: 4,
};

export const configSlice = createSlice({
	name: "config",
	initialState: initialConfigState,
	reducers: {
		setConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
			let newConfig = { ...state };
			Object.keys(action.payload).forEach((key) => {
				if (WorkStateEnum[key as WorkStateEnum] && action.payload[key as WorkStateEnum] !== undefined) {
					newConfig[key as WorkStateEnum] = action.payload[key as WorkStateEnum]! * 60;
				} else {
					newConfig.pomodorosBeforeLongBreak = action.payload.pomodorosBeforeLongBreak!;
				}
			});
			return newConfig;
		},
	},
});

export const { setConfig } = configSlice.actions;
export const selectConfig = (state: RootState) => state.config;

export default configSlice.reducer;
