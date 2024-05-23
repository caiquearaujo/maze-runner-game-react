import { Level, LevelLabel } from '../types';

const levels: Record<LevelLabel, Level> = {
	easy: {
		label: 'Easy',
		width: 25,
		height: 25,
		size: 20,
		revels: 1,
		time_limit: 3,
		markers: 5,
		visibility: 6,
	},
	medium: {
		label: 'Medium',
		width: 37,
		height: 37,
		size: 16,
		revels: 2,
		time_limit: 9,
		markers: 10,
		visibility: 8,
	},
	hard: {
		label: 'Hard',
		width: 49,
		height: 49,
		size: 12,
		revels: 3,
		time_limit: 15,
		markers: 15,
		visibility: 12,
	},
};

export default levels;
