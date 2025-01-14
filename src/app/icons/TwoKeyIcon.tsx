import React from 'react';

export type TwoKeyIconProps = {
	className?: string;
};

const TwoKeyIcon: React.FC<TwoKeyIconProps> = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 256 256"
		xmlns="http://www.w3.org/2000/svg">
		<rect fill="none" height="256" width="256" />
		<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM152,168a8,8,0,0,1,0,16H104a7.3,7.3,0,0,1-2.5-.4A8,8,0,0,1,96,176a7.5,7.5,0,0,1,1.7-4.9l43.7-58.3A16,16,0,0,0,128,88a15.9,15.9,0,0,0-14.7,9.8,8.1,8.1,0,0,1-10.5,4.2,8,8,0,0,1-4.3-10.5,32,32,0,1,1,56,30.4l-.2.3L120,168Z" />
	</svg>
);

export default TwoKeyIcon;
