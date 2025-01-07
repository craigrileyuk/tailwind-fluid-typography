<p align="center">
   <img alt="Tailwind Fluid Typography" width="100" src="./.github/logo.png">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/dm/tailwind-fluid-typography.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/tailwind-fluid-typography"><img src="https://img.shields.io/npm/v/tailwind-fluid-typography.svg" alt="Version"></a>
  <a href="https://github.com/craigrileyuk/tailwind-fluid-typography/blob/main/LICENCE"><img src="https://img.shields.io/github/license/craigrileyuk/tailwind-fluid-typography?style=flat" alt="Licence"></a>
</p>

# Tailwind Fluid Typography

Based on the fluid typography theory devised by [Mike Riethmuller](https://madebymike.com.au) and incorporating ideas from Google's Material Design spec, Tailwind Fluid Typography gives you a new set of utility classes that scale modularly depending on screen size.

- Set breakpoints for when your type should start and stop scaling
- Dual scaling system gives you the ability to set your desired scale for your lower breakpoint and for your higher breakpoint
- Provides xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl and 9xl font-sizes

## Installation

```
npm i tailwind-fluid-typography
// or
yarn add tailwind-fluid-typography
```

```js
// tailwind.config.js
import fluidTypography from "tailwind-fluid-typography";

export default {
  theme: {
    fluidTypography: {},
  },
  plugins: [fluidTypography],
};
```

## Usage

```html
<h1 class="fluid-4xl">Fluid Typography @ 4XL</h1>
<h2 class="fluid-3xl">Fluid Typography @ 3XL</h2>
<h3 class="fluid-2xl">Fluid Typography @ 2XL</h3>
<h4 class="fluid-xl">Fluid Typography @ XL</h4>
<h5 class="fluid-lg">Fluid Typography @ LG</h5>
<h6 class="md:fluid-lg">Fluid Typography @ LG</h6>
<p class="fluid-base">Fluid Typography</p>
<p class="fluid-sm">Fluid Typography @ SM</p>
<small class="fluid-xs">Fluid Typography @ XS</small>
```

## Customisation

To customise the plugin settings, you can pass the following properties as part of a `fluidTypography` property on `theme`:

| Name          | Type   | Default | Description                                                    |
| ------------- | ------ | ------- | -------------------------------------------------------------- |
| remSize       | Number | 16      | The px size to assume for 1rem ( <sup>\*</sup>reference only ) |
| minScreenSize | Number | 320     | The screen size (in px) at which to begin scaling              |
| maxScreenSize | Number | 1920    | The screen size (in px) at which to stop scaling               |
| minTypeScale  | Number | 1.2     | The scaling factor to use at minScreenSize                     |
| maxTypeScale  | Number | 1.333   | The scaling factor to use at maxScreenSize                     |
| lineHeight    | Number | 1.35    | The line-height to use for heading classes                     |

- _remSize is required as configuration for Tailwind to setup fluid typography classes. It does not change your actual html base REM size, you must do this yourself._

For example:

```js
theme: {
    fluidTypography: {
        remSize: 14,
        minScreenSize: 600,
        maxScreenSize: 1280,
        minTypeScale: 1.250,
        maxTypeScale: 1.618,
        lineHeight: 1.5
    }
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

At times, you may need to render fluid typography of which you don't have direct control over the classes. Because the style requirements of this vary greatly between sites, we haven't included the functionality in the plugin itself, but it is easily implemented in your own Tailwind stylesheet:

```css
@layer utilities {
  .fluid-prose {
    :where(h1) {
      @apply fluid-5xl mb-0;
    }
    :where(h2) {
      @apply fluid-4xl mb-0;
    }
    :where(h3) {
      @apply fluid-3xl mb-0;
    }
    :where(h4) {
      @apply fluid-2xl mb-0;
    }
    :where(h5) {
      @apply fluid-xl mb-0;
    }
    :where(h6) {
      @apply fluid-lg mb-0;
    }
  }
}
```

In case you were wondering, the `:where` selector comes with a CSS specificity of 0, so it is more easily overridden by other utility/custom classes than a normal `<h1>`-style rule.
