import { configureStore, Middleware, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { configReducer } from "../features/";
import { timerReducer, controlReducer } from "../features/";
import { ConfigState } from "../features/config/configSlice";

const withConfig: Middleware = (storeApi) => (next) => (action: PayloadAction<ConfigState>) => {
	const config = storeApi.getState().config;
	next({ ...action, config });
};

export const store = configureStore({
	reducer: {
		config: configReducer,
		control: controlReducer,
		timer: timerReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(withConfig),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, undefined, any>;
