import React from 'react';

export type EnterKeyIconProps = {
	className?: string;
};

const EnterKeyIcon: React.FC<EnterKeyIconProps> = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 256 256"
		xmlns="http://www.w3.org/2000/svg">
		<rect fill="none" height="256" width="256" />
		<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-32,96a8,8,0,0,1-8,8H99.3l10.4,10.3a8.1,8.1,0,0,1,0,11.4,8.2,8.2,0,0,1-11.4,0l-24-24a8.1,8.1,0,0,1,0-11.4l24-24a8.1,8.1,0,0,1,11.4,11.4L99.3,128H168V104a8,8,0,0,1,16,0Z" />
	</svg>
);

export default EnterKeyIcon;
