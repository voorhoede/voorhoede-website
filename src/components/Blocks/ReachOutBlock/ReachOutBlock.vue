<template>
  <section class="reach-out-block grid">
    <div
      class="reach-out-block__content"
      :class="{ 'reach-out-block__content--full-width': itemContentIsFullWidth }"
    >
      <contact-form
        v-if="isContactForm"
        :contact-person="pivot.contactPerson ?? undefined"
        :title="pivot.title || $t('lets_discuss')"
      />
      <div
        v-else
        class="reach-out-block__text"
      >
        <h2
          v-if="pivot.title && !isNewsletterForm"
          class="reach-out-block__heading h3"
        >
          {{ pivot.title }}
        </h2>

        <rich-text-block
          v-if="pivot.body"
          :text="pivot.body"
          :large-text="true"
          class="reach-out-block__body"
        />

        <app-button
          v-if="pivot.links[0]?.__typename === 'ExternalLinkRecord'"
          @click="trackLink(pivot.links[0].url)"
          :label="pivot.links[0].title"
          :to="pivot.links[0].url"
          external
        />

        <app-button
          v-else-if="pivot.links[0]?.__typename === 'InternalLinkRecord'"
          :label="pivot.links[0].title"
          :to="useDatoNuxtRoute(pivot.links[0].link)"
        />

        <newsletter-form
          v-if="isNewsletterForm"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ReachOutBlockFragment } from "./ReachOutBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof ReachOutBlockFragment>;
}>();

const data = readFragment<typeof ReachOutBlockFragment>(props.data);
const pivot = computed(() => data.pivot);

const isContactForm = computed(() => pivot.value.formType === "contact");
const isNewsletterForm = computed(() => pivot.value.formType === "newsletter");
const itemContentIsFullWidth = computed(() => isContactForm.value || isNewsletterForm.value);

function trackLink(href: string) {
  useTrackEvent("Click on Schedule Meeting", { props: { url: href } });
}
</script>

<style>
  .reach-out-block {
    background-color: var(--bg-pastel);
    position: relative;
    grid-column: var(--grid-page);
  }

  .reach-out-block__content--full-width {
    grid-column: var(--grid-page);
  }

  .reach-out-block__content {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-big);
  }

  .reach-out-block .newsletter-form {
    padding: 0;
  }

  .reach-out-block__text {
    text-align: center;
  }

  .reach-out-block__heading {
    margin-bottom: var(--spacing-medium);
  }

  .reach-out-block__body {
    margin-top: 0;
    margin-bottom: var(--spacing-large);
  }
</style>
