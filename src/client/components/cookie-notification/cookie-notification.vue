<template>
  <div class="cookie-notification">
    <h1
      v-if="title"
      class="cookie-notification__title h4"
    >
      {{ title }}
    </h1>

    <div
      v-html="body"
      class="cookie-notification__body rich-text body"
    />

    <button class="app-button app-button--small body font-bold">
      <span>
        {{ approveButtonLabel }}
      </span>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      body: {
        type: String,
        required: true,
      },
      approveButtonLabel: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .cookie-notification {
    z-index: var(--z-index-overlay);
    position: fixed;
    padding: var(--spacing-small);
    top: var(--spacing-small);
    left: var(--spacing-small);
    right: var(--spacing-small);
    background: var(--white);
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .27);
  }

  @media (min-width: 720px) {
    .cookie-notification {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      width: 690px;
    }
  }

  @media (min-width: 800px) {
    .cookie-notification {
      top: auto;
      bottom: var(--spacing-small);
    }
  }

  .cookie-notification__title {
    margin-bottom: var(--spacing-tiny);
  }

  .cookie-notification__body {
    margin-bottom: var(--spacing-small);
  }
</style>
