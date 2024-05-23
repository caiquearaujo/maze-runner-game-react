import React, { useCallback } from 'react';
import clsx from 'clsx';

import useTimer from '../hooks/useTimer';
import { GRID_TYPE } from '../engine/maze';
import { Maze } from '../types';

import MemoizedMazeCell from './MazeCell';

export type MazeContainerProps = {
	maze: Maze;
	width: number;
	height: number;
};

const MazeContainer: React.FC<MazeContainerProps> = ({ maze, width, height }) => {
	const { player } = useTimer();

	const kindOfCell = useCallback(
		(cell: number, x: number, y: number) => {
			if (player.x === x && player.y === y) {
				return GRID_TYPE.PLAYER;
			}

			return cell;
		},
		[player],
	);

	if (maze.length === 0) {
		return null;
	}

	return (
		<div
			className={clsx('grid gap-[2px]')}
			style={{
				gridTemplateRows: `repeat(${width}, 20px)`,
				gridTemplateColumns: `repeat(${height}, 20px)`,
			}}>
			{maze.map((row, y) =>
				row.map((cell, x) => {
					const kindOf = kindOfCell(cell, x, y);
					return (
						<MemoizedMazeCell
							key={`${kindOf}${x}${y}`}
							type={kindOf}
							x={x}
							y={y}
						/>
					);
				}),
			)}
		</div>
	);
};

export default MazeContainer;
