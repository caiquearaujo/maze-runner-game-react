/* eslint-disable no-param-reassign */
import { Maze } from '../types';

const GRID_TYPE = {
	WALL: 0,
	PASSAGE: 1,
	EXIT_BLOCK: 2,
};

const exitOn = (width: number, height: number) => {
	const exists = [
		{ x: width - 1, y: Math.floor(Math.random() * height), position: 'r' },
		{ x: Math.floor(Math.random() * width), y: 0, position: 'b' },
	];

	return exists[Math.floor(Math.random() * 2)];
};

const shuffle = (array: Array<string>) => {
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const fill = (maze: Maze, x = 0, y = 0) => {
	maze[y][x] = 1;
	const directions = shuffle(['up', 'down', 'left', 'right']);

	for (let i = 0; i < directions.length; i += 1) {
		const direction = directions[i];
		const position = { x, y };

		if (direction === 'up') position.y -= 2;
		if (direction === 'down') position.y += 2;
		if (direction === 'left') position.x -= 2;
		if (direction === 'right') position.x += 2;

		if (
			position.x >= 0 &&
			position.y >= 0 &&
			position.x < maze.length &&
			position.y < maze.length &&
			maze[position.y][position.x] === 0
		) {
			maze[(y + position.y) / 2][(x + position.x) / 2] = 1;
			fill(maze, position.x, position.y);
		}
	}
};

const createMaze = (width: number, height: number): Maze => {
	const exit = exitOn(width, height);
	const maze = new Array(height)
		.fill(null)
		.map(() => new Array(width).fill(GRID_TYPE.WALL));

	fill(maze);

	switch (exit.position) {
		case 'r':
			maze[exit.y - 1][exit.x - 1] = GRID_TYPE.EXIT_BLOCK;
			maze[exit.y][exit.x - 1] = GRID_TYPE.EXIT_BLOCK;
			maze[exit.y + 1][exit.x - 1] = GRID_TYPE.EXIT_BLOCK;
			break;
		default:
			maze[exit.y - 1][exit.x - 1] = GRID_TYPE.EXIT_BLOCK;
			maze[exit.y - 1][exit.x] = GRID_TYPE.EXIT_BLOCK;
			maze[exit.y - 1][exit.x + 1] = GRID_TYPE.EXIT_BLOCK;
	}

	maze[exit.y][exit.x] = GRID_TYPE.EXIT_BLOCK;
	return maze;
};

export { createMaze, GRID_TYPE };
