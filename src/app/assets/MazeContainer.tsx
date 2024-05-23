import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { createMaze } from '../engine/maze';
import { Maze } from '../types';

import MemoizedMazeCell from './MazeCell';

export type MazeContainerProps = {
	width: number;
	height: number;
};

const MazeContainer: React.FC<MazeContainerProps> = ({ width, height }) => {
	const [maze, setMaze] = useState<Maze>([]);

	useEffect(() => {
		setMaze(createMaze(width, height));
	}, []);

	if (maze.length === 0) {
		return null;
	}

	return (
		<div
			className={clsx('grid gap-[2px]')}
			style={{
				gridTemplateRows: `repeat(${width + 1}, 20px)`,
				gridTemplateColumns: `repeat(${height + 1}, 20px)`,
			}}>
			{maze.map((row, y) =>
				row.map((cell, x) => (
					<MemoizedMazeCell key={`${cell}${x}${y}`} type={cell} x={x} y={y} />
				)),
			)}
		</div>
	);
};

export default MazeContainer;
