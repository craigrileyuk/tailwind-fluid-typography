<template>
  <h1 class="text-fluid-9xl">Fluid 9XL</h1>
  <h1 class="text-fluid-8xl">Fluid 8XL</h1>
  <h1 class="text-fluid-7xl">Fluid 7XL</h1>
  <h1 class="text-fluid-6xl">Fluid 6XL</h1>
  <h1 class="text-fluid-5xl">Fluid 5XL</h1>
  <h2 class="text-fluid-4xl">Fluid 4XL</h2>
  <h3 class="text-fluid-3xl">Fluid 3XL</h3>
  <h4 class="text-fluid-2xl">Fluid 2XL</h4>
  <h5 class="text-fluid-xl">Fluid XL</h5>
  <h6 class="text-fluid-lg">Fluid LG</h6>
  <p class="text-fluid-base">Fluid BASE</p>
  <p class="text-fluid-sm">Fluid SM</p>
  <p class="text-fluid-xs">Fluid XS</p>
  <h2 class="text-left fluid-lg uppercase font-black px-8 py-4">Prose</h2>
  <div class="fluid-prose">
    <div>
      <section>
        <article>
          <h1>Fluid 5XL</h1>
          <h2>Fluid 4XL</h2>
          <h3>Fluid 3XL</h3>
          <h4>Fluid 2XL</h4>
          <h5>Fluid XL</h5>
          <h6>Fluid LG</h6>
          <p>Fluid BASE</p>
        </article>
      </section>
    </div>
  </div>
</template>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  --testing: 1.35;
  letter-spacing: var(--testing);
}
</style>
