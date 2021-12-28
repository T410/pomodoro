import { useEffect, useState } from "react";
import { Audio } from "../";
import { TimeControls, Timer, StateControls } from "../../features";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setDurations, setPomodorosBeforeLongBreak } from "../../features/config/configSlice";
import { setTime } from "../../features/timer/timerSlice";
import { incrementPomodoro, setWorkState, WorkStateEnum } from "../../features/state/workStateSlice";
import { play } from "../../features/timeControl/timeControlSlice";

function Pomodoro() {
	const dispatch = useAppDispatch();
	const workState = useAppSelector((state) => state.workState);
	const config = useAppSelector((state) => state.config);
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

	function onNext() {
		switch (workState.state) {
			case WorkStateEnum.POMODORO:
				if (workState.currentPomodoroCount % config.pomodorosBeforeLongBreak === 0) {
					dispatch(setTime(config.LONG_BREAK));
					dispatch(setWorkState(WorkStateEnum.LONG_BREAK));
				} else {
					dispatch(setTime(config.SHORT_BREAK));
					dispatch(setWorkState(WorkStateEnum.SHORT_BREAK));
				}
				break;

			default:
				dispatch(incrementPomodoro());
				dispatch(setTime(config.POMODORO));
				dispatch(setWorkState(WorkStateEnum.POMODORO));
				break;
		}
		dispatch(play());
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
