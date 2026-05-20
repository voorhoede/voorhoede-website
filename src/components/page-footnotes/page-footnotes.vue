<template>
  <section v-if="terms.length > 0" class="page-footnotes grid">
    <h2 class="page-footnotes__title h3">
      {{ $t("footnotes") }}
    </h2>
    <ol class="page-footnotes__list body">
      <li
        v-for="term in terms"
        :id="footnoteId(term.slug)"
        :key="term.id"
        class="page-footnotes__item"
      >
        <strong class="page-footnotes__term">{{ term.term }}</strong>
        <rich-text-block
          class="page-footnotes__definition"
          :text="term.definition"
        />
      </li>
    </ol>
  </section>
  <div :id="POPOVER_ID" popover="auto" class="page-footnotes__popover body" />
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import {
  closeGlossaryPopover,
  footnoteId,
  POPOVER_ID,
  setupGlossaryPopover,
} from "../../lib/glossary-popover";

const terms = usePageGlossaryTerms();

if (import.meta.server) {
  const nuxtApp = useNuxtApp();
  await Promise.all(Object.values(nuxtApp._asyncDataPromises ?? {}));
  terms.value = collectGlossaryTerms(nuxtApp.payload.data);
}

onMounted(setupGlossaryPopover);

const route = useRoute();
watch(() => route.fullPath, closeGlossaryPopover);

const structuredData = computed(() =>
  terms.value.length === 0
    ? []
    : [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            hasDefinedTerm: terms.value.map((term) => ({
              "@type": "DefinedTerm",
              name: term.term,
              description: term.definition,
            })),
          }),
        },
      ],
);

useHead({ script: structuredData });
</script>

<style>
.page-footnotes {
  padding-bottom: var(--spacing-larger);
}

.page-footnotes__title {
  grid-column: var(--grid-content);
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.page-footnotes__list {
  grid-column: var(--grid-content);
  list-style: decimal;
  padding-left: var(--spacing-medium);
}

@media (min-width: 720px) {
  .page-footnotes__list {
    grid-column-start: 6;
    grid-column-end: 44;
  }
}

@media (min-width: 1100px) {
  .page-footnotes__list {
    grid-column-start: 10;
    grid-column-end: 42;
  }
}

.page-footnotes__item {
  border-left: 2px solid var(--html-blue);
  padding-left: var(--spacing-small);
}

.page-footnotes__item + .page-footnotes__item {
  margin-top: var(--spacing-medium);
}

.page-footnotes__item:target {
  outline-offset: 4px;
  outline: 2px solid var(--html-blue);
}

.page-footnotes__term {
  color: var(--html-blue);
}

.page-footnotes__definition {
  margin-top: var(--spacing-tiny);
}

.page-footnotes__popover {
  background-color: var(--white);
  border-left: 3px solid var(--html-blue);
  box-shadow: var(--box-shadow);
  max-height: min(60vh, 400px);
  max-width: min(480px, calc(100vw - var(--spacing-small)));
  overflow-y: auto;
  padding: var(--spacing-medium);
  width: max-content;
}

.page-footnotes__popover:popover-open {
  left: 0;
  position: absolute;
  top: 0;
}

@supports not selector(:popover-open) {
  [popover] {
    display: none;
  }
}
</style>
