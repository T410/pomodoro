import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { setWorkState, WorkStateEnum } from "./workStateSlice";
import { setTime } from "../timer/timerSlice";

function StateButton({ children, type }: { children: React.ReactNode; type: WorkStateEnum }) {
	const dispatch = useAppDispatch();
	const [isActive, setIsActive] = useState(false);
	const workState = useAppSelector((state) => state.workState.state);
	const config = useAppSelector((state) => state.config);

	useEffect(() => {
		if (workState === type) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [workState, type]);

	function onClick() {
		if (type !== workState) {
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
