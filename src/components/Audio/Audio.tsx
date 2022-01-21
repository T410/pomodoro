import { useEffect, useRef, useState } from "react";
import { uiSound } from "assets";
import { useAppSelector } from "app/hooks";

function Audio() {
	const [play, setPlay] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);
	const time = useAppSelector((state) => state.timer.time);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.25;
		}
	}, []);

	useEffect(() => {
		if (time === 0) {
			setPlay(true);
		}
	}, [time]);

	useEffect(() => {
		if (play) {
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
				setPlay(false);
			}
		}
	}, [play]);
	return <audio src={uiSound} ref={audioRef}></audio>;
}

export default Audio;
