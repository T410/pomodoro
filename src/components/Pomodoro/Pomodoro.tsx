import { useRef, useState } from "react";
import { useInterval } from "../../utils";
import { playSVG, pauseSVG, stopSVG } from "../../assets";
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

function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
	return (
		<div
			className="text-4xl w-fit h-fit right-0 hover:cursor-pointer bg-orange-600 border-orange-700 rounded border-b-4 active:border-b-0 last:ml-2"
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

	const [play, pause] = useInterval(() => {
		if (time <= 0) {
			stop();
		} else {
			setTime(time - 1);
			setTextContent(timeRef, calculateTime(time - 1));
		}
	}, 1000);

	function stop() {
		pause();
		setIsRunning(false);
		setTime(25 * 60);
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

	return (
		<div className="mt-12 p-6 border-2 rounded-md w-1/3 h-1/2 text-center flex flex-col justify-between items-center">
			<h1 className="text-9xl" ref={timeRef}>
				25:00
			</h1>
			<div className="w-full items-center justify-center flex flex-row h-full">
				<Button onClick={buttonHandler}>
					<img
						src={isRunning ? pauseSVG : playSVG}
						alt={isRunning ? "pause button" : "start button"}
						className="h-20"
					/>
				</Button>
				<Button onClick={stop}>
					<img src={stopSVG} alt="stop button" className="h-20" />
				</Button>
			</div>
		</div>
	);
}

export default Pomodoro;
