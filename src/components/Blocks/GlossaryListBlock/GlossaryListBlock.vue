<template>
  <section class="glossary-list-block grid" v-once>
    <h2 class="glossary-list-block__title h2">
      {{ data.title }}
    </h2>
    <ul v-if="terms.length > 0" class="glossary-list-block__list body">
      <li
        v-for="term in terms"
        :id="term.slug"
        :key="term.id"
        class="glossary-list-block__item"
      >
        <details class="glossary-list-block__details">
          <summary class="glossary-list-block__summary">
            {{ term.question }}
            <span class="glossary-list-block__icon" aria-hidden="true">
              &#9662;
            </span>
          </summary>
          <RichTextBlock
            class="glossary-list-block__definition"
            :text="term.definitionHtml"
          />
        </details>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import termsQuery from "./GlossaryListBlock.terms.graphql?raw";
import type { GlossaryListBlockFragment } from "./GlossaryListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import RichTextBlock from "~/components/rich-text-block/rich-text-block.vue";

const props = defineProps<{
  data: FragmentOf<typeof GlossaryListBlockFragment>;
}>();

const data = readFragment<typeof GlossaryListBlockFragment>(props.data);

const route = useRoute();
const { data: termsData }: { data: Ref<{ terms: GlossaryTerm[] } | null> } =
  await useFetchContent({
    key: `glossary-terms-${route.params.language}`,
    query: termsQuery,
    variables: { locale: route.params.language },
  });

const terms = computed(() => termsData.value?.terms ?? []);

const structuredData = computed(() =>
  terms.value.length === 0
    ? []
    : [
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
);

useHead({ script: structuredData });
</script>

<style scoped>
.glossary-list-block__title {
  grid-column: var(--grid-content);
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.glossary-list-block__list {
  grid-column: var(--grid-content);

  @media (min-width: 720px) {
    grid-column-start: 6;
    grid-column-end: 44;
  }

  @media (min-width: 1100px) {
    grid-column-start: 10;
    grid-column-end: 42;
  }
}

.glossary-list-block__item + .glossary-list-block__item {
  margin-top: var(--spacing-medium);
}

.glossary-list-block__details {
  border-left: 2px solid var(--html-blue);
}

.glossary-list-block__summary {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-family: var(--font-sans);
  font-weight: 700;
  gap: var(--spacing-small);
  justify-content: space-between;
  list-style: none;
  padding-left: var(--spacing-small);
}

.glossary-list-block__summary::-webkit-details-marker {
  display: none;
}

.glossary-list-block__summary:hover,
.glossary-list-block__summary:focus-visible {
  color: var(--html-blue);
}

.glossary-list-block__icon {
  display: inline-block;
  flex-shrink: 0;
  font-size: 1.2em;
  transition: transform 0.15s ease;
}

.glossary-list-block__details[open] .glossary-list-block__icon {
  transform: rotate(180deg);
}

.glossary-list-block__definition {
  margin-top: var(--spacing-tiny);
  padding-left: var(--spacing-small);
}

.glossary-list-block__item:target .glossary-list-block__details {
  outline-offset: 2px;
  outline: 2px solid var(--html-blue);
}
</style>
