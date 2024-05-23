import React from 'react';

import useTimer from '../hooks/useTimer';

const TimeDisplay: React.FC = () => {
	const { displayTime } = useTimer();

	return <p className="uppercase">{displayTime}</p>;
};

const MemoizedTimeDisplay = React.memo(TimeDisplay);
export default MemoizedTimeDisplay;
