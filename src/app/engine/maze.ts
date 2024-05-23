/* eslint-disable no-param-reassign */
import { Maze, Position } from '../types';

const GRID_TYPE = {
	WALL: 0,
	MARKED_WALL: 4,
	PASSAGE: 1,
	EXIT_BLOCK: 2,
	PLAYER: 3,
};

const shuffle = (array: Array<string>) => {
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const fill = (maze: Maze, x = 0, y = 0) => {
	maze[y][x] = GRID_TYPE.PASSAGE;
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
			maze[(y + position.y) / 2][(x + position.x) / 2] = GRID_TYPE.PASSAGE;
			fill(maze, position.x, position.y);
		}
	}
};

const exit = (maze: Maze, width: number, height: number) => {
	const exists = [
		{
			x: 0,
			y: Math.max(
				Math.floor(Math.random() * height - 1),
				Math.floor(height * 0.8),
			),
			type: 'l',
		},
		{
			x: width - 1,
			y: Math.max(Math.floor(Math.random() * height - 1), 1),
			type: 'r',
		},
		{
			x: Math.max(Math.floor(Math.random() * width - 1), 1),
			y: height - 1,
			type: 'b',
		},
		{
			x: Math.max(Math.floor(Math.random() * width - 1), Math.floor(width * 0.8)),
			y: 0,
			type: 't',
		},
	];

	const position = exists[Math.floor(Math.random() * 4)];
	maze[position.y][position.x] = GRID_TYPE.EXIT_BLOCK;

	switch (position.type) {
		case 'l':
			if (maze[position.y][position.x + 1] !== GRID_TYPE.PASSAGE) {
				maze[position.y][position.x + 1] = GRID_TYPE.PASSAGE;
			}
			break;
		case 't':
			if (maze[position.y + 1][position.x] !== GRID_TYPE.PASSAGE) {
				maze[position.y + 1][position.x] = GRID_TYPE.PASSAGE;
			}
			break;
		case 'b':
			if (maze[position.y - 1][position.x] !== GRID_TYPE.PASSAGE) {
				maze[position.y - 1][position.x] = GRID_TYPE.PASSAGE;
			}
			break;
		default:
			if (maze[position.y][position.x - 1] !== GRID_TYPE.PASSAGE) {
				maze[position.y][position.x - 1] = GRID_TYPE.PASSAGE;
			}
	}

	return position;
};

const close = (maze: Maze, width: number, height: number) => {
	maze.unshift(new Array(width).fill(GRID_TYPE.WALL));

	for (let y = 0; y <= height; y += 1) {
		maze[y].unshift(GRID_TYPE.WALL);
		maze[y][maze[y].length - 1] = GRID_TYPE.WALL;
	}
};

const createMaze = (
	width: number,
	height: number,
): { maze: Maze; exit: Position } => {
	const maze = new Array(height)
		.fill(null)
		.map(() => new Array(width).fill(GRID_TYPE.WALL));

	fill(maze);
	close(maze, width, height);

	const exitPosition = exit(maze, width + 1, height + 1);

	return {
		maze,
		exit: exitPosition,
	};
};

export { createMaze, GRID_TYPE };
