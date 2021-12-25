import { useEffect, useRef } from "react";
import { uiSound } from "../../assets";

function Audio({ play }: { play: boolean }) {
	const audioRef = useRef<HTMLAudioElement>(null);
	useEffect(() => {
		if (play) {
			audioRef.current?.play();
		}
	}, [play]);
	return <audio src={uiSound} ref={audioRef}></audio>;
}

export default Audio;
