import { configureStore } from "@reduxjs/toolkit";
import { configReducer } from "../features/";
import { timerReducer, controlReducer } from "../features/";

export const store = configureStore({
	reducer: {
		config: configReducer,
		control: controlReducer,
		timer: timerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
