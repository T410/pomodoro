import { useEffect, useState } from "react";
import { Audio } from "../";
import { Controls, Timer, StateControls } from "../../features";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setDurations, setPomodorosBeforeLongBreak } from "../../features/config/configSlice";
import { setTime } from "../../features/timer/timerSlice";
import { WorkStateEnum } from "../../features/state/workStateSlice";

function Pomodoro() {
	const dispatch = useAppDispatch();
	const pomodoroTime = useAppSelector((state) => state.config[WorkStateEnum.POMODORO]);
	const [playAudio, setPlayAudio] = useState(false);

	useEffect(() => {
		dispatch(setDurations({ POMODORO: 25, SHORT_BREAK: 5, LONG_BREAK: 15 }));
		dispatch(setPomodorosBeforeLongBreak(4));

		dispatch(setTime(pomodoroTime));
	}, [dispatch, pomodoroTime]);

	useEffect(() => {
		if (playAudio) {
			setPlayAudio(false);
		}
	}, [playAudio]);

	return (
		<div className="my-4 p-2 mx-2 rounded-md w-full h-fit text-center grid gap-4 bg-slate-700">
			<Audio play={playAudio} />
			<Timer initialTime={25 * 60} />
			<StateControls />
			<Controls />
		</div>
	);
}

export default Pomodoro;
