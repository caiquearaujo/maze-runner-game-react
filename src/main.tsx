import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App.tsx';
import './index.css';
import TimerProvider from './app/providers/TimerProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TimerProvider>
			<App />
		</TimerProvider>
	</React.StrictMode>,
);
