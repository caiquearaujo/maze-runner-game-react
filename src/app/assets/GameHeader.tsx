import React from 'react';
import clsx from 'clsx';

import { Level } from '../types';
import ArrowKeyIcon from '../icons/ArrowKeyIcon';
import TwoKeyIcon from '../icons/TwoKeyIcon';
import OneKeyIcon from '../icons/OneKeyIcon';

export type GameHeaderProps = {
	level: Level;
	className?: string;
};

const GameHeader: React.FC<GameHeaderProps> = ({ level, className }) => (
	<div
		className={clsx(
			'flex flex-row gap-8 justify-between items-center text-white text-left',
			className,
		)}>
		<div>
			<span className="text-xs uppercase">Level</span>
			<p>{level.label}</p>
		</div>
		<div>
			<span className="text-xs uppercase">Move player</span>
			<div className="flex flex-row items-center gap-1">
				<ArrowKeyIcon direction="up" className="w-6 h-auto fill-white" />
				<ArrowKeyIcon direction="left" className="w-6 h-auto fill-white" />
				<ArrowKeyIcon direction="down" className="w-6 h-auto fill-white" />
				<ArrowKeyIcon direction="right" className="w-6 h-auto fill-white" />
			</div>
		</div>
		<div>
			<span className="text-xs uppercase">Reveals</span>
			<div className="flex flex-row items-center gap-1">
				<p>{level.revels}</p>
				<OneKeyIcon className="w-6 h-auto fill-white" />
			</div>
		</div>
		<div>
			<span className="text-xs uppercase">Markers</span>
			<div className="flex flex-row items-center gap-1">
				<p>{level.markers}</p>
				<TwoKeyIcon className="w-6 h-auto fill-white" />
			</div>
		</div>
		<div>
			<span className="text-xs uppercase">Time limit</span>
			<p>{level.time_limit} minutes</p>
		</div>
	</div>
);

const MemoizedGameHeader = React.memo(GameHeader);
export default MemoizedGameHeader;
