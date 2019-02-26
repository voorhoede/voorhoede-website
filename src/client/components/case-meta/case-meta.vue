<template>
  <div class="case-meta">
    <section class="case-meta__section">
      <h3 class="case-meta__title body font-bold">{{ expertiseTitle }}</h3>
      <p class="body-petite">{{ toMetaString(expertises) }}</p>
    </section>
    <section class="case-meta__section">
      <h3 class="case-meta__title body font-bold">{{ technologiesTitle }}</h3>
      <p class="body-petite">{{ toMetaString(technologies) }}</p>
    </section>
    <section class="case-meta__section">
      <h3 class="case-meta__title body font-bold">{{ deliverableTitle }}</h3>
      <p class="body-petite">{{ toMetaString(deliverables) }}</p>
    </section>
    <section v-if="interestedTitle" class="case-meta__section">
      <h3 class="case-meta__title body font-bold">{{ interestedTitle }}</h3>
      <a class="case-meta__link body-petite" :href="interestedLinkUrl" target="_blank">
        {{ interestedLinkLabel }} &raquo;
      </a>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      expertiseTitle: {
        type: String,
        required: true
      },
      expertises: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        }
      },
      technologiesTitle: {
        type: String,
        required: true
      },
      technologies: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        }
      },
      deliverableTitle: {
        type: String,
        required: true
      },
      deliverables: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        }
      },
      interestedTitle: {
        type: String,
        required: false,
        default: ''
      },
      interestedLinkLabel: {
        type: String,
        required: false,
        default: ''
      },
      interestedLinkUrl: {
        type: String,
        required: false,
        default: ''
      }
    },
    methods: {
      toMetaString(array) {
        const lastIndex = array.length - 1
        const { title } = array[lastIndex]
        return array
          .slice(0, lastIndex)
          .map(({ title }) => title)
          .join(', ') + ` ${(array.length > 1) ? this.$t('and') : ''} ${title}`
      }
    }
  }
</script>

<style>
  .case-meta {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .case-meta__title {
    color: var(--html-blue);
    margin-bottom: var(--spacing-tiny);
  }

  .case-meta__link:hover,
  .case-meta__link:focus {
    color: var(--active-blue);
  }

  .case-meta__link:active {
    color: var(--active-blue);
  }

  @media (min-width: 720px) {
    .case-meta {
      min-height: 23.5vh; /* as specified by the design */
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-large);
    }
  }

  @media (max-width: 1099px) {
    .case-meta__section {
      flex-basis: calc(50% - ( var(--spacing-small) / 2 ));
    }

    .case-meta__section:nth-of-type(odd) {
      margin-right: var(--spacing-small);
    }

    .case-meta__section:nth-of-type(1),
    .case-meta__section:nth-of-type(2) {
      margin-bottom: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .case-meta {
      justify-content: unset;
    }

    .case-meta__section {
      --section-width: 12.5rem; /* 200px ( same as design ) */

      flex-basis: var(--section-width);
      margin-right: calc((100% - 4 * var(--section-width)) / 3);
    }

    .case-meta__section:last-child {
      margin-right: 0;
    }
  }
</style>
