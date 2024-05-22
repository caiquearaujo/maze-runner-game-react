import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			sans: [
				'Inter',
				'Roboto',
				'"Helvetica Neue"',
				'"Segoe UI"',
				'Arial',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
				'sans-serif',
			],
			mono: ['"DM Mono"', 'Consolas', '"Courier New"', 'monospace'],
		},
	},
	plugins: [],
};

export default config;
