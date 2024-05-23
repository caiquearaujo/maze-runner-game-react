import React, { createContext, useMemo, useState } from 'react';
import { Direction, Position } from '../types';
import { GRID_TYPE } from '../engine/maze';

export type TimerContextProps = {
	player: Position;
	playing: boolean;
	started: boolean;
	startGame: () => void;
	endGame: () => void;
	movePlayerTo: (direction: Direction, around: Record<Direction, number>) => void;
	displayTime: string;
};

export const TimerContext = createContext<TimerContextProps>({
	player: { x: 1, y: 1 },
	playing: false,
	started: false,
	startGame: () => {},
	endGame: () => {},
	movePlayerTo: () => {},
	displayTime: '',
});

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [start, setStart] = useState<number>(0);
	const [end, setEnd] = useState<number>(0);
	const [interval, setInterval] = useState<number | undefined>(undefined);

	const [started, setStarted] = useState<boolean>(false);
	const [playing, setPlaying] = useState<boolean>(false);
	const [player, setPlayer] = useState<Position>({ x: 1, y: 1 });

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

	const movePlayerTo = (
		direction: Direction,
		around: Record<Direction, number>,
	) => {
		setPlayer(current => {
			if (around[direction] === GRID_TYPE.WALL) {
				return current;
			}

			switch (direction) {
				case 'left':
					return { x: current.x - 1, y: current.y };
				case 'right':
					return { x: current.x + 1, y: current.y };
				case 'up':
					return { x: current.x, y: current.y - 1 };
				case 'down':
					return { x: current.x, y: current.y + 1 };
				default:
					return current;
			}
		});
	};

	const displayTime = useMemo(() => {
		const seconds = Math.floor((end - start) / 1000);

		if (seconds < 0) {
			return 'Starting game...';
		}

		if (seconds < 60) {
			return `${seconds} seconds`;
		}

		const minutes = Math.floor(seconds / 60);

		return `${minutes} minutes and ${seconds % 60} seconds`;
	}, [start, end]);

	return (
		<TimerContext.Provider
			value={{
				player,
				started,
				playing,
				startGame,
				endGame: stopGame,
				movePlayerTo,
				displayTime,
			}}>
			{children}
		</TimerContext.Provider>
	);
};

export default TimerProvider;
