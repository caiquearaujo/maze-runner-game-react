export type Maze = Array<Array<number>>;

export type Level = {
	label: string;
	width: number;
	height: number;
	size: number;
	reveals: number;
	reveal_cost: number;
	time_limit: number;
	markers: number;
	marker_cost: number;
	visibility: number;
};

export type States = {
	playing: boolean;
	revealing: boolean;
	won: boolean;
};

export type Resources = {
	reveals: number;
	markers: number;
};

export type LevelLabel = 'easy' | 'medium' | 'hard';

export type Position = { x: number; y: number };

export type Direction = 'up' | 'down' | 'left' | 'right';
