import plugin from "tailwindcss/plugin";
import { kebabCase } from "es-toolkit";

/**
 * Tailwind v4 plugin. Options are passed from CSS:
 *
 *   @plugin "tailwind-fluid-typography" {
 *       min-type-scale: 1.2;
 *       max-screen-size: 1600;
 *   }
 */
const defaults = {
  /** Suggested px value of rem. Since all browsers use 16, this is the default */
  remSize: 16,
  /** Type scale at the lowest bounds (e.g. mobile devices) */
  minTypeScale: 1.2,
  /** Type scale at the highest bounds (e.g. desktop computers) */
  maxTypeScale: 1.333,
  /** Screen width (px) at which the font-size stops decreasing */
  minScreenSize: 320,
  /** Screen width (px) at which the font-size stops increasing */
  maxScreenSize: 1920,
  /** Relative line-height of the headings */
  lineHeight: 1.35,
};

// CSS-provided option values may arrive as strings, so coerce and fall back to the default
// when a value is missing, not a number, or out of range (all of these must be positive)
function resolveOptions(options = {}) {
  const resolved = Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const userKey = kebabCase(key);
      const value = Number(options[userKey]);
      return [
        key,
        options[userKey] !== undefined && Number.isFinite(value) && value > 0
          ? value
          : fallback,
      ];
    }),
  );

  // Equal or inverted screen sizes would divide by zero or flip the slope, so reset both
  if (resolved.maxScreenSize <= resolved.minScreenSize) {
    resolved.minScreenSize = defaults.minScreenSize;
    resolved.maxScreenSize = defaults.maxScreenSize;
  }

  return resolved;
}

function generateFluidRule(
  power,
  { minTypeScale, maxTypeScale, minScreenSize, maxScreenSize, remSize },
) {
  const minFontSize = Math.pow(minTypeScale, power);
  const maxFontSize = Math.pow(maxTypeScale, power);
  // Transform the screen sizes from px values to expected rem values
  const minScreenSizeRem = minScreenSize / remSize;
  const maxScreenSizeRem = maxScreenSize / remSize;
  // Round calculations to a locked number of decimal places
  const r = (v) => v.toFixed(4);

  const slope = (maxFontSize - minFontSize) / (maxScreenSizeRem - minScreenSizeRem);
  let interpolation = minFontSize - slope * minScreenSizeRem;
  let sign = "+";
  if (interpolation < 0) {
    sign = "-";
    interpolation = Math.abs(interpolation);
  }

  // Negative powers shrink as the scale grows, so the size at minScreenSize can be the larger one.
  // clamp() needs its bounds in ascending order, otherwise the minimum always wins.
  const lower = Math.min(minFontSize, maxFontSize);
  const upper = Math.max(minFontSize, maxFontSize);

  return `clamp(${r(lower)}rem, calc(${r(slope * 100)}vw ${sign} ${r(interpolation)}rem), ${r(upper)}rem)`;
}

// Line-height and letter-spacing go through CSS variables so they can be overridden (e.g. in a prose style)
const lh = "--fluid-line-height";
const ls = "--fluid-letter-spacing";

// letterSpacing sizes based on https://vuetifyjs.com/en/styles/text-and-typography/#typography
// A missing lineHeight falls back to the lineHeight option
const sizes = {
  xs: { power: -2, letterSpacing: "0.0333333333em" },
  sm: { power: -1, lineHeight: "1.5", letterSpacing: "0.0178571429em" },
  base: { power: 0, lineHeight: "1.4", letterSpacing: "0.03125em" },
  lg: { power: 1, letterSpacing: "0.009375em" },
  xl: { power: 2, letterSpacing: "0.0125em" },
  "2xl": { power: 3, letterSpacing: "normal" },
  "3xl": { power: 4, letterSpacing: "0.0073529412em" },
  "4xl": { power: 5, letterSpacing: "normal" },
  "5xl": { power: 6, letterSpacing: "-0.0083333333em" },
  "6xl": { power: 7, letterSpacing: "-0.015625em" },
  "7xl": { power: 8, letterSpacing: "-0.0234375em" },
  "8xl": { power: 9, letterSpacing: "-0.03125em" },
  "9xl": { power: 10, letterSpacing: "-0.04em" },
};

function buildUtilities(options) {
  return Object.fromEntries(
    Object.entries(sizes).map(([name, size]) => [
      `.text-fluid-${name}`,
      {
        // The root font-size is scaled to remSize in the base layer, so 1rem is already correct
        fontSize: size.power === 0 ? "1rem" : generateFluidRule(size.power, options),
        [lh]: size.lineHeight ?? String(options.lineHeight),
        [ls]: size.letterSpacing,
        lineHeight: `var(${lh})`,
        letterSpacing: `var(${ls})`,
      },
    ]),
  );
}

export default plugin.withOptions((userOptions) => {
  const options = resolveOptions(userOptions);

  return ({ addBase, addUtilities }) => {
    // Only override the root size when it differs from the browser default. A percentage
    // (rather than px) keeps respecting the user's own browser font-size setting.
    if (options.remSize !== defaults.remSize) {
      addBase({ html: { fontSize: `${(options.remSize / defaults.remSize) * 100}%` } });
    }

    addUtilities(buildUtilities(options));
  };
});
