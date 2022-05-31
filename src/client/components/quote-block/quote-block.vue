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
        required: true,
      },
      cite: {
        type: String,
        default: null,
      },
    },
  }
</script>

<style>
  .quote-block {
    display: flex;
    flex-direction: column;
  }

  .quote-block__quote {
    display: block;
    quotes: '\201c' '\201d';
    margin-bottom: var(--spacing-small);
    color: var(--html-blue);
  }

  .quote-block__quote::before {
    content: open-quote;
  }

  .quote-block__quote::after {
    content: close-quote;
  }

  .quote-block__cite {
    margin: 0 0 0 auto;
    color: var(--html-blue);
  }

  @media (min-width: 720px) {
    .quote-block__quote::before {
      margin-left: -1rem;
    }
  }
</style>
