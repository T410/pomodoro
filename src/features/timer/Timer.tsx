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

function Timer() {
	const dispatch = useAppDispatch();
	const controlState = useAppSelector((state) => state.control);
	const time = useAppSelector((state) => state.timer.time);

	const timeRef = useRef<HTMLHeadingElement>(null);
	const [humanReadableTime, setHumanReadableTime] = useState(calculateTime(time));

	const [play, pause] = useInterval(() => {
		dispatch(tick());
	}, 1000);

	useEffect(() => {
		if (controlState.time === TimeStateEnum.PLAYING) {
			play();
		} else {
			pause();
		}
	}, [controlState, play, pause]);

	useEffect(() => {
		setHumanReadableTime(calculateTime(time));
	}, [time]);

	useEffect(() => {
		setTextContent(timeRef, humanReadableTime);
	}, [humanReadableTime]);

	return (
		<h1 className="text-8xl md:text-9xl" ref={timeRef}>
			{humanReadableTime}
		</h1>
	);
}

export default Timer;
