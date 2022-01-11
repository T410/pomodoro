import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector, useInterval } from "app/hooks";
import { tick } from "features/timer/timerSlice";
import { TimeStateEnum } from "features/control/controlSlice";
import { calculateTime } from "features/timer/utils";

function setTextContent(ref: React.RefObject<HTMLElement>, text: string | number) {
	if (ref.current) {
		ref.current.textContent = text.toString();
	}
}

function Timer({ onNext }: { onNext: () => void }) {
	const dispatch = useAppDispatch();
	const config = useAppSelector((state) => state.config);
	const controlState = useAppSelector((state) => state.control);
	const timer = useAppSelector((state) => state.timer.time);
	const timeRef = useRef<HTMLHeadingElement>(null);
	const [time, setTime] = useState(config[controlState.work]);

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			onNext();
		} else {
			setTime(time - 1);
			dispatch(tick());
		}
	}, 1000);

	useEffect(() => {
		setTime(timer);
	}, [timer]);

	useEffect(() => {
		if (controlState.time === TimeStateEnum.PLAYING) {
			play();
		} else {
			pause();
		}
	}, [controlState, play, pause]);

	useEffect(() => {
		if (time) {
			setTextContent(timeRef, calculateTime(time));
		}
	}, [time]);

	return (
		<h1 className="text-8xl md:text-9xl tabular-nums" ref={timeRef}>
			{calculateTime(timer)}
		</h1>
	);
}

export default Timer;
