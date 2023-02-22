<template>
  <section class="grid page-introduction">
    <article
      v-for="(section, index) in sections"
      :key="section.id"
      class="page-introduction__column"
      :class="(index + 1) % 2 === 0 ? 'page-introduction__column--even' : 'page-introduction__column--odd'"
    >
      <dato-image
        class="page-introduction__image"
        :src="section.image.url"
        alt=""
        :width="section.image.width"
        :height="section.image.height"
        loading="eager"
      />
      <div class="page-introduction__content">
        <h2
          v-if="section.title"
          class="h3"
        >
          {{ section.title }}
        </h2>
        <div
          class="body-big font-html-blue"
          v-html="section.body"
        />
      </div>
    </article>
  </section>
</template>

<script>
  export default {
    props: {
      sections: {
        type: Array,
        required: true,
        validator(sections) {
          return sections.every(section => (
            typeof(section) === 'object'
            && (!section.title || typeof(section.title) === 'string')
            && typeof(section.body) === 'string'
            && typeof(section.image) === 'object'
          ))
        }
      }
    }
  }
</script>

<style>
  .page-introduction {
    /* margin-bottom: var(--spacing-big); */
    padding-top: var(--spacing-big);
    background-color: var(--bg-pastel);
    background-image: linear-gradient(var(--white), var(--white));
    background-size: 100% var(--spacing-huge);
    background-repeat: no-repeat;
    background-position: 0 100%;
  }

  .page-introduction__column {
    padding-right: var(--spacing-large);
    padding-left: var(--spacing-large);
  }

  .page-introduction__column > * {
    position: relative;
    z-index: 2;
  }

  .page-introduction__column--odd {
    position: relative;
  }

  .page-introduction__column--odd::before {
    content: '';
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - var(--spacing-huge));
    background-color: var(--brand-yellow);
  }

  .page-introduction__column--even {
    display: flex;
    flex-direction: column;
  }

  .page-introduction__column--even .page-introduction__content {
    order: 1;
  }

  .page-introduction__column--even .page-introduction__image {
    order: 2;
  }

  .page-introduction__content {
    margin-bottom: var(--spacing-larger);
  }

  .page-introduction__image {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: var(--spacing-larger);
  }

  /** smaller than 650 */
  @media (max-width: 649px) {
    .page-introduction__column--odd {
      order: 2;
      display: flex;
      flex-direction: column;
    }

    .page-introduction__column--odd::before {
      right: calc(var(--grid-margin) * -1);
      bottom: var(--spacing-huge);
      width: calc(100% + var(--grid-margin) * 2);
      height: 100%;
    }

    .page-introduction__column--even {
      order: 1;
    }

    .page-introduction__image {
      max-width: 300px;
      margin-right: auto;
      margin-left: auto;
    }

    .page-introduction__column--odd .page-introduction__image {
      order: 2;
    }

    .page-introduction__column--odd .page-introduction__content {
      order: 1;
    }
  }

  @media (min-width: 650px) {
    .page-introduction__column {
      padding-right: var(--spacing-larger);
      padding-left: var(--spacing-larger);
    }

    .page-introduction__column--odd {
      grid-column: 1 / 26;
    }

    .page-introduction__column--odd::before {
      bottom: 0;
      width: 50vw;
      height: calc(100% - var(--spacing-huge));
    }

    .page-introduction__column--even {
      grid-column: 26 / 51;
    }

    .page-introduction__column--even .page-introduction__content {
      flex-grow: 2;
    }
  }

  @media (min-width: 800px) {
    .page-introduction__column {
      padding-right: var(--spacing-larger);
      padding-left: var(--spacing-larger);
    }

    .page-introduction__column--odd {
      grid-column: var(--grid-content-left);
    }

    .page-introduction__column--even {
      grid-column: var(--grid-content-right);
    }

    .page-introduction__image {
      padding-right: var(--spacing-small);
      padding-left: var(--spacing-small);
    }
  }

  @media (min-width: 1100px) {
    .page-introduction {
      margin-bottom: var(--spacing-bigger);
      padding-top: var(--spacing-bigger);
    }

    .page-introduction__column--odd::before {
      width: 100%;
    }

    .page-introduction__image {
      padding-right: var(--spacing-large);
      padding-left: var(--spacing-large);
    }
  }
</style>
