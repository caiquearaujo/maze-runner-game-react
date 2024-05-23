import React from 'react';
import { Direction } from '../types';

export type ArrowKeyIconProps = {
	className?: string;
	direction: Direction;
};

const ArrowKeyIcon: React.FC<ArrowKeyIconProps> = ({ className, direction }) => {
	let angle = 0;

	switch (direction) {
		case 'left':
			angle = 90;
			break;
		case 'right':
			angle = 270;
			break;
		case 'down':
			angle = 180;
			break;
		default:
			angle = 0;
	}

	return (
		<svg
			className={className}
			version="1.1"
			viewBox="0 0 1024 1024"
			xmlns="http://www.w3.org/2000/svg"
			style={{ translate: `rotate(${angle}deg)` }}>
			<path d="M895,802.7v-581c0-44.5-36.2-80.8-80.8-80.8H209.8c-44.5,0-80.8,36.2-80.8,80.8v580.4  c0,44.6,36.3,80.8,80.8,80.8h604.9C859,883,895,847,895,802.7z M669.8,516.5h-125v177h-65.5v-177h-125L512,330.6L669.8,516.5z" />
		</svg>
	);
};

export default ArrowKeyIcon;
