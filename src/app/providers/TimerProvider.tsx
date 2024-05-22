import React, { createContext, useMemo, useState } from 'react';

export type TimerContextProps = {
	playing: boolean;
	started: boolean;
	startGame: () => void;
	endGame: () => void;
	displayTime: string;
};

export const TimerContext = createContext<TimerContextProps>({
	playing: false,
	started: false,
	startGame: () => {},
	endGame: () => {},
	displayTime: '',
});

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [start, setStart] = useState<number>(0);
	const [end, setEnd] = useState<number>(0);
	const [interval, setInterval] = useState<number | undefined>(undefined);

	const [started, setStarted] = useState<boolean>(false);
	const [playing, setPlaying] = useState<boolean>(false);

	const updateTime = () => {
		setEnd(Date.now());
	};

	const startGame = () => {
		setStarted(true);
		setPlaying(true);

		setStart(Date.now());

		window.clearInterval(interval);
		setInterval(() => window.setInterval(updateTime, 1000));
	};

	const stopGame = () => {
		window.clearInterval(interval);
		setInterval(undefined);
		setPlaying(false);
	};

	const displayTime = useMemo(() => {
		const seconds = Math.floor((end - start) / 1000);

		if (seconds < 60) {
			return `${seconds} seconds`;
		}

		const minutes = Math.floor(seconds / 60);

		return `${minutes} minutes and ${seconds % 60} seconds`;
	}, [start, end]);

	return (
		<TimerContext.Provider
			value={{
				started,
				playing,
				startGame,
				endGame: stopGame,
				displayTime,
			}}>
			{children}
		</TimerContext.Provider>
	);
};

export default TimerProvider;
