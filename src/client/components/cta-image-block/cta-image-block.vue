<template>
  <div class="cta-image-block">
    <responsive-image
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

      <div v-if="hasCtas" class="cta-image-block__ctas">
        <app-button
          :v-if="hasPrimaryCta"
          class="cta_image-block__primary-cta"
          small
          :label="linkLabel"
          :to="linkUrl"
          :external="linkIsExternal"
        />
        <app-button
          v-if="hasSecondaryCta"
          class="cta_image-block__secondary-cta"
          secondary
          :label="secondaryLinkLabel"
          :to="secondaryLinkUrl"
          :external="secondaryLinkIsExternal"
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
      secondaryLinkLabel: {
        type: String,
        default: null
      },
      secondaryLinkUrl: {
        type: String,
        default: null
      },
      secondaryLinkIsExternal: {
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
    },
    computed: {
      hasPrimaryCta() {
        return !!this.linkUrl && !!this.linkLabel
      },
      hasSecondaryCta() {
        return !!this.secondaryLinkUrl && !!this.secondaryLinkLabel
      },
      hasCtas() {
        return this.hasPrimaryCta || this.hasSecondaryCta
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

  .cta-image-block__title {
    margin-bottom: var(--spacing-tiny);
  }

  .cta-image-block__ctas {
    margin-top: var(--spacing-small);
  }

  @media (min-width: 600px) {
    .cta-image-block__ctas {
      display: flex;
      align-items: center;
    }
  }

  .cta_image-block__primary-cta + .cta_image-block__secondary-cta {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 600px) {
    .cta_image-block__primary-cta + .cta_image-block__secondary-cta {
      margin-top: 0;
      margin-left: var(--spacing-medium);
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
</style>
