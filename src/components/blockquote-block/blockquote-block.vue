<template>
  <div class="blockquote-block rich-text body-big">
    <h2
      v-if="title"
      class="blockquote-block__title h4"
      :id="titleId"
    >
      {{ title }}
    </h2>

    <rich-text-block
      v-if="body"
      :text="body"
      :large-text="true"
      class="blockquote-block__body"
    />

    <div class="blockquote-block__link">
      <a
        v-if="linkLabel && linkUrl"
        :href="linkUrl"
        :target="linkIsExternal && '_blank'"
        rel="noreferrer noopener"
      >
        {{ linkLabel }}
      </a>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    },
    linkLabel: {
      type: String,
      default: null
    },
    linkUrl: {
      type: String,
      default: null
    },
    linkIsExternal: {
      type: Boolean,
      default: false
    }
  })
</script>

<style>
  .blockquote-block {
    padding-left: var(--spacing-small);
    width: 100%;
    border-left: 2px solid var(--html-blue);
  }

  .blockquote-block__title {
    padding-top: var(--spacing-tiny);
    margin-bottom: var(--spacing-tiny);
  }

  .blockquote-block__link {
    margin-top: var(--spacing-smaller);
  }
</style>
