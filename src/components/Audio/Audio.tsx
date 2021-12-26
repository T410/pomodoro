import { useEffect, useRef } from "react";
import { uiSound } from "../../assets";

function Audio({ play }: { play: boolean }) {
	const audioRef = useRef<HTMLAudioElement>(null);
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.5;
		}
	}, []);
	useEffect(() => {
		if (play) {
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
			}
		}
	}, [play]);
	return <audio src={uiSound} ref={audioRef}></audio>;
}

export default Audio;
