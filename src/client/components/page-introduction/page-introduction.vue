<template>
  <div class="page-introduction grid">
    <component
      v-for="section in sections"
      :key="section.id"
      :is="section.title ? 'section' : 'div'"
      class="page-introduction__section"
    >
      <div class="page-introduction__section-content">
        <responsive-image :image="section.image"/>
        <div class="page-introduction__section-text">
          <h2 v-if="section.title" class="h2">{{ section.title }}</h2>
          <div class="body-big" v-html="section.body"/>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
  import ResponsiveImage from '../responsive-image'

  export default {
    components: {
      ResponsiveImage,
    },
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
    overflow: hidden;
  }

  .page-introduction__section {
    margin-top: var(--spacing-big);
    padding: 0 var(--grid-margin);
    grid-column: var(--grid-page);
  }

  .page-introduction__section-text {
    margin: 0 calc(-1 * var(--grid-margin));
    margin-top: calc(-1 * var(--spacing-large));
    padding: var(--spacing-medium) var(--grid-margin);
    padding-top: calc(var(--spacing-large) + var(--spacing-medium));
    color: var(--html-blue);
  }

  .page-introduction__section:nth-child(2n - 1) .page-introduction__section-text {
    background-color: var(--bg-pastel);
  }

  .page-introduction__section:nth-child(2n) .page-introduction__section-text {
    background-color: var(--brand-yellow);
  }

  @supports (grid-auto-flow: dense) {
    @media (min-width: 720px) {
      .page-introduction {
        grid-auto-flow: dense;
        background-color: var(--bg-pastel);
      }

      .page-introduction__section {
        margin: 0;
        padding: 0;
        padding-top: var(--spacing-big);
      }

      .page-introduction__section:nth-child(2n) {
        grid-column: var(--grid-content-left);
      }

      .page-introduction__section:nth-child(2n + 1) {
        grid-column: var(--grid-content-right);
        background-color: var(--bg-pastel);
      }

      .page-introduction__section:nth-child(2n + 1) .page-introduction__section-content {
        /* align image on bottom */
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-end;
        height: 100%;
      }

      .page-introduction__section:nth-child(2n + 1) .page-introduction__section-content::before {
        content: '';
        display: block;
        flex-grow: 1;
        width: 50vw;
        background: var(--white);
      }

      .page-introduction__section:nth-child(2n + 1) .page-introduction__section-text,
      .page-introduction__section:nth-child(2n + 1) .responsive-image {
        padding-right: 0;
        padding-left: var(--spacing-big);
      }

      .page-introduction__section:nth-child(2n) .page-introduction__section-text,
      .page-introduction__section:nth-child(2n) .responsive-image {
        padding-right: var(--spacing-big);
      }

      .page-introduction .responsive-image {
        position: relative;
        z-index: var(--z-index-low);
      }

      .page-introduction__section:nth-child(2n + 1) .responsive-image {
        margin-top: var(--spacing-larger);
        position: relative;
      }

      .page-introduction__section:nth-child(2n + 1) .responsive-image::before {
        content: '';
        position: absolute;
        top: 85%;
        right: calc(100% - 50vw);
        bottom: 0;
        left: 0;
        background: var(--white);
      }

      .page-introduction__section-text {
        margin-left: 0;
        margin-right: 0;
        position: relative;
      }

      .page-introduction__section:nth-child(2n + 1) .page-introduction__section-text {
        margin-top: 0;
        padding-top: 0;
      }

      .page-introduction__section:nth-child(2n) .page-introduction__section-text::before {
        content: '';
        position: absolute;
        top: 0;
        right: 100%;
        bottom: 0;
        left: calc(-50vw + 100%);
        background-color: var(--brand-yellow);
      }
    }

    /* Align columns with page header */
    @media (min-width: 1100px) {
      .page-introduction__section:nth-child(2n - 1) {
        grid-column: var(--grid-center) / 47;
      }

      .page-introduction__section:nth-child(2n) {
        grid-column: 4 / var(--grid-center);
      }
    }
  }
</style>
