import { useContext } from 'react';
import { TimerContext } from '../providers/TimerProvider';

const useTimer = () => {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error('useTimer must be used within a TimerProvider');
	}

	return context;
};

export default useTimer;
