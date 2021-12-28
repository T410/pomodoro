import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, timeControlReducer, timerReducer, configReducer, workStateReducer } from "../features/";

export const store = configureStore({
	reducer: {
		config: configReducer,
		counter: counterReducer,
		timer: timerReducer,
		timeControl: timeControlReducer,
		workState: workStateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
