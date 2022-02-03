<template>
  <h1 class="fluid-5xl">Fluid 5XL</h1>
  <h2 class="fluid-4xl">Fluid 4XL</h2>
  <h3 class="fluid-3xl">Fluid 3XL</h3>
  <h4 class="fluid-2xl">Fluid 2XL</h4>
  <h5 class="fluid-xl">Fluid XL</h5>
  <h6 class="fluid-lg">Fluid LG</h6>
  <p class="fluid-base">Fluid BASE</p>
  <div class="fluid-prose">
    <div>
      <section>
        <article>
          <h1 style="--fluid-line-height: 2.5; --fluid-letter-spacing: 10px">
            Fluid 5XL
          </h1>
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
