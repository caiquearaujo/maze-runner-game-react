import React from 'react';
import useTimer from '../hooks/useTimer';

const EndScreen: React.FC = () => {
	const { displayTime } = useTimer();

	return (
		<div className="w-full h-screen text-center flex items-center justify-center">
			<p className="text-3xl sm:text-6xl">You did it in {displayTime}!</p>
		</div>
	);
};

export default EndScreen;
