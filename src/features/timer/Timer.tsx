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

function Timer({ onNext }: { onNext: () => void }) {
	const dispatch = useAppDispatch();
	const config = useAppSelector((state) => state.config);
	const workState = useAppSelector((state) => state.workState);
	const timeState = useAppSelector((state) => state.timeControl.state);
	const timer = useAppSelector((state) => state.timer);
	const timeRef = useRef<HTMLHeadingElement>(null);
	const [time, setTime] = useState(config[workState.state]);

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			onNext();
		} else {
			setTime(time - 1);
			dispatch(tick());
			document.title = calculateTime(time - 1).toString();
		}
	}, 1000);

	useEffect(() => {
		setTime(timer.time);
	}, [timer]);

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

	return (
		<h1 className="text-8xl md:text-9xl tabular-nums" ref={timeRef}>
			{useAppSelector((state) => calculateTime(state.timer.time))}
		</h1>
	);
}

export default Timer;
