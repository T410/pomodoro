import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../../utils";
import { playSVG, pauseSVG, stopSVG, nextSVG } from "../../assets";
import { State } from "./Pomodoro.types";
import { Audio } from "../";

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
			className={`text-lg md:text-xl mx-auto w-fit h-fit hover:cursor-pointer rounded active:border-b-0 transition-all px-2 ${
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
			className="w-fit h-16 md:h-20 hover:cursor-pointer bg-orange-600 border-b-orange-700 rounded border-b-4 active:border-b-orange-600 transition-all hover:border-orange-400"
			onClick={onClick}
		>
			{children}
		</div>
	);
}

function Pomodoro() {
	const [loopCount, setLoopCount] = useState(3);
	const [playAudio, setPlayAudio] = useState(false);
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

	function onTimerFinish() {
		setPlayAudio(true);
		stop();
		next();
	}

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			onTimerFinish();
		} else {
			setTime(time - 1);
			document.title = calculateTime(time - 1).toString();
		}
	}, 1000);

	function stop() {
		pause();
		setIsRunning(false);
		document.title = "Pomodoro";
		setTextContent(timeRef, calculateTime(25 * 60));
	}

	function next() {
		switch (currentState) {
			case State.POMODORO:
				if (loopCount > 0) {
					setCurrentState(State.SHORT_BREAK);
					setLoopCount(loopCount - 1);
				} else {
					setCurrentState(State.LONG_BREAK);
					setLoopCount(3);
				}
				break;
			case State.SHORT_BREAK:
				setCurrentState(State.POMODORO);
				break;
			case State.LONG_BREAK:
				setCurrentState(State.POMODORO);
				break;
		}
	}

	useEffect(() => {
		if (playAudio) {
			setPlayAudio(false);
		}
	}, [playAudio]);

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
		<div className="mt-6 p-2 mx-2 rounded-md w-full md:w-2/3 max-w-xl h-fit text-center grid gap-4 bg-slate-700">
			<Audio play={playAudio} />
			<h1 className="text-8xl md:text-9xl tabular-nums" ref={timeRef}>
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
			<div className="w-full items-center justify-center flex flex-row h-fit pt-2 space-x-4">
				<ControlButton onClick={buttonHandler}>
					<img
						src={isRunning ? pauseSVG : playSVG}
						alt={isRunning ? "pause button" : "start button"}
						className="h-full"
					/>
				</ControlButton>
				<ControlButton onClick={stop}>
					<img src={stopSVG} alt="stop button" className="h-full" />
				</ControlButton>
				<ControlButton onClick={next}>
					<img src={nextSVG} alt="next button" className="h-full" />
				</ControlButton>
			</div>
		</div>
	);
}

export default Pomodoro;
