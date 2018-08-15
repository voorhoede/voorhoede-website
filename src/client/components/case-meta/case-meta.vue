<template>
  <aside class="case-meta grid">
    <h2 class="sr-only">Case information</h2>
    <section class="case-meta__expertise">
      <h3 class="case-meta__title body font-bold">{{ expertiseTitle }}</h3>
      <p class="body-petite">{{ expertises | toMetaString }}</p>
    </section>
    <section class="case-meta__platform">
      <h3 class="case-meta__title body font-bold">{{ platformTitle }}</h3>
      <p class="body-petite">{{ platforms | toMetaString }}</p>
    </section>
    <section class="case-meta__deliverable">
      <h3 class="case-meta__title body font-bold">{{ deliverableTitle }}</h3>
      <p class="body-petite">{{ deliverables | toMetaString }}</p>
    </section>
    <section class="case-meta__interested">
      <h3 class="case-meta__title body font-bold">{{ interestedTitle }}</h3>
      <nuxt-link class="case-meta__link body-petite" :to="interestedLinkUrl">
        {{ interestedLinkLabel }} &raquo;
      </nuxt-link>
    </section>
  </aside>
</template>

<script>
  export default {
    filters: {
      toMetaString(array) {
        const lastItem = array.pop() /* Pop also removes the last element of the array */
        return array
          .map(array => array.title)
          .join(', ') + ' and ' + lastItem.title
      }
    },
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
      platformTitle: {
        type: String,
        required: true
      },
      platforms: {
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
        required: true
      },
      interestedLinkLabel: {
        type: String,
        required: true
      },
      interestedLinkUrl: {
        type: String,
        required: true
      }
    },
  }
</script>

<style>
  .case-meta {
    grid-row-gap: var(--spacing-large);
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

  .case-meta__expertise,
  .case-meta__deliverable {
    grid-column-start: 4;
    grid-column-end: 8;
  }

  .case-meta__platform,
  .case-meta__interested {
    grid-column-start: 12;
    grid-column-end: 16;
  }

  @media (min-width: 720px) {
    .case-meta__expertise {
      grid-column-start: 4;
      grid-column-end: 10;
    }

    .case-meta__platform {
      grid-column-start: 12;
      grid-column-end: 18;
    }

    .case-meta__deliverable {
      grid-column-start: 20;
      grid-column-end: 26;
    }

    .case-meta__interested {
      grid-column-start: 28;
      grid-column-end: 34;
    }
  }

  @media (min-width: 1100px) {
    .case-meta__expertise {
      grid-column-start: 4;
      grid-column-end: 10;
    }

    .case-meta__platform {
      grid-column-start: 17;
      grid-column-end: 23;
    }

    .case-meta__deliverable {
      grid-column-start: 30;
      grid-column-end: 36;
    }

    .case-meta__interested {
      grid-column-start: 44;
      grid-column-end: 50;
    }
  }
</style>
