import React from 'react';
import clsx from 'clsx';

import { GRID_TYPE } from '../engine/maze';

export type MazeCellProps = {
	type: number;
	x: number;
	y: number;
};

const MazeCell: React.FC<MazeCellProps> = ({ type }) => (
	<div
		className={clsx(
			'w-5 h-5 border border-solid',
			type === GRID_TYPE.PASSAGE && 'bg-white border-white',
			type === GRID_TYPE.WALL && 'bg-black border-black',
			type === GRID_TYPE.EXIT_BLOCK && 'bg-green-500 border-green-500',
			type === GRID_TYPE.PLAYER && 'bg-indigo-500 border-indigo-600',
		)}
	/>
);

const MemoizedMazeCell = React.memo(MazeCell);

export default MemoizedMazeCell;
