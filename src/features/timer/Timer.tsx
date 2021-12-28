import { useEffect, useRef, useState } from "react";
import { useInterval } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { tick } from "../../features/timer/timerSlice";
import { TimeStateEnum } from "../timeControl/timeControlSlice";

function calculateTime(time: number) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function setTextContent(ref: React.RefObject<HTMLElement>, text: string | number) {
	if (ref.current) {
		ref.current.textContent = text.toString();
	}
}

function Timer({ initialTime }: { initialTime: number }) {
	const dispatch = useAppDispatch();
	const timeState = useAppSelector((state) => state.timeControl.state);
	const timeRef = useRef<HTMLHeadingElement>(null);
	const [time, setTime] = useState(initialTime);

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			onTimerFinish();
		} else {
			setTime(time - 1);
			dispatch(tick());
			document.title = calculateTime(time - 1).toString();
		}
	}, 1000);

	useEffect(() => {
		if (timeState === TimeStateEnum.PLAYING) {
			play();
		} else {
			pause();
		}
	}, [timeState, play, pause]);

	useEffect(() => {
		if (time) {
			setTextContent(timeRef, calculateTime(time));
		}
	}, [time]);

	function onTimerFinish() {}

	return (
		<h1 className="text-8xl md:text-9xl tabular-nums" ref={timeRef}>
			{useAppSelector((state) => calculateTime(state.timer.time))}
		</h1>
	);
}

export default Timer;
