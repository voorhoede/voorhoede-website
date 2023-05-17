<template>
  <section
    class="grid"
    v-once
  >
    <div class="dialogue-cta">
      <div class="dialogue-cta__image">
        <dato-image
          :src="person.image.url"
          alt=""
          :width="200"
          :height="200"
          loading="eager"
        />
      </div>
      <div>
        <h2 class="dialogue-cta__title h4">
          {{ title }}
        </h2>
        <div
          v-if="variant === 'information'"
          class="dialogue-cta__body body-big"
          v-html="body"
        />
        <blockquote
          v-if="variant === 'quote'"
          class="dialogue-cta__body dialogue-cta__body--quote body-big"
          v-html="body"
        />
        <div class="dialogue-cta__ctas">
          <app-button
            v-for="(cta, index) in ctas"
            :key="index"
            :label="cta.label"
            :to="cta.to"
            :external="cta.external"
            small
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      variant: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      person: {
        type: Object,
        required: true,
      },
      ctas: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
  }
</script>

<style>
  .dialogue-cta {
    display: flex;
    flex-direction: column;
    gap: clamp(var(--spacing-medium), 8%, var(--spacing-larger));
  }

  .dialogue-cta__title {
    margin-bottom: var(--spacing-tiny);
  }

  .dialogue-cta__image {
    width: 200px;
    height: 200px;
    align-self: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .dialogue-cta__image > * {
    object-fit: cover;
    object-position: top;
  }

  .dialogue-cta__body {
    margin-bottom: var(--spacing-small);
    max-width: 55ch;
  }

  .dialogue-cta__body--quote {
    font-style: italic;
    quotes: auto;
  }

  .dialogue-cta__body--quote > p {
    display: inline;
  }

  .dialogue-cta__body--quote::before {
    content: open-quote;
  }

  .dialogue-cta__body--quote::after {
    content: close-quote;
  }

  .dialogue-cta__ctas {
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--spacing-small);
  }

  @media (min-width: 600px) {
    .dialogue-cta {
      flex-direction: row;
      align-items: center;
    }

    .dialogue-cta__image {
      flex-shrink: 0;
    }
  }

  @media (min-width: 1000px) {
    .dialogue-cta {
      grid-column-start: 8;
      grid-column-end: 47;
    }
  }
</style>
