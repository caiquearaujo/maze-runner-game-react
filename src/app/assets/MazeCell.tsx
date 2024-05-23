import React from 'react';
import clsx from 'clsx';

import { GRID_TYPE } from '../engine/maze';

export type MazeCellProps = {
	type: number;
	x: number;
	y: number;
	size: number;
};

const MazeCell: React.FC<MazeCellProps> = ({ type, size }) => (
	<div
		className={clsx(
			'border border-solid',
			type === GRID_TYPE.PASSAGE && 'bg-white border-white',
			type === GRID_TYPE.WALL && 'bg-gray-900 border-slate-900',
			type === GRID_TYPE.EXIT_BLOCK && 'bg-green-500 border-green-500',
			type === GRID_TYPE.PLAYER && 'bg-indigo-500 border-indigo-600',
			type === GRID_TYPE.MARKED_WALL && 'bg-red-500 border-red-600',
		)}
		style={{ width: `${size}px`, height: `${size}px` }}
	/>
);

const MemoizedMazeCell = React.memo(MazeCell);

export default MemoizedMazeCell;
