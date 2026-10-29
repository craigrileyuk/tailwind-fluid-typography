<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  nextTick,
  watch,
} from "vue";

// Keep in sync with the plugin options in style.css (these are the plugin defaults)
const MIN_SCREEN = 320;
const MAX_SCREEN = 1920;

// Full class names so Tailwind can see them when scanning this file
const sizes = [
  { name: "9xl", cls: "text-fluid-9xl" },
  { name: "8xl", cls: "text-fluid-8xl" },
  { name: "7xl", cls: "text-fluid-7xl" },
  { name: "6xl", cls: "text-fluid-6xl" },
  { name: "5xl", cls: "text-fluid-5xl" },
  { name: "4xl", cls: "text-fluid-4xl" },
  { name: "3xl", cls: "text-fluid-3xl" },
  { name: "2xl", cls: "text-fluid-2xl" },
  { name: "xl", cls: "text-fluid-xl" },
  { name: "lg", cls: "text-fluid-lg" },
  { name: "base", cls: "text-fluid-base" },
  { name: "sm", cls: "text-fluid-sm" },
  { name: "xs", cls: "text-fluid-xs" },
];

const tabs = [
  { id: "scale", label: "Scale" },
  { id: "prose", label: "Prose" },
];

const tab = ref("scale");
const sample = ref("Fluid");
const viewport = ref(0);
const sizePx = reactive({});
const copied = ref("");
const sampleEls = {};

// Read the real computed size so the table shows what the browser actually rendered
function measure() {
  viewport.value = window.innerWidth;
  for (const [name, el] of Object.entries(sampleEls)) {
    if (el) sizePx[name] = parseFloat(getComputedStyle(el).fontSize);
  }
}

const progress = computed(() => {
  const p = (viewport.value - MIN_SCREEN) / (MAX_SCREEN - MIN_SCREEN);
  return Math.min(1, Math.max(0, p)) * 100;
});

async function copyClass(cls) {
  try {
    await navigator.clipboard.writeText(cls);
    copied.value = cls;
    setTimeout(() => {
      if (copied.value === cls) copied.value = "";
    }, 1200);
  } catch {
    // Clipboard can be unavailable (e.g. insecure context); nothing useful to do
  }
}

watch(tab, () => nextTick(measure));
onMounted(() => {
  measure();
  window.addEventListener("resize", measure);
});
onBeforeUnmount(() => window.removeEventListener("resize", measure));
</script>

<template>
  <div
    class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
  >
    <header
      class="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div
        class="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 class="text-base font-semibold">tailwind-fluid-typography</h1>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Sizes scale smoothly between {{ MIN_SCREEN }}px and
            {{ MAX_SCREEN }}px wide. Resize the window to see them change.
          </p>
        </div>

        <div class="w-full shrink-0 sm:w-56" aria-live="off">
          <div
            class="flex justify-between text-xs text-slate-600 dark:text-slate-400"
          >
            <span>Viewport</span>
            <span class="font-mono text-slate-900 dark:text-slate-100"
              >{{ viewport }}px</span
            >
          </div>
          <div class="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              class="h-full rounded-full bg-teal-600 dark:bg-teal-400"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <div
            class="mt-1 flex justify-between font-mono text-[11px] text-slate-500"
          >
            <span>{{ MIN_SCREEN }}</span>
            <span>{{ MAX_SCREEN }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div
          role="tablist"
          class="inline-flex self-start rounded-md border border-slate-300 p-0.5 dark:border-slate-700"
        >
          <button
            v-for="t in tabs"
            :key="t.id"
            type="button"
            role="tab"
            :aria-selected="tab === t.id"
            class="rounded px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
            :class="
              tab === t.id
                ? 'bg-teal-700 text-white dark:bg-teal-400 dark:text-slate-950'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            "
            @click="tab = t.id"
          >
            {{ t.label }}
          </button>
        </div>

        <label
          v-show="tab === 'scale'"
          class="flex flex-1 flex-col gap-1 text-sm sm:max-w-md"
        >
          <span class="text-slate-600 dark:text-slate-400">Sample text</span>
          <input
            v-model="sample"
            type="text"
            class="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </div>

      <!-- Scale: every size, with its rendered size at the current viewport -->
      <ul
        v-show="tab === 'scale'"
        class="mt-6 divide-y divide-slate-200 dark:divide-slate-800"
      >
        <li
          v-for="s in sizes"
          :key="s.name"
          class="grid gap-x-6 gap-y-1 py-4 md:grid-cols-[11rem_1fr]"
        >
          <div
            class="flex items-baseline justify-between gap-2 text-sm md:block"
          >
            <button
              type="button"
              class="rounded font-mono text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-teal-300"
              :title="'Copy ' + s.cls"
              @click="copyClass(s.cls)"
            >
              {{ s.cls }}
            </button>
            <p class="text-slate-600 dark:text-slate-400">
              <span v-if="copied === s.cls">Copied</span>
              <span v-else class="font-mono">{{
                sizePx[s.name] ? sizePx[s.name].toFixed(1) + "px" : ""
              }}</span>
            </p>
          </div>
          <p
            :ref="(el) => (sampleEls[s.name] = el)"
            class="min-w-0 [overflow-wrap:anywhere]"
            :class="s.cls"
          >
            {{ sample || " " }}
          </p>
        </li>
      </ul>

      <!-- Prose: plain headings styled by the .fluid-prose wrapper -->
      <article
        v-show="tab === 'prose'"
        class="fluid-prose mt-6 max-w-3xl space-y-3 [&_p]:text-fluid-base"
      >
        <h1>Fluid prose headings</h1>
        <p>
          Wrapping content in <code class="font-mono">fluid-prose</code> gives
          every heading a fluid size without adding classes to each element. The
          sizes follow the same scale as the other tab.
        </p>
        <h2>Second level heading</h2>
        <p>
          Utility classes on a single heading still win, so
          <code class="font-mono">text-fluid-lg</code> or
          <code class="font-mono">leading-tight</code> can override one element
          when needed.
        </p>
        <h3>Third level heading</h3>
        <p>
          Body copy uses <code class="font-mono">text-fluid-base</code>, which
          stays at 1rem.
        </p>
        <h4>Fourth level heading</h4>
        <h5>Fifth level heading</h5>
        <h6>Sixth level heading</h6>
      </article>
    </main>
  </div>
</template>
