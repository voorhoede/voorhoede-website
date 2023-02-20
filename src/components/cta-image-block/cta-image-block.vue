<template>
  <div class="cta-image-block">
    <div class="cta-image-block__image">
      <dato-image
        :src="personImage.url"
        alt=""
        :width="200"
        :height="200"
        loading="eager"
      />
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

      <div v-if="hasCta" class="cta-image-block__ctas">
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
  export default {
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
      hasCta() {
        return this.hasPrimaryCta || this.hasSecondaryCta
      },
    },
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

  .cta-image-block__ctas {
    margin-top: var(--spacing-small);
  }

  @media (min-width: 600px) {
    .cta-image-block__ctas {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .cta_image-block__primary-cta,
  .cta_image-block__secondary-cta {
    margin-right: var(--spacing-medium);
    margin-bottom: var(--spacing-small);
  }

  .cta-image-block__image {
    --size: 180px;

    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
    border-radius: 50%;
  }

  .cta-image-block__image > * {
    object-fit: cover;
    object-position: top;
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
