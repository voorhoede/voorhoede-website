<template>
  <div class="case-meta is-animated">
    <h2 class="sr-only">
      {{ $t('case_summary') }}
    </h2>
    <div class="case-meta__section animation__uncover animation__uncover--white-background animation-stagger-1">
      <h3 class="case-meta__title body font-bold">{{ expertiseTitle }}</h3>
      <p class="body-small">{{ toMetaString(expertises) }}</p>
    </div>

    <div class="case-meta__section animation__uncover animation__uncover--white-background animation-stagger-2">
      <h3 class="case-meta__title body font-bold">{{ technologiesTitle }}</h3>
      <p class="body-small">{{ toMetaString(technologies) }}</p>
    </div>

    <div class="case-meta__section animation__uncover animation__uncover--white-background animation-stagger-3">
      <h3 class="case-meta__title body font-bold">{{ deliverableTitle }}</h3>
      <p class="body-small">{{ toMetaString(deliverables) }}</p>
    </div>

    <div v-if="interestedTitle" class="case-meta__section animation__uncover animation__uncover--white-background animation-stagger-4">
      <h3 class="case-meta__title body font-bold">{{ interestedTitle }}</h3>
      <a class="link body-small" :href="interestedLinkUrl" target="_blank" rel="noreferrer noopener">
        {{ interestedLinkLabel }} &raquo;
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      expertiseTitle: {
        type: String,
        required: true,
      },
      expertises: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        },
      },
      technologiesTitle: {
        type: String,
        required: true,
      },
      technologies: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        },
      },
      deliverableTitle: {
        type: String,
        required: true,
      },
      deliverables: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => item.title)
        },
      },
      interestedTitle: {
        type: String,
        required: false,
        default: '',
      },
      interestedLinkLabel: {
        type: String,
        required: false,
        default: '',
      },
      interestedLinkUrl: {
        type: String,
        required: false,
        default: '',
      },
    },
    methods: {
      toMetaString(array) {
        const lastIndex = array.length - 1
        const { title } = array[lastIndex]
        return array
          .slice(0, lastIndex)
          .map(({ title }) => title)
          .join(', ') + ` ${(array.length > 1) ? this.$t('and') : ''} ${title}`
      },
    },
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
