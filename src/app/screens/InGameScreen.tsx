import React, { useCallback, useEffect, useState } from 'react';

import useTimer from '../hooks/useTimer';

import MazeContainer from '../assets/MazeContainer';
import { GRID_TYPE, createMaze } from '../engine/maze';
import { Direction, Maze, Position } from '../types';
import MemoizedTimeDisplay from '../assets/TimeDisplay';
import MemoizedGameHeader from '../assets/GameHeader';

const InGameScreen: React.FC = () => {
	const {
		level,
		player,
		states,
		resources,
		revealMaze,
		markMaze,
		movePlayerTo,
		startGame,
		endGame,
	} = useTimer();
	const [maze, setMaze] = useState<{ maze: Maze; exit: Position }>({
		maze: [],
		exit: { x: 0, y: 0 },
	});

	const movePlayer = useCallback(
		(direction: Direction) => {
			const around: Record<Direction, number> = {
				left: maze.maze[player.y][player.x - 1],
				right: maze.maze[player.y][player.x + 1],
				up: maze.maze[player.y - 1][player.x],
				down: maze.maze[player.y + 1][player.x],
			};

			movePlayerTo(direction, around);
		},
		[maze.maze, player],
	);

	const markWallOnMaze = useCallback(() => {
		if (resources.markers === 0) return;

		markMaze();

		if (maze.maze[player.y][player.x - 1] === GRID_TYPE.WALL) {
			maze.maze[player.y][player.x - 1] = GRID_TYPE.MARKED_WALL;
			return;
		}

		if (maze.maze[player.y][player.x + 1] === GRID_TYPE.WALL) {
			maze.maze[player.y][player.x + 1] = GRID_TYPE.MARKED_WALL;
			return;
		}

		if (maze.maze[player.y - 1][player.x] === GRID_TYPE.WALL) {
			maze.maze[player.y - 1][player.x] = GRID_TYPE.MARKED_WALL;
			return;
		}

		if (maze.maze[player.y + 1][player.x] === GRID_TYPE.WALL) {
			maze.maze[player.y + 1][player.x] = GRID_TYPE.MARKED_WALL;
		}
	}, [maze.maze, player, resources.markers]);

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

			if (event.key === '1') {
				revealMaze();
			}

			if (event.key === '2') {
				markWallOnMaze();
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});

	useEffect(() => {
		if (player.x === maze.exit.x && player.y === maze.exit.y) {
			endGame();
		}
	}, [player]);

	useEffect(() => {
		startGame();
		setMaze(createMaze(level.width - 1, level.height - 1));
	}, [level.label]);

	return (
		<div className="w-full h-screen text-center flex flex-col gap-6 items-center justify-center bg-slate-950">
			<MemoizedGameHeader level={level} resources={resources} />
			<MazeContainer
				maze={maze.maze}
				width={level.width}
				height={level.height}
				size={level.size}
				visibility={states.revealing ? undefined : level.visibility}
			/>
			<MemoizedTimeDisplay className="text-white" />
		</div>
	);
};

export default InGameScreen;
