export type Maze = Array<Array<number>>;

export type Level = {
	label: string;
	width: number;
	height: number;
	size: number;
	revels: number;
	time_limit: number;
	markers: number;
	visibility: number;
};

export type LevelLabel = 'easy' | 'medium' | 'hard';

export type Position = { x: number; y: number };

export type Direction = 'up' | 'down' | 'left' | 'right';
