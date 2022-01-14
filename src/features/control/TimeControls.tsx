import { Button } from "components";
import { playSVG, pauseSVG, stopSVG, nextSVG } from "assets";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { play, pause, stop, TimeStateEnum } from "features/control/controlSlice";

import { useEffect, useState } from "react";

function TimeControls({ onNext }: { onNext: () => void }) {
	const dispatch = useAppDispatch();
	const controlState = useAppSelector((state) => state.control);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (controlState.time === TimeStateEnum.PLAYING) {
			setIsRunning(true);
		} else {
			setIsRunning(false);
		}
	}, [controlState]);

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
			<Button onClick={onStop} disabled={controlState.time === TimeStateEnum.STOPPED}>
				<img src={stopSVG} alt="stop button" className="h-full" />
			</Button>
			<Button onClick={onNext}>
				<img src={nextSVG} alt="next button" className="h-full" />
			</Button>
		</div>
	);
}

export default TimeControls;
