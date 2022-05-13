<template>
  <blockquote
    v-if="testimonial.validated"
    class="testimonial-block"
    :class="{'testimonial-block--fullwidth' : isFullWidth}"
  >
    <div class="testimonial-block__container">
      <span class="testimonial-block__title h3">{{ testimonial.quote }}</span>
      <p v-if="testimonial.author" class="testimonial-block__author body-small">{{ testimonial.author }}</p>
      <p v-if="testimonial.company" class="testimonial-block__company body-small">{{ testimonial.company }}</p>
    </div>
  </blockquote>
</template>

<script>

  export default {
    props: {
      testimonial: {
        type: Object,
        required: true,
        validator(testimonial) {
          const validatedCheck = typeof(testimonial.validated) === 'boolean'
          const quoteCheck = typeof(testimonial.quote) === 'string'
          const authorCheck = !testimonial.author || typeof(testimonial.author) === 'string'
          const companyCheck = !testimonial.company || typeof(testimonial.company) === 'string'
          return validatedCheck && quoteCheck && authorCheck && companyCheck
        },
      },
    },

    computed: {
      isFullWidth() {
        return this.testimonial.fullwidth
      }
    }
  }
</script>

<style>
  .testimonial-block {
    margin: var(--spacing-larger) 0;
    padding-left: var(--spacing-larger);
    position: relative;
  }

  @media (min-width: 720px) {
    .testimonial-block {
      display: grid;
      grid-template-rows: repeat(2, auto);
      grid-template-columns: 63% 1fr; /* 63% == 550(text)/877(total width)*100 from design  */
      grid-row-gap: var(--spacing-smaller);
      grid-column-gap: var(--spacing-large);
    }

    .testimonial-block--fullwidth {
      grid-template-rows: auto;
      grid-template-columns: 1fr;
    }
  }

  .testimonial-block::before {
    content: '"';
    font-family: var(--font-sans);
    color: var(--html-blue);
    display: inline-block;
    position: absolute;
    top: -70px;
    left: -7px;
    font-size: 160px;
  }

  .testimonial-block__title {
    display: inline;
    color: var(--html-blue);
    background-color: var(--paper);
    line-height: 1.5;
    box-decoration-break: clone;
    padding: .25em .5em;
  }

  .testimonial-block__author {
    margin-top: var(--spacing-small);
  }
</style>
