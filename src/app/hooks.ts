import { useRef, useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInterval = (callback: Function, delay: number) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const savedCallback = useRef<Function>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay !== null) {
			if (!isPlaying) {
				return;
			}
			const tick = () => {
				if (savedCallback.current) {
					savedCallback.current();
				}
			};
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay, isPlaying]);

	return [
		() => {
			setIsPlaying(true);
		},
		() => {
			setIsPlaying(false);
		},
	];
};
