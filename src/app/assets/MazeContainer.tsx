import React, { useCallback, useEffect } from 'react';

import useTimer from '../hooks/useTimer';
import { GRID_TYPE } from '../engine/maze';
import { Maze } from '../types';

import MemoizedMazeCell from './MazeCell';

export type MazeContainerProps = {
	maze: Maze;
	width: number;
	height: number;
	size: number;
	visibility?: number;
};

const MazeContainer: React.FC<MazeContainerProps> = ({
	maze,
	visibility,
	width,
	height,
	size = 20,
}) => {
	const { player, endGame } = useTimer();
	const [fov, setFov] = React.useState(new Set<string>());

	const isWithinBounds = useCallback(
		(x: number, y: number) => x >= 0 && y >= 0 && x < height && y < width,
		[width, height],
	);

	const castRay = useCallback(
		(cells: Set<string>, x0: number, y0: number, x1: number, y1: number) => {
			const dx = Math.abs(x1 - x0);
			const dy = Math.abs(y1 - y0);
			const sx = x0 < x1 ? 1 : -1;
			const sy = y0 < y1 ? 1 : -1;
			let err = dx - dy;

			while (true) {
				if (isWithinBounds(x0, y0)) {
					cells.add(`${x0},${y0}`);
					if (maze[y0][x0] === GRID_TYPE.WALL) break;
				} else {
					break;
				}

				if (x0 === x1 && y0 === y1) break;
				const e2 = err * 2;

				if (e2 > -dy) {
					err -= dy;
					/* eslint-disable-next-line no-param-reassign */
					x0 += sx;
				}

				if (e2 < dx) {
					err += dx;
					/* eslint-disable-next-line no-param-reassign */
					y0 += sy;
				}
			}
		},
		[maze, isWithinBounds],
	);

	const calculateVisibility = useCallback(() => {
		const cells = new Set<string>();

		if (!visibility) {
			return cells;
		}

		for (let y = -visibility; y <= visibility; y += 1) {
			for (let x = -visibility; x <= visibility; x += 1) {
				if (Math.sqrt(x * x + y * y) <= visibility) {
					castRay(cells, player.x, player.y, player.x + x, player.y + y);
				}
			}
		}

		return cells;
	}, [visibility, player, castRay]);

	const kindOfCell = useCallback(
		(cell: number, x: number, y: number) => {
			if (visibility && !fov.has(`${x},${y}`)) {
				return GRID_TYPE.WALL;
			}

			if (player.x === x && player.y === y) {
				if (cell === GRID_TYPE.EXIT_BLOCK) {
					endGame();
				}

				return GRID_TYPE.PLAYER;
			}

			return cell;
		},
		[player, fov],
	);

	useEffect(() => {
		if (maze.length === 0) {
			return;
		}

		setFov(calculateVisibility());
	}, [maze.length]);

	useEffect(() => {
		if (maze.length === 0) {
			return;
		}

		setFov(calculateVisibility());
	}, [player]);

	if (maze.length === 0) {
		return null;
	}

	return (
		<div
			className="grid"
			style={{
				gridTemplateRows: `repeat(${width}, ${size}px)`,
				gridTemplateColumns: `repeat(${height}, ${size}px)`,
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
							size={size}
						/>
					);
				}),
			)}
		</div>
	);
};

export default MazeContainer;
