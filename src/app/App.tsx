import React from 'react';

import useTimer from './hooks/useTimer';

import StartScreen from './screens/StartScreen';
import EndScreen from './screens/EndScreen';
import InGameScreen from './screens/InGameScreen';

const App: React.FC = () => {
	const { started, playing } = useTimer();

	if (started === false) {
		return (
			<main>
				<StartScreen />
			</main>
		);
	}

	if (playing === false) {
		return (
			<main>
				<EndScreen />
			</main>
		);
	}

	return (
		<main>
			<InGameScreen />
		</main>
	);
};

export default App;
