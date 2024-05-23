import React from 'react';
import clsx from 'clsx';

import useTimer from '../hooks/useTimer';

const TimeDisplay: React.FC<{ className?: string }> = ({ className }) => {
	const { displayTime } = useTimer();

	return <p className={clsx('uppercase', className)}>{displayTime}</p>;
};

const MemoizedTimeDisplay = React.memo(TimeDisplay);
export default MemoizedTimeDisplay;
