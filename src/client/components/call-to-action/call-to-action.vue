<template>
  <section class="call-to-action">
    <h2
      v-if="title"
      class="call-to-action__heading h3"
    >
      {{ title }}
    </h2>
    <div
      v-if="body"
      v-html="body"
      class="call-to-action__body body"
    >
    </div>
    <app-button
      @click.native="trackLink(link)"
      :label="label"
      :to="link"
    />
  </section>
</template>

<script>
  import AppButton from '../app-button'

  export default {
    components: { AppButton },
    props: {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .call-to-action {
    position: relative;
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-large);
    text-align: center;
  }

  .call-to-action__heading {
    margin-bottom: var(--spacing-medium);
  }

  .call-to-action__body {
    margin-right: auto;
    margin-bottom: var(--spacing-large);
    margin-left: auto;
  }

  @media (min-width: 720px) {
    .call-to-action {
      border-top: 1px solid var(--very-dim);
      border-bottom: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .call-to-action {
      padding-top: var(--spacing-big);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
