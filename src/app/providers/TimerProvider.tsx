import React, {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Direction, Level, LevelLabel, Position, Resources, States } from '../types';
import { GRID_TYPE } from '../engine/maze';
import levels from '../engine/levels';

export type TimerContextProps = {
	level: Level;
	player: Position;
	states: States;
	resources: Resources;
	started: boolean;
	startGame: () => void;
	endGame: () => void;
	movePlayerTo: (direction: Direction, around: Record<Direction, number>) => void;
	changeLevelTo: (lv: LevelLabel) => void;
	revealMaze: () => void;
	markMaze: () => void;
	displayTime: string;
};

export const TimerContext = createContext<TimerContextProps>({
	level: levels.easy,
	player: { x: 1, y: 1 },
	states: { playing: false, revealing: false, won: true },
	resources: { reveals: 0, markers: 0 },
	started: false,
	startGame: () => {},
	endGame: () => {},
	movePlayerTo: () => {},
	changeLevelTo: () => {},
	revealMaze: () => {},
	markMaze: () => {},
	displayTime: '',
});

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [level, setLevel] = useState<LevelLabel>('easy');

	const [timeInGame, setTimeInGame] = useState<number>(0);
	const [interval, setInterval] = useState<number | undefined>(undefined);

	const [started, setStarted] = useState<boolean>(false);
	const [player, setPlayer] = useState<Position>({ x: 1, y: 1 });

	const [states, setStates] = useState<States>({
		playing: false,
		revealing: false,
		won: true,
	});

	const [resources, setResources] = useState<Resources>({
		reveals: 0,
		markers: 0,
	});

	const startGame = () => {
		setStarted(true);
		setStates({ revealing: false, playing: true, won: true });

		setResources({
			reveals: levels[level].reveals,
			markers: levels[level].markers,
		});

		window.clearInterval(interval);
		setInterval(
			window.setInterval(() => {
				setTimeInGame(current => current + 1);
			}, 1000),
		);
	};

	const stopGame = (won: boolean = true) => {
		window.clearInterval(interval);
		setStates({ revealing: false, playing: false, won });
		setResources({ reveals: 0, markers: 0 });
	};

	const movePlayerTo = (
		direction: Direction,
		around: Record<Direction, number>,
	) => {
		setPlayer(current => {
			if (
				around[direction] === GRID_TYPE.WALL ||
				around[direction] === GRID_TYPE.MARKED_WALL
			) {
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

	const changeLevelTo = (lv: LevelLabel) => {
		setLevel(lv);
	};

	const revealMaze = useCallback(() => {
		if (states.revealing === false && resources.reveals > 0) {
			setResources(current => ({
				...current,
				reveals: current.reveals - 1,
			}));

			setStates({ playing: true, revealing: true, won: true });
			setTimeInGame(current => current + levels[level].reveal_cost * 60);

			setTimeout(() => {
				setStates(current => ({ ...current, revealing: false }));
			}, levels[level].reveals * 1000);
		}
	}, [states, resources]);

	const markMaze = useCallback(() => {
		if (resources.markers > 0) {
			setResources(current => ({
				...current,
				markers: current.markers - 1,
			}));

			setTimeInGame(current => current + levels[level].marker_cost * 1);
		}
	}, [resources]);

	useEffect(() => {
		if (timeInGame >= levels[level].time_limit * 60) {
			stopGame(false);
		}
	}, [timeInGame]);

	const displayTime = useMemo(() => {
		if (timeInGame < 0) {
			return 'Starting game...';
		}

		if (timeInGame < 60) {
			return `${timeInGame} seconds`;
		}

		const minutes = Math.floor(timeInGame / 60);

		return `${minutes} minutes and ${timeInGame % 60} seconds`;
	}, [timeInGame]);

	return (
		<TimerContext.Provider
			value={{
				level: levels[level],
				player,
				started,
				states,
				resources,
				startGame,
				endGame: stopGame,
				movePlayerTo,
				changeLevelTo,
				revealMaze,
				markMaze,
				displayTime,
			}}>
			{children}
		</TimerContext.Provider>
	);
};

export default TimerProvider;
