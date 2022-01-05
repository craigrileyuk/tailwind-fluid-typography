<img alt="Tailwind Fluid Typography" width="100" src="./.github/logo.png">

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
module.exports = {
  theme: {
    fluidTypography: {},
  },
  plugins: [require("tailwind-fluid-typography")],
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

| Name          | Type   | Default | Description                                       |
| ------------- | ------ | ------- | ------------------------------------------------- |
| remSize       | Number | 16      | The px size to assume for 1rem                    |
| minScreenSize | Number | 320     | The screen size (in px) at which to begin scaling |
| maxScreenSize | Number | 1920    | The screen size (in px) at which to stop scaling  |
| minTypeScale  | Number | 1.2     | The scaling factor to use at minScreenSize        |
| maxTypeScale  | Number | 1.333   | The scaling factor to use at maxScreenSize        |
| lineHeight    | Number | 1.35    | The line-height to use for heading classes        |

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
