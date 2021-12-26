import { Nav, Pomodoro, Info } from "./components";

function App() {
	return (
		<div className="h-screen w-full grid grid-rows-auto-1 justify-items-center">
			<Nav />
			<div className="w-full md:w-2/3 max-w-xl flex flex-col justify-start items-center px-2">
				<Pomodoro />
				<Info />
			</div>
		</div>
	);
}

export default App;
