import React from 'react';
import useTimer from '../hooks/useTimer';

const EndScreen: React.FC = () => {
	const { displayTime, states } = useTimer();

	if (states.won === false) {
		return (
			<div className="w-full h-screen text-center flex items-center justify-center">
				<p className="text-3xl sm:text-6xl">You lose...</p>
			</div>
		);
	}

	return (
		<div className="w-full h-screen text-center flex items-center justify-center">
			<p className="text-3xl sm:text-6xl">You did it in {displayTime}!</p>
		</div>
	);
};

export default EndScreen;
