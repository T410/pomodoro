import { useRef, useEffect, useState } from "react";
function useInterval(callback: Function, delay: number) {
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
}

export { useInterval };
