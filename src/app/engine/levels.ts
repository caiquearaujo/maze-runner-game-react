import { Level, LevelLabel } from '../types';

const levels: Record<LevelLabel, Level> = {
	easy: {
		label: 'Easy',
		width: 25,
		height: 25,
		size: 20,
		reveals: 1,
		reveal_cost: 1,
		time_limit: 3,
		markers: 5,
		marker_cost: 15,
		visibility: 6,
	},
	medium: {
		label: 'Medium',
		width: 37,
		height: 37,
		size: 16,
		reveals: 2,
		reveal_cost: 2,
		time_limit: 9,
		markers: 10,
		marker_cost: 35,
		visibility: 8,
	},
	hard: {
		label: 'Hard',
		width: 49,
		height: 49,
		size: 12,
		reveals: 3,
		time_limit: 15,
		reveal_cost: 3,
		markers: 15,
		marker_cost: 50,
		visibility: 12,
	},
};

export default levels;
