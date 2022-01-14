import { useAppSelector } from "app/hooks";

function Bubbles({ count, currentIndex }: { count: number; currentIndex: number }) {
	let bubbles = [];
	let modValue = (currentIndex - 1) % count;
	for (let i = 0; i < count; i++) {
		let className = "w-3 h-3 rounded-full border-white";
		if (i === modValue) {
			className += " bg-orange-600";
		} else if (i < modValue) {
			className += " bg-green-600";
		} else {
			className += " bg-gray-600";
		}
		bubbles.push(<div key={i} className={className}></div>);
	}
	return <div className="flex flex-row justify-center text-xs space-x-2">{bubbles}</div>;
}

export default function ModBubbles() {
	const totalPomodoroCount = useAppSelector((state) => state.config.pomodorosBeforeLongBreak);
	const pomodoroCount = useAppSelector((state) => state.control.pomodoroCount);

	return <div>{<Bubbles count={totalPomodoroCount} currentIndex={pomodoroCount} />}</div>;
}
