import { useEffect, useState } from "react";
import { Audio } from "../";
import { TimeControls, Timer, StateControls } from "../../features";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setConfig } from "../../features/config/configSlice";
import { setTime } from "../../features/timer/timerSlice";
import { next, WorkStateEnum } from "../../features/control/controlSlice";

function Pomodoro() {
	const dispatch = useAppDispatch();
	const pomodoroTime = useAppSelector((state) => state.config[WorkStateEnum.POMODORO]);
	const [playAudio, setPlayAudio] = useState(false);

	useEffect(() => {
		dispatch(setConfig({ POMODORO: 25, SHORT_BREAK: 5, LONG_BREAK: 15 }));
		dispatch(setTime(pomodoroTime));
	}, [dispatch, pomodoroTime]);

	useEffect(() => {
		if (playAudio) {
			setPlayAudio(false);
		}
	}, [playAudio]);

	function onNext() {
		dispatch(next());
	}

	return (
		<div className="my-4 p-2 mx-2 rounded-md w-full h-fit text-center grid gap-4 bg-slate-700">
			<Audio play={playAudio} />
			<Timer onNext={onNext} />
			<StateControls />
			<TimeControls onNext={onNext} />
		</div>
	);
}

export default Pomodoro;
