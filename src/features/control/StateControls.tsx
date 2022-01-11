import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import { setWorkState, WorkStateEnum } from "features/control/controlSlice";
import { setTime } from "features/timer/timerSlice";
import { stop } from "features/control/controlSlice";

function StateButton({ children, type }: { children: React.ReactNode; type: WorkStateEnum }) {
	const dispatch = useAppDispatch();
	const [isActive, setIsActive] = useState(false);
	const controlState = useAppSelector((state) => state.control.work);
	const config = useAppSelector((state) => state.config);

	useEffect(() => {
		if (controlState === type) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [controlState, type]);

	function onClick() {
		dispatch(stop());
		if (type !== controlState) {
			dispatch(setWorkState(type));
			dispatch(setTime(config[type]));
		}
	}

	return (
		<div
			className={`text-lg md:text-xl mx-auto w-fit h-fit hover:cursor-pointer rounded active:border-b-0 transition-all px-2 ${
				isActive ? "bg-orange-600" : ""
			}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
}

function StateControls() {
	return (
		<div className="w-full grid grid-cols-3 items-center">
			<StateButton type={WorkStateEnum.POMODORO}>Pomodoro</StateButton>
			<StateButton type={WorkStateEnum.SHORT_BREAK}>Short Break</StateButton>
			<StateButton type={WorkStateEnum.LONG_BREAK}>Long Break</StateButton>
		</div>
	);
}

export default StateControls;
