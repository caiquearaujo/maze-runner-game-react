import React, { useEffect } from 'react';
import useTimer from '../hooks/useTimer';

const StartScreen: React.FC = () => {
	const { startGame } = useTimer();

	useEffect(() => {
		let started = false;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (started) {
				return;
			}

			if (event.key === 'Enter') {
				started = true;
				startGame();
				console.log('Game started');
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className="w-full h-screen text-center flex items-center justify-center">
			<p className="text-3xl sm:text-6xl">
				Press <span className="font-bold italic">&lt;&lt;enter&gt;&gt;</span> to
				start the game
			</p>
		</div>
	);
};

export default StartScreen;
