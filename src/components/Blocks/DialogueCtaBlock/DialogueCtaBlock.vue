<template>
  <section class="grid dialogue-cta" v-once>
    <div class="dialogue-cta__image">
      <DatoImage
        :src="data.person.image.url"
        alt=""
        :width="200"
        :height="200"
        loading="eager"
        :quality="75"
      />
    </div>
    <div>
      <h2 class="dialogue-cta__title h4">
        {{ data.title }}
      </h2>
      <div
        v-if="data.variant === 'information'"
        class="dialogue-cta__body body-big"
        v-html="data.body"
      />
      <blockquote
        v-if="data.variant === 'quote'"
        class="dialogue-cta__body dialogue-cta__body--quote body-big"
        v-html="data.body"
      />
      <div class="dialogue-cta__ctas">
        <AppLink v-for="(cta, index) in data.ctas" :key="index" :link="cta" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DialogueCtaBlockFragment } from "./DialogueCtaBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import AppLink from "~/components/Core/AppLink/AppLink.vue";

const props = defineProps<{
  data: FragmentOf<typeof DialogueCtaBlockFragment>;
}>();

const data = readFragment<typeof DialogueCtaBlockFragment>(props.data);
</script>

<style scoped>
.dialogue-cta {
  display: flex;
  flex-direction: column;
  gap: clamp(var(--spacing-medium), 8%, var(--spacing-larger));
}

.dialogue-cta__title {
  margin-bottom: var(--spacing-tiny);
}

.dialogue-cta__image {
  width: 200px;
  height: 200px;
  align-self: center;
  overflow: hidden;
  border-radius: 50%;
}

.dialogue-cta__image > * {
  object-fit: cover;
  object-position: top;
}

.dialogue-cta__body {
  margin-bottom: var(--spacing-small);
  max-width: 55ch;
}

.dialogue-cta__body--quote {
  font-style: italic;
  quotes: auto;
}

.dialogue-cta__body--quote > p {
  display: inline;
}

.dialogue-cta__body > p > a {
  background: transparent
    linear-gradient(
      to top,
      transparent 1px,
      var(--html-blue) 1px,
      var(--html-blue) 2px,
      transparent 2px
    );
  color: var(--html-blue);
  padding-bottom: 0.15rem;
}

.dialogue-cta__body > p > a:hover {
  opacity: 0.8;
}

.dialogue-cta__body--quote::before {
  content: open-quote;
}

.dialogue-cta__body--quote::after {
  content: close-quote;
}

.dialogue-cta__ctas {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-small);
}

@media (min-width: 600px) {
  .dialogue-cta {
    flex-direction: row;
    align-items: center;
  }

  .dialogue-cta__image {
    flex-shrink: 0;
  }
}

@media (min-width: 1000px) {
  .dialogue-cta {
    grid-column-start: 8;
    grid-column-end: 47;
  }
}
</style>
