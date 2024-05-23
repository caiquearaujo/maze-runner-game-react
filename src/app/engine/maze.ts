/* eslint-disable no-param-reassign */
import { Maze } from '../types';

const GRID_TYPE = {
	WALL: 0,
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
		{ x: width - 1, y: Math.floor(Math.random() * height), type: 'r' },
		{ x: Math.floor(Math.random() * width), y: height - 1, type: 'b' },
	];

	const position = exists[Math.floor(Math.random() * 2)];
	maze[position.y][position.x] = GRID_TYPE.EXIT_BLOCK;

	switch (position.type) {
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
};

const close = (maze: Maze, width: number, height: number) => {
	maze.unshift(new Array(width).fill(GRID_TYPE.WALL));

	for (let y = 0; y <= height; y += 1) {
		maze[y].unshift(GRID_TYPE.WALL);
	}
};

const createMaze = (width: number, height: number): Maze => {
	const maze = new Array(height)
		.fill(null)
		.map(() => new Array(width).fill(GRID_TYPE.WALL));

	fill(maze);
	close(maze, width, height);
	exit(maze, width + 1, height + 1);
	return maze;
};

export { createMaze, GRID_TYPE };
