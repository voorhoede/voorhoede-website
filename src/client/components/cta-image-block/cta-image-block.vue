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

      <div v-if="hasCta" class="cta-image-block__ctas">
        <app-button
          :v-if="hasPrimaryCta"
          @click.native="trackLink(linkUrl, linkIsExternal)"
          class="cta_image-block__primary-cta"
          small
          :label="linkLabel"
          :to="linkUrl"
          :external="linkIsExternal"
        />
        <app-button
          v-if="hasSecondaryCta"
          @click.native="trackLink(secondaryLinkUrl, secondaryLinkIsExternal)"
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
    methods: {
      trackLink (href, external = false ) {
        if(external === false) {
          return this.$ga.event('CTA-image', 'click cta', href, 0)
        } else {
          return this.$ga.query('send', 'event', {
            transport: 'beacon',
            eventCategory: 'CTA-image',
            eventAction: 'click cta',
            eventLabel: href,
            eventValue: 0
          })
        }
      },
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

  .cta-image-block__ctas {
    margin: var(--spacing-small) calc(-1 * var(--spacing-medium)) 0 0;
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

  .cta_image-block__primary-cta + .cta_image-block__secondary-cta {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 600px) {
    .cta_image-block__primary-cta + .cta_image-block__secondary-cta {
      margin-top: 0;
    }
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
