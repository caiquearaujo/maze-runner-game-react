import React from 'react';
// import useTimer from '../hooks/useTimer';
import MazeContainer from '../assets/MazeContainer';

const InGameScreen: React.FC = () => {
	// const { startGame, endGame, displayTime } = useTimer();

	return (
		<div className="w-full h-screen text-center flex items-center justify-center">
			<MazeContainer width={24} height={24} />
		</div>
	);
};

export default InGameScreen;
