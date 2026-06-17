<template>
  <div class="interstitial-cta">
    <p class="pullquote">
      {{ data.title }}
    </p>

    <div class="interstitial-cta__buttons">
      <template
        v-for="button in data.ctas"
        :key="button.title"
      >
        <AppButton
          :label="button.title"
          :to="button.url || button.link"
          :external="button.__typename === 'ExternalLinkRecord'"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type InterstitialCtaFragment } from "./InterstitialCta.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import AppButton from "~/components/app-button/app-button.vue";

const props = defineProps<{
  data: FragmentOf<typeof InterstitialCtaFragment>;
}>();

const data = readFragment<typeof InterstitialCtaFragment>(props.data);
</script>

<style scoped>
.interstitial-cta {
  grid-column: var(--grid-content);
  padding-right: var(--spacing-medium);
  padding-left: var(--spacing-medium);
  text-align: center;
}

.interstitial-cta > * + * {
  margin-top: var(--spacing-small);
}

.interstitial-cta__buttons {
  margin-left: calc(-1 * var(--spacing-small));
}

.interstitial-cta .app-button {
  margin-left: var(--spacing-small);
  margin-right: var(--spacing-small);
  margin-bottom: var(--spacing-medium);
  white-space: normal;
}

.interstitial-cta .app-button:last-of-type {
  margin-bottom: 0;
}

@media (min-width: 720px) {
  .interstitial-cta {
    padding-left: var(--spacing-larger);
    text-align: left;
  }

  .interstitial-cta > p {
    max-width: 500px;
  }
}
</style>
