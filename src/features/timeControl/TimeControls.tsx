import { Button } from "../../components";
import { playSVG, pauseSVG, stopSVG, nextSVG } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { play, pause, stop, TimeStateEnum } from "./timeControlSlice";
import { useEffect, useState } from "react";
import { setTime } from "../timer/timerSlice";
import { incrementPomodoro, setWorkState, WorkStateEnum } from "../state/workStateSlice";

function TimeControls({ onNext }: { onNext: () => void }) {
	const dispatch = useAppDispatch();
	const timeState = useAppSelector((state) => state.timeControl.state);
	const workState = useAppSelector((state) => state.workState);
	const config = useAppSelector((state) => state.config);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (timeState === TimeStateEnum.PLAYING) {
			setIsRunning(true);
		} else {
			setIsRunning(false);
		}
	}, [timeState]);

	function buttonHandler() {
		if (isRunning) {
			dispatch(pause());
		} else {
			dispatch(play());
		}
		setIsRunning(!isRunning);
	}

	function onStop() {
		dispatch(stop());
		dispatch(setTime(config[workState.state]));
	}

	return (
		<div className="w-full items-center justify-center flex flex-row h-fit pt-2 space-x-4">
			<Button onClick={buttonHandler}>
				<img
					src={isRunning ? pauseSVG : playSVG}
					alt={isRunning ? "pause button" : "start button"}
					className="h-full"
				/>
			</Button>
			<Button onClick={onStop}>
				<img src={stopSVG} alt="stop button" className="h-full" />
			</Button>
			<Button onClick={onNext}>
				<img src={nextSVG} alt="next button" className="h-full" />
			</Button>
		</div>
	);
}

export default TimeControls;
