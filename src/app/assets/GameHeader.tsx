import React from 'react';
import clsx from 'clsx';

import { Level, Resources } from '../types';
import ArrowKeyIcon from '../icons/ArrowKeyIcon';
import TwoKeyIcon from '../icons/TwoKeyIcon';
import OneKeyIcon from '../icons/OneKeyIcon';

export type GameHeaderProps = {
	level: Level;
	resources: Resources;
	className?: string;
};

const GameHeader: React.FC<GameHeaderProps> = ({ level, resources, className }) => (
	<div
		className={clsx(
			'flex flex-row gap-8 justify-between items-end text-white text-left',
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
		<div
			className={clsx('flex flex-col', resources.reveals === 0 && 'opacity-50')}>
			<span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 mb-2 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
				+{level.reveal_cost}m
			</span>
			<span className="text-xs uppercase">Reveals</span>
			<div className="flex flex-row items-center gap-1">
				<p>{resources.reveals}</p>
				<OneKeyIcon className="w-6 h-auto fill-white" />
			</div>
		</div>
		<div
			className={clsx('flex flex-col', resources.markers === 0 && 'opacity-50')}>
			<span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 mb-2 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
				+{level.marker_cost}s
			</span>
			<span className="text-xs uppercase">Markers</span>
			<div className="flex flex-row items-center gap-1">
				<p>{resources.markers}</p>
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
