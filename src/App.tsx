import { Nav, Pomodoro } from "./components";

function App() {
	return (
		<div className="h-screen w-full grid grid-rows-auto-1">
			<Nav />
			<div className="w-full flex flex-row justify-center">
				<Pomodoro />
			</div>
		</div>
	);
}

export default App;
