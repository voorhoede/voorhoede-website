<template>
  <div class="quote-block">
    <blockquote>
      <p>
        <q class="quote-block__quote testimonial">{{ quote }}</q>
      </p>
    </blockquote>
    <cite
      v-if="cite"
      class="quote-block__cite body"
    >
      - {{ cite }}
    </cite>
  </div>
</template>

<script>
  export default {
    props: {
      quote: {
        type: String,
        required: true
      },
      cite: {
        type: String,
        default: null
      }
    }
  }
</script>

<style>

  .quote-block {
    text-align: center;
  }

  .quote-block__quote {
    display: block;
    quotes: '\201c' '\201d';
    margin-bottom: var(--spacing-small);
  }

  .quote-block__quote::before {
    content: open-quote;
  }

  .quote-block__quote::after {
    content: close-quote;
  }

  .quote-block__cite {
    color: var(--dim);
  }
</style>
