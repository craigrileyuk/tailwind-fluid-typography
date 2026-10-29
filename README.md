<p align="center">
   <img alt="Tailwind Fluid Typography" width="100" src="./.github/logo.png">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/dm/tailwind-fluid-typography.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/tailwind-fluid-typography"><img src="https://img.shields.io/npm/v/tailwind-fluid-typography.svg" alt="Version"></a>
  <a href="https://github.com/craigrileyuk/tailwind-fluid-typography/blob/main/LICENCE"><img src="https://img.shields.io/github/license/craigrileyuk/tailwind-fluid-typography?style=flat" alt="Licence"></a>
</p>

# Tailwind Fluid Typography

> [!IMPORTANT]
> For Tailwind v3 support, use [version 2](https://github.com/craigrileyuk/tailwind-fluid-typography/blob/v2.0.0/README.md) of this plugin, for Tailwind v4, use version 3.

Based on the fluid typography theory devised by [Mike Riethmuller](https://madebymike.com.au) and incorporating ideas from Google's Material Design spec, Tailwind Fluid Typography gives you a new set of utility classes that scale modularly depending on screen size.

- Set breakpoints for when your type should start and stop scaling
- Dual scaling system gives you the ability to set your desired scale for your lower breakpoint and for your higher breakpoint
- Provides xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl and 9xl font-sizes

## Migrating from v2 to v3

Version 3 is a rewrite for Tailwind v4's CSS-first configuration. If you are staying on Tailwind v3, keep using version 2.

**1. Move your configuration into CSS.** The plugin is no longer registered in `tailwind.config.js`, and the `theme.fluidTypography` object is no longer read. Load the plugin in your stylesheet and pass options as kebab-case properties:

```diff
-// tailwind.config.js
-theme: {
-  fluidTypography: { remSize: 14, minTypeScale: 1.25 },
-},
-plugins: [fluidTypography],
+/* app.css */
+@import "tailwindcss";
+@plugin "tailwind-fluid-typography" {
+  rem-size: 14;
+  min-type-scale: 1.25;
+}
```

**2. Rename your classes.** Every `fluid-*` class is now `text-fluid-*`, including any variants or `@apply` rules:

```diff
-<h1 class="fluid-4xl md:fluid-5xl">
+<h1 class="text-fluid-4xl md:text-fluid-5xl">
```

**3. Check your root font size.** In v2, `remSize` was reference only and you had to set your `<html>` font size yourself. In v3 the plugin does it for you: if `rem-size` is not `16`, it sets `html { font-size }` as a percentage of the browser default. Remove your own `html` font-size rule, or the two will compound.

**4. Replace the `--fluid-line-height` and `--fluid-letter-spacing` variables.** These no longer exist. Sizes are now real Tailwind font sizes, so use Tailwind's own `leading-*` and `tracking-*` utilities to override a single element.

**5. Remove your own `.fluid-prose` rules.** The plugin now provides `fluid-prose` itself (see [Fluid Prose](#fluid-prose)). Your own definition can stay if you want a different heading mapping.

**6. Review these smaller changes:**

- `xs` and `sm` now scale correctly. In v2 their `clamp()` bounds were inverted, so they never changed size.
- Letter-spacing on `xs`, `sm` and `base` is now in `em`, so it scales with the font size, and follows Material Design's values. Previously it was a small fixed pixel value.
- Invalid options (non-numbers, zero or negative values, or a `max-screen-size` that is not larger than `min-screen-size`) fall back to their defaults.
- Requiring the package from CommonJS needs Node 22.12 or later.

## Installation

Requires Tailwind CSS v4.

```
npm i tailwind-fluid-typography
// or
pnpm add tailwind-fluid-typography
// or
yarn add tailwind-fluid-typography
```

```css
/* app.css */
@import "tailwindcss";
@plugin "tailwind-fluid-typography";
```

## Usage

```html
<h1 class="text-fluid-4xl">Fluid Typography @ 4XL</h1>
<h2 class="text-fluid-3xl">Fluid Typography @ 3XL</h2>
<h3 class="text-fluid-2xl">Fluid Typography @ 2XL</h3>
<h4 class="text-fluid-xl">Fluid Typography @ XL</h4>
<h5 class="text-fluid-lg">Fluid Typography @ LG</h5>
<h6 class="md:text-fluid-lg">Fluid Typography @ LG from the md breakpoint</h6>
<p class="text-fluid-base">Fluid Typography</p>
<p class="text-fluid-sm">Fluid Typography @ SM</p>
<small class="text-fluid-xs">Fluid Typography @ XS</small>
```

The sizes are registered as Tailwind font sizes, so they work with variants and with the rest of Tailwind's typography utilities. Each size carries its own line-height and letter-spacing, which `leading-*` and `tracking-*` override on a single element:

```html
<h1 class="text-fluid-4xl leading-tight tracking-wide">Overridden line-height and tracking</h1>
```

Note that Tailwind's line-height shorthand (`text-fluid-sm/6`) replaces the size's line-height and drops its default letter-spacing.

## Customisation

To customise the plugin, pass options in the `@plugin` block of your stylesheet. Option names are kebab-case:

| Name              | Type   | Default | Description                                                                               |
| ----------------- | ------ | ------- | ----------------------------------------------------------------------------------------- |
| `rem-size`        | Number | 16      | The px size of 1rem. If not 16, the plugin sets the `<html>` font size to match           |
| `min-screen-size` | Number | 320     | The screen size (in px) at which to begin scaling                                         |
| `max-screen-size` | Number | 1920    | The screen size (in px) at which to stop scaling                                          |
| `min-type-scale`  | Number | 1.2     | The scaling factor to use at `min-screen-size`                                            |
| `max-type-scale`  | Number | 1.333   | The scaling factor to use at `max-screen-size`                                            |
| `line-height`     | Number | 1.35    | The line-height for every size except `sm` and `base`, which use fixed values (1.5, 1.4) |

- _When `rem-size` is not 16, the `<html>` font size is set to `rem-size / 16` as a percentage, so your users' own browser font-size setting is still respected._

For example:

```css
@plugin "tailwind-fluid-typography" {
  rem-size: 14;
  min-screen-size: 600;
  max-screen-size: 1280;
  min-type-scale: 1.25;
  max-type-scale: 1.618;
  line-height: 1.5;
}
```

### Suggested type scales

|                  |       |                      |
| ---------------- | ----- | -------------------- |
| Minor Second     | 1.067 |                      |
| Major Second     | 1.125 |                      |
| Minor Third      | 1.200 | default minTypeScale |
| Major Third      | 1.250 |                      |
| Perfect Fourth   | 1.333 | default maxTypeScale |
| Augmented Fourth | 1.414 |                      |
| Perfect Fifth    | 1.500 |                      |
| Golden Ratio     | 1.618 |                      |

## Fluid Prose

At times, you may need to render fluid typography of which you don't have direct control over the classes, such as rendered Markdown or CMS content. Add `fluid-prose` to a wrapping element and every heading inside it is sized for you:

```html
<article class="fluid-prose">
  <h1>Sized as text-fluid-5xl</h1>
  <h2>Sized as text-fluid-4xl</h2>
  <p>Paragraphs are left alone</p>
</article>
```

| Element | Size       |
| ------- | ---------- |
| `h1`    | `5xl`      |
| `h2`    | `4xl`      |
| `h3`    | `3xl`      |
| `h4`    | `2xl`      |
| `h5`    | `xl`       |
| `h6`    | `lg`       |

Only the font size, line-height and letter-spacing of headings are set. Margins and paragraph styles are left to you, because they vary greatly between sites. To size body text, add `text-fluid-base` to your content, for example with `[&_p]:text-fluid-base` on the wrapper.

The rules use the `:where` selector, which has a CSS specificity of 0, so a utility class on an individual heading (such as `text-fluid-lg` or `leading-tight`) overrides it.
