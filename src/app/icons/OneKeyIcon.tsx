import React from 'react';

export type OneKeyIconProps = {
	className?: string;
};

const OneKeyIcon: React.FC<OneKeyIconProps> = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 256 256"
		xmlns="http://www.w3.org/2000/svg">
		<rect fill="none" height="256" width="256" />
		<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM140,176a8,8,0,0,1-16,0V99l-11.6,7.6a7.8,7.8,0,0,1-11-2.2,8,8,0,0,1,2.2-11.1l24-16A8,8,0,0,1,140,84Z" />
	</svg>
);

export default OneKeyIcon;
