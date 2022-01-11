import { useAppSelector } from "app/hooks";

function Info() {
	const count = useAppSelector((state) => state.control.pomodoroCount);
	return (
		<div className="w-full text-center text-rose-400">
			<h2>#{count}</h2>
		</div>
	);
}

export default Info;
