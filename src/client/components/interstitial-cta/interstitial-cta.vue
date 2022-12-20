<template>
  <div class="interstitial-cta">
    <p class="pullquote">{{ cta }}</p>

    <div class="interstitial-cta__buttons">
      <template v-for="button in buttons">
        <app-button
          :label="button.label"
          :to="button.to"
          :external="button.external"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cta: {
      type: String,
      required: true
    },
    buttons: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
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
