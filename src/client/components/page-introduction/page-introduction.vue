<template>
  <div class="page-introduction grid">
    <component
      v-for="section in sections"
      :key="section.id"
      :is="section.title ? 'section' : 'div'"
      class="page-introduction__section"
      :class="{'page-introduction__section--has-image': section.image }"
    >
      <responsive-image v-if="section.image" :image="section.image"/>
      <div
        class="page-introduction__section-content"
        :class="{
          'page-introduction__section-content--has-background': section.image
        }"
      >
        <h2 v-if="section.title" class="h2">{{ section.title }}</h2>
        <div class="body-big" v-html="section.body"/>
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
          ))
        }
      }
    }
  }
</script>

<style>
  .page-introduction {
    grid-template-rows: auto;
  }

  .page-introduction__section-content {
    color: var(--html-blue);
  }

  .page-introduction__section--has-image .page-introduction__section-content {
    margin-top: calc(-1 * var(--spacing-large));
    padding-top: calc(var(--spacing-large) + var(--spacing-medium));
    padding-bottom: var(--spacing-medium);
    background-color: var(--brand-yellow);
  }

  @media (max-width: 719px) {
    .page-introduction__section {
      margin-top: var(--spacing-big);
      grid-column: var(--grid-page);
      padding-left: var(--grid-margin);
      padding-right: var(--grid-margin);
    }

    .page-introduction__section--has-image .page-introduction__section-content {
      margin-left: calc(-1 * var(--grid-margin));
      margin-right: calc(-1 * var(--grid-margin));
      padding-left: var(--grid-margin);
      padding-right: var(--grid-margin);
    }
  }

  @media (min-width: 720px) {
    .page-introduction__section {
      margin-top: var(--spacing-huge);
      grid-column: var(--grid-content-left);
      padding-right: var(--grid-gutter-large);
    }

    .page-introduction__section:nth-child(2n) {
      grid-column: var(--grid-content-right);
      padding-right: 0;
      padding-left: var(--grid-gutter-large);
    }

    .page-introduction .responsive-image {
      position: relative;
      z-index: var(--z-index-low);
    }

    .page-introduction__section--has-image {
      margin-top: 0;
    }

    .page-introduction__section--has-image .page-introduction__section-content {
      padding-bottom: var(--spacing-large);
      padding-left: var(--spacing-medium);
      padding-right: var(--spacing-medium);
      position: relative;
    }

    .page-introduction__section--has-image .page-introduction__section-content::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      left: calc(-50vw + 100%);
      background-color: var(--brand-yellow);
    }

    .page-introduction__section--has-image:nth-child(2n) .page-introduction__section-content::before {
      left: 100%;
      right: calc(-50vw + 100%);
    }
  }
</style>
