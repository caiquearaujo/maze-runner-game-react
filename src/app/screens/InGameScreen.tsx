import React from 'react';
import useTimer from '../hooks/useTimer';

const InGameScreen: React.FC = () => {
	// const { startGame, endGame, displayTime } = useTimer();

	return (
		<div className="w-full h-screen text-center flex items-center justify-center">
			<p className="text-3xl sm:text-6xl">-- in game --</p>
		</div>
	);
};

export default InGameScreen;
