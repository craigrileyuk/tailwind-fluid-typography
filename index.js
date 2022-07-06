const plugin = require("tailwindcss/plugin");

// React Demo: https://codesandbox.io/s/clamp-linear-intepolation-based-on-viewport-width-builder-xgkft

function generateFluidRule(power, { minTypeScale, maxTypeScale, minScreenSize, maxScreenSize, remSize }) {
	const minFontSize = Math.pow(minTypeScale, power);
	const maxFontSize = Math.pow(maxTypeScale, power);
	// Transform the screen sizes from px values to expected rem values
	const minScreenSizeRem = minScreenSize / remSize;
	const maxScreenSizeRem = maxScreenSize / remSize;
	// Quick function to round calculations to a locked number of decimal places
	const r = (v) => v.toFixed(4);

	const slope = (maxFontSize - minFontSize) / (maxScreenSizeRem - minScreenSizeRem);
	let interpolation = minFontSize - slope * minScreenSizeRem;
	let sign = "+";
	if (interpolation < 0) {
		sign = "-";
		interpolation = Math.abs(interpolation);
	}

	// Return the formatted CSS value for the font-size
	return `clamp(${r(minFontSize)}rem, calc(${r(slope * 100)}vw ${sign} ${r(interpolation)}rem), ${r(
		maxFontSize
	)}rem)`;
}

const fluidTypography = function ({ addUtilities, theme }) {
	const fluidConfig = {};
	const hasCustomRem = !!theme("fluidTypography.remSize");
	/**
	 * Suggested px value of rem. Since all browsers use 16, this is the default
	 */
	fluidConfig.remSize = theme("fluidTypography.remSize", 16);
	/**
	 * This controls the scale at which the font sizes will increase at the lowest bounds (e.g. on mobile devices)
	 */
	fluidConfig.minTypeScale = theme("fluidTypography.minTypeScale", 1.2);
	/**
	 * This controls the scale at which the font sizes will increase at the highest bounds (e.g. on desktop computers)
	 */
	fluidConfig.maxTypeScale = theme("fluidTypography.maxTypeScale", 1.333);
	/**
	 * The px size of the screen at which you want the font-size to stop decreasing
	 */
	fluidConfig.minScreenSize = theme("fluidTypography.minScreenSize", 320);
	/**
	 * The px size of the screen at which you want the font-size to stop increasing
	 */
	fluidConfig.maxScreenSize = theme("fluidTypography.maxScreenSize", 1920);
	/**
	 * The relative line-height of the headings
	 */
	fluidConfig.lineHeight = theme("fluidTypography.lineHeight", 1.35);

	// letterSpacing sizes based on https://vuetifyjs.com/en/styles/text-and-typography/#typography
	const rules = {
		".fluid-base": {
			fontSize: hasCustomRem ? `${fluidConfig.remSize}px` : "1rem",
			lineHeight: 1.4,
			letterSpacing: 0.5,
		},
		".fluid-lg": {
			fontSize: generateFluidRule(1, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "0.009375em",
		},
		".fluid-xl": {
			fontSize: generateFluidRule(2, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "0.0125em",
		},
		".fluid-2xl": {
			fontSize: generateFluidRule(3, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "normal",
		},

		".fluid-3xl": {
			fontSize: generateFluidRule(4, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "0.0073529412em",
		},

		".fluid-4xl": {
			fontSize: generateFluidRule(5, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "normal",
		},
		".fluid-5xl": {
			fontSize: generateFluidRule(6, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "-0.0083333333em",
		},
		".fluid-6xl": {
			fontSize: generateFluidRule(7, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "-0.015625em",
		},
		".fluid-7xl": {
			fontSize: generateFluidRule(8, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "-0.0234375em",
		},
		".fluid-8xl": {
			fontSize: generateFluidRule(9, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "-0.03125em",
		},
		".fluid-9xl": {
			fontSize: generateFluidRule(10, fluidConfig),
			lineHeight: fluidConfig.lineHeight,
			letterSpacing: "-0.04em",
		},
	};

	addUtilities(rules);
};

module.exports = plugin(fluidTypography);
