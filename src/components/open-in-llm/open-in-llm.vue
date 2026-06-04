<template>
  <div class="open-in-llm">
    <app-button
      :label="copyLabel"
      class="open-in-llm__copy"
      small
      aria-live="polite"
      @click="copyPage"
    />
    <app-button
      :label="'▾'"
      class="open-in-llm__toggle"
      small
      :popovertarget="popoverId"
      :aria-label="$t('open_in_llm')"
      :aria-expanded="isOpen ? 'true' : 'false'"
    />
    <ul
      :id="popoverId"
      popover="auto"
      class="open-in-llm__menu body-small"
      @toggle="onToggle"
    >
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" target="_blank" rel="noopener noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const { $t } = useNuxtApp();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const popoverId = "open-in-llm-popover";
const isOpen = ref(false);

const defaultCopyLabel = $t("copy_page");
const copyLabel = ref(defaultCopyLabel);

// The `.md` sibling is generated per prerendered page by the
// `prerender:generate` hook in nuxt.config.ts.
const markdownPath = computed(() => `${route.path.replace(/\/+$/, "")}.md`);

const markdownUrl = computed(
  () => new URL(markdownPath.value, runtimeConfig.public.baseUrl).href,
);

const links = computed(() => {
  const query = encodeURIComponent(
    $t("open_in_llm_prompt", { url: markdownUrl.value }),
  );
  return [
    { label: $t("open_as_markdown"), href: markdownPath.value },
    {
      label: $t("open_in_llm_option", { name: "Claude" }),
      href: `https://claude.ai/new?q=${query}`,
    },
    {
      label: $t("open_in_llm_option", { name: "ChatGPT" }),
      href: `https://chatgpt.com/?q=${query}&hints=search`,
    },
  ];
});

async function copyPage() {
  try {
    const response = await fetch(markdownPath.value);
    if (!response.ok) throw new Error("Failed to fetch markdown");
    await navigator.clipboard.writeText(await response.text());
    copyLabel.value = $t("copy_page_copied");
  } catch (error) {
    console.error("OpenInLlm: failed to copy page", error);
    copyLabel.value = $t("copy_page_error");
  }
  setTimeout(() => {
    copyLabel.value = defaultCopyLabel;
  }, 2000);
}

function onToggle(event: ToggleEvent) {
  isOpen.value = event.newState === "open";
}
</script>

<style scoped>
.open-in-llm {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--spacing-tiny);
}

.open-in-llm__toggle {
  anchor-name: --open-in-llm-anchor;
}

.open-in-llm__menu {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-tiny);
}

.open-in-llm__menu:popover-open {
  position-anchor: --open-in-llm-anchor;
  top: anchor(bottom);
  left: anchor(left);
  margin-top: var(--spacing-smaller);
  position-try-fallbacks: flip-block;
}

.open-in-llm__menu a {
  display: block;
  padding: var(--spacing-tiny) var(--spacing-small);
}

.open-in-llm__menu a:hover,
.open-in-llm__menu a:focus-visible {
  color: var(--html-blue);
  text-decoration: underline;
}

@supports not (selector(:popover-open) and (anchor-name: none)) {
  [popover],
  .open-in-llm__toggle {
    display: none;
  }
}
</style>
