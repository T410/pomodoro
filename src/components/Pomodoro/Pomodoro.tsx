import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../../utils";
import { playSVG, pauseSVG, stopSVG, uiSound } from "../../assets";
import { State } from "./Pomodoro.types";
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

function StateButton({
	children,
	isActive,
	onClick,
}: {
	children: React.ReactNode;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<div
			className={`text-lg mx-auto w-fit h-fit hover:cursor-pointer rounded active:border-b-0 transition-all px-2 ${
				isActive ? "bg-orange-600" : ""
			}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
}

function ControlButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
	return (
		<div
			className="w-fit h-fit hover:cursor-pointer bg-orange-600 border-orange-700 rounded border-b-4 active:border-b-0 last:ml-6 transition-all hover:border-orange-400"
			onClick={onClick}
		>
			{children}
		</div>
	);
}

function Pomodoro() {
	const timeRef = useRef<HTMLHeadingElement>(null);
	const [time, setTime] = useState(25 * 60);
	const [isRunning, setIsRunning] = useState(false);
	const [currentState, setCurrentState] = useState<State>(State.POMODORO);

	useEffect(() => {
		switch (currentState) {
			case State.POMODORO:
				setTime(25 * 60);
				break;
			case State.SHORT_BREAK:
				setTime(5 * 60);
				break;
			case State.LONG_BREAK:
				setTime(15 * 60);
				break;
		}
	}, [currentState]);

	useEffect(() => {
		if (time) {
			setTextContent(timeRef, calculateTime(time));
		}
	}, [time]);

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			new Audio(uiSound).play();
			stop();
		} else {
			setTime(time - 1);
			document.title = calculateTime(time - 1).toString();
		}
	}, 1000);

	function stop() {
		pause();
		setIsRunning(false);
		setTime(25 * 60);
		document.title = "Pomodoro";
		setTextContent(timeRef, calculateTime(25 * 60));
	}

	function buttonHandler() {
		if (isRunning) {
			pause();
		} else {
			play();
		}
		setIsRunning(!isRunning);
	}

	function stateButtonHandler(e: State) {
		setCurrentState(e);
		stop();
	}

	return (
		<div className="mt-12 p-6 border-2 rounded-md w-1/3 h-1/2 text-center grid grid-rows-custom">
			<h1 className="text-9xl tabular-nums" ref={timeRef}>
				25:00
			</h1>
			<div className="w-full grid grid-cols-3 items-center">
				<StateButton
					isActive={currentState === State.POMODORO}
					onClick={() => {
						stateButtonHandler(State.POMODORO);
					}}
				>
					Pomodoro
				</StateButton>
				<StateButton
					isActive={currentState === State.SHORT_BREAK}
					onClick={() => {
						stateButtonHandler(State.SHORT_BREAK);
					}}
				>
					Short Break
				</StateButton>
				<StateButton
					isActive={currentState === State.LONG_BREAK}
					onClick={() => {
						stateButtonHandler(State.LONG_BREAK);
					}}
				>
					Long Break
				</StateButton>
			</div>
			<div className="w-full items-center justify-center flex flex-row">
				<ControlButton onClick={buttonHandler}>
					<img
						src={isRunning ? pauseSVG : playSVG}
						alt={isRunning ? "pause button" : "start button"}
						className="h-20"
					/>
				</ControlButton>
				<ControlButton onClick={stop}>
					<img src={stopSVG} alt="stop button" className="h-20" />
				</ControlButton>
			</div>
		</div>
	);
}

export default Pomodoro;
