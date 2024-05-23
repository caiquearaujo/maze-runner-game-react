import React, { useCallback, useEffect, useState } from 'react';

import useTimer from '../hooks/useTimer';

import MazeContainer from '../assets/MazeContainer';
import { createMaze } from '../engine/maze';
import { Direction, Maze } from '../types';
import MemoizedTimeDisplay from '../assets/TimeDisplay';

const InGameScreen: React.FC = () => {
	const { player, movePlayerTo, startGame } = useTimer();
	const [maze, setMaze] = useState<Maze>([]);

	const movePlayer = useCallback(
		(direction: Direction) => {
			// @todo fix when around not found
			const around: Record<Direction, number> = {
				left: maze[player.y][player.x - 1],
				right: maze[player.y][player.x + 1],
				up: maze[player.y - 1][player.x],
				down: maze[player.y + 1][player.x],
			};

			movePlayerTo(direction, around);
		},
		[maze, player],
	);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const keymapping: Record<string, Direction> = {
				ArrowLeft: 'left',
				ArrowRight: 'right',
				ArrowUp: 'up',
				ArrowDown: 'down',
			};

			if (keymapping[event.key] !== undefined) {
				movePlayer(keymapping[event.key]);
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});

	useEffect(() => {
		startGame();
		setMaze(createMaze(24, 24));
	}, []);

	return (
		<div className="w-full h-screen text-center flex flex-col gap-6 items-center justify-center">
			<MazeContainer maze={maze} width={25} height={25} visibility={2} />
			<MemoizedTimeDisplay />
		</div>
	);
};

export default InGameScreen;
