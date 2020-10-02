<template>
  <div class="cta-image-block body-big">
    <picture class="cta-image-block__picture">
      <img
        :src="personImage"
        class="cta-image-block__image"
        :alt="personName" />
    </picture>

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
  import RichTextBlock from '../rich-text-block'

  export default {
    components: {
      AppButton,
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
        type: String,
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
    align-items: center;
    margin-bottom: var(--spacing-large);
    width: 100%;
  }

  @media (min-width: 720px) {
    .cta-image-block {
      width: 70%;
    }
  }

  .cta-image-block__picture {
    display: flex;
    min-width: 120px;
    flex-basis: 40%;
    max-height: 180px;
    z-index: 1;
  }

  @media (min-width: 720px) {
    .cta-image-block__picture {
      flex-basis: 32%;
      max-width: 160px;
    }
  }

  .cta-image-block img {
    max-width: 100%;
    object-fit: cover;
    object-position: 0 -50px;
  }

  @media (min-width: 600px) {
    .cta-image-block img {
      object-position: 0 0;
    }
  }

  .cta-image-block__content {
    background: var(--bg-pastel);
    display: flex;
    flex-direction: column;
    padding: var(--spacing-large);
    justify-content: center;
  }

  @media (min-width: 600px) {
    .cta-image-block__content {
      padding: var(--spacing-large) var(--spacing-large) var(--spacing-large) var(--spacing-larger);
      margin-left: calc(-1 * (var(--spacing-larger) - var(--spacing-large)));
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
