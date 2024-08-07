<template>
  <div class="timeline-block">
    <ul class="timeline-block__items">
      <li
        v-for="item in items"
        :key="item.id"
        class="timeline-block__item"
      >
        <time
          class="body"
          :datetime="item.date"
        >
          {{ formattedDate(item.date) }}
        </time>
        <h3 class="timeline-block__item-title h3">
          {{ item.title }}
        </h3>
        <p
          v-if="item.description"
          class="timeline-block__item-description body"
        >
          {{ item.description }}
        </p>
        <div
          v-if="item.image"
          class="timeline-block__item-image"
        >
          <dato-image
            :src="item.image.url"
            :width="item.image.width"
            :height="item.image.height"
            :alt="item.image.alt || ''"
            loading="lazy"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import formatDate from '../../lib/format-date'

  export default {
    props: {
      items: {
        type: Array,
        default: () => [],
      }
    },
    methods: {
      formattedDate (value) {
        return formatDate({
          date: value,
          locale: this.$i18n.locale(),
          format: 'DD MMMM YYYY'
        })
      },
    },
  }
</script>

<style>
  :root {
    --timeline-bullet-size: 16px;
  }

  .timeline-block__items {
    position: relative;
    padding-bottom: var(--spacing-big);
  }

  /* vertical blue line with gradient */
  .timeline-block__items::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      var(--html-blue),
      var(--html-blue) 65%,
      transparent 100%
    );
  }

  @media (min-width: 720px) {
    .timeline-block__items::after {
      left: 50%;
    }
  }

  .timeline-block__item {
    padding-left: var(--spacing-medium);
  }

  .timeline-block__item + .timeline-block__item {
    margin-top: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .timeline-block__item {
      width: 50%;
    }

    .timeline-block__item:nth-child(odd) {
      margin-right: auto;
      padding-right: var(--spacing-medium);
      padding-left: 0;
      text-align: right;
    }

    .timeline-block__item:nth-child(even) {
      margin-left: auto;
      padding-left: var(--spacing-medium);
    }

    .timeline-block__item + .timeline-block__item {
      margin-top: var(--spacing-medium);
    }
  }

  .timeline-block__item-title {
    position: relative;
    margin-top: var(--spacing-tiny);

    /* make it easier to position the dot in relation to the title */
    line-height: 1;
  }

  .timeline-block__item-description {
    margin-top: var(--spacing-smaller);
  }

  .timeline-block__item-image {
    margin-top: var(--spacing-medium);
    width: 100%;
  }

  .timeline-block__item-image .dato-image {
    height: auto;
  }

  .timeline-block__item-title::after {
    content: '';
    position: absolute;
    top: 3px;

    /* use spacing and bullet size to calculate negative left offset */
    left: calc(-1 * calc(var(--spacing-medium)) + calc(-1 * var(--timeline-bullet-size) / 2));
    width: var(--timeline-bullet-size);
    height: var(--timeline-bullet-size);
    border-radius: 50%;
    background-color: var(--html-blue);
  }

  @media (min-width: 720px) {
    .timeline-block__item-title::after {
      top: 7px;
    }

    .timeline-block__item:nth-child(odd) .timeline-block__item-title::after {
      /* use spacing and bullet size to calculate negative right offset */
      right: calc(-1 * calc(var(--spacing-medium)) + calc(-1 * var(--timeline-bullet-size) / 2));
      left: auto;
    }
  }
</style>
