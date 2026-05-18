<template>
  <section class="glossary-section grid" v-once>
    <h2 class="glossary-section__title h2">
      {{ title }}
    </h2>
    <ul v-if="terms.length > 0" class="glossary-section__list">
      <li
        v-for="term in terms"
        :id="term.slug"
        :key="term.id"
        class="glossary-section__item"
      >
        <details class="glossary-section__details">
          <summary class="glossary-section__summary">
            {{ term.question }}
            <span class="glossary-section__icon" aria-hidden="true">
              &#9662;
            </span>
          </summary>
          <rich-text-block
            class="glossary-section__definition"
            :text="term.definitionHtml"
          />
        </details>
      </li>
    </ul>
  </section>
</template>

<script setup>
import query from "./glossary-section.query.graphql?raw";

defineProps({
  title: { type: String, required: true },
});

const route = useRoute();
const { data } = await useFetchContent({
  key: `glossary-terms-${route.params.language}`,
  query,
  variables: { locale: route.params.language },
});

const terms = computed(() => data.value?.terms ?? []);

if (terms.value.length > 0) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: terms.value.map((term) => ({
            "@type": "Question",
            name: term.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: term.definition,
            },
          })),
        }),
      },
    ],
  });
}
</script>

<style>
.glossary-section__title {
  grid-column: var(--grid-content);
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.glossary-section__list {
  grid-column: var(--grid-content);
}

@media (min-width: 720px) {
  .glossary-section__list {
    grid-column-start: 6;
    grid-column-end: 44;
  }
}

@media (min-width: 1100px) {
  .glossary-section__list {
    grid-column-start: 10;
    grid-column-end: 42;
  }
}

.glossary-section__item + .glossary-section__item {
  margin-top: var(--spacing-small);
}

.glossary-section__details {
  background-color: var(--bg-pastel);
  border-left: 3px solid var(--html-blue);
}

.glossary-section__summary {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-family: var(--font-sans);
  font-weight: 700;
  gap: var(--spacing-small);
  justify-content: space-between;
  list-style: none;
  padding: var(--spacing-small) var(--spacing-medium);
}

.glossary-section__summary::-webkit-details-marker {
  display: none;
}

.glossary-section__summary:hover,
.glossary-section__summary:focus-visible {
  color: var(--html-blue);
}

.glossary-section__icon {
  display: inline-block;
  flex-shrink: 0;
  font-size: 1.2em;
  transition: transform 0.15s ease;
}

.glossary-section__details[open] .glossary-section__icon {
  transform: rotate(180deg);
}

.glossary-section__definition {
  padding: 0 var(--spacing-medium) var(--spacing-small);
}

.glossary-section__item:target .glossary-section__details {
  outline-offset: 2px;
  outline: 2px solid var(--html-blue);
}
</style>
