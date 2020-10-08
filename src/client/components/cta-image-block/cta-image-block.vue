<template>
  <div class="cta-image-block body-big">
    <app-image
      :width-step="120"
      :image="personImage"
      class="cta-image-block__image"
      :alt="personName" />

    <div class="cta-image-block__content">
      <h2
        v-if="title"
        class="cta-image-block__title h4"
      >
        {{ title }}
      </h2>

      <rich-text-block
        v-if="body"
        :text="body"
        :large-text="true"
        class="cta-image-block__body"
      />

      <div class="cta-image-block__link">
        <app-button
          small
          :v-if="linkUrl && linkLabel"
          :label="linkLabel"
          :to="linkUrl"
          external
        />
      </div>
    </div>
  </div>
</template>

<script>
  import AppButton from '../app-button'
  import AppImage from '../app-image'
  import RichTextBlock from '../rich-text-block'

  export default {
    components: {
      AppButton,
      AppImage,
      RichTextBlock
    },
    props: {
      title: {
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
      },
      personImage: {
        type: Object,
        required: true,
      },
      personName: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style>
  .cta-image-block {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-bottom: var(--spacing-large);
    width: 100%;
  }

  @media (min-width: 720px) {
    .cta-image-block {
      width: 70%;
    }
  }

  .cta-image-block__image {
    max-width: 135px;
    margin: var(--spacing-small) 0;
    z-index: 1;
  }

  @media (min-width: 600px) {
    .cta-image-block__image {
      margin: var(--spacing-medium) 0;
    }
  }

  .cta-image-block__content {
    background: var(--bg-pastel);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--spacing-small) var(--spacing-small) var(--spacing-small) var(--spacing-medium);
    margin-left: calc(-1 * var(--spacing-small));
  }

  @media (min-width: 600px) {
    .cta-image-block__content {
      padding: var(--spacing-medium) var(--spacing-medium) var(--spacing-medium) var(--spacing-larger);
      margin-left: calc(-1 * var(--spacing-medium));
    }
  }

  .cta-image-block__title {
    padding-top: var(--spacing-tiny);
    margin-bottom: var(--spacing-tiny);
  }

  .cta-image-block__link {
    margin-top: var(--spacing-small);
  }
</style>
