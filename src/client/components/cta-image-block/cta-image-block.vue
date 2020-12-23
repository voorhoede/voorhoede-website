<template>
  <div class="cta-image-block">
    <div class="cta-image-block__image">
      <responsive-image
        :width-step="120"
        :image="personImage"
        :alt="personName" />
    </div>

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
  import ResponsiveImage from '../responsive-image'
  import RichTextBlock from '../rich-text-block'

  export default {
    components: {
      AppButton,
      ResponsiveImage,
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
    margin-bottom: var(--spacing-large);
    width: 100%;
  }

  .cta-image-block__title {
    margin-bottom: var(--spacing-tiny);
  }

  .cta-image-block__link {
    margin-top: var(--spacing-small);
  }

  .cta-image-block__image {
    --size: 180px;

    position: relative;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
    border-radius: 50%;
  }

  .cta-image-block__image > * {
    position: absolute;
    top: 0;
    left: 0;
  }

  .cta-image-block__content {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 600px) {
    .cta-image-block {
      display: flex;
      align-items: center;
    }

    .cta-image-block__content {
      margin-top: 0;
      padding-right: var(--spacing-medium);
      padding-left: var(--spacing-larger);
    }

    .cta-image-block__image {
      --size: 25vw;

      margin-right: 0;
      margin-left: 0;
    }
  }

  @media (min-width: 800px) {
    .cta-image-block__image {
      --size: 200px;
    }
  }

  @media (min-width: 1000px) {
    .cta-image-block {
      grid-column-start: 8;
      grid-column-end: 47;
    }
  }
</style>
