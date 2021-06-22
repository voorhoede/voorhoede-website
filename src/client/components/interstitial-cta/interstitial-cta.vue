<template>
  <div class="interstitial-cta">
    <p class="pullquote">{{ cta }}</p>

    <template v-for="button in buttons">
      <AppButton
        :key="button.to"
        :label="button.label"
        :to="button.to"
        :external="button.external"
      />
    </template>
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

  .interstitial-cta .app-button + .app-button {
    margin-left: var(--spacing-small);
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
