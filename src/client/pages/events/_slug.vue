<template>
  <article class="page-event-detail grid" lang="en">
    <page-header
      class="page-event-detail__header"
      heading="headline"
      :byline="page.label.label"
      :headline="page.title"
      :image="imageIsIllustration ? page.image : fallbackIllustration" />

    <main class="page-event-detail__main">
      <responsive-image
        v-if="!imageIsIllustration && page.image"
        class="page-event-detail__image"
        :image="page.image"
      />

      <template v-for="item in page.items">
        <image-with-description
          class="page-event-detail__image page-event-detail__main--not-indented"
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.description"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description" />

        <quote-block
          v-if="item.quote"
          :key="item.quote"
          :quote="item.quote"
          :cite="item.author"
          class="page-event-detail__quote" />

        <responsive-image
          class="page-event-detail__image"
          :class="{ 'page-event-detail__main--not-indented' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image" />

        <text-block
          v-if="item.__typename === 'TextSectionRecord' && item.title"
          :key="item.title">
          <h2 class="page-event-detail__title h3 font-html-blue">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
          class="page-event-detail__rich-text"
          v-if="item.__typename === 'TextSectionRecord' && item.body"
          :key="item.body"
          :text="item.body"
          large-text />
      </template>

      <div v-if="page.callToActionLabel">
        <app-button
          :label="page.callToActionLabel"
          :to="page.url"
          external />
      </div>
    </main>

    <aside class="page-event-detail__aside">
      <div>
        <p class="body font-bold">Date</p>
        <time
          :datetime="page.date"
          class="body"
        >
          {{ formattedDate }}
        </time>
      </div>

      <div>
        <p class="body font-bold">Location</p>
        <rich-text-block
          v-if="page.address"
          :key="page.address"
          :text="page.address" />
      </div>

      <div>
        <p v-if="page.price" class="body font-bold">Price</p>
        <p v-if="page.price" class="body">{{ page.price }}</p>
      </div>

      <div
        class="page-event-detail__label body"
        :class="{ 'page-event__detail__label--alt': isMeetup }">
        {{ page.label.label }}
      </div>
    </aside>

    <div class="page-event-detail__link-container">
      <nuxt-link
        class="app-button app-button--secondary body font-bold"
        :to="localeUrl('events')">
        &larr; {{ $t('all_events') }}
      </nuxt-link>
    </div>
  </article>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import formatDate from '~/lib/format-date'

  import {
    AppButton,
    ImageWithDescription,
    PageHeader,
    QuoteBlock,
    ResponsiveImage,
    RichTextBlock,
    TextBlock,
  } from '~/components'

  export default {
    components: {
      AppButton,
      ImageWithDescription,
      PageHeader,
      QuoteBlock,
      ResponsiveImage,
      RichTextBlock,
      TextBlock,
    },
    asyncData,
    data() {
      return {
        fallbackIllustration: {
          url: '/illustrations/event.svg',
          format: 'svg'
        }
      }
    },
    computed: {
      isMeetup() {
        return this.page.label.label.toLowerCase() === 'meet-up'
      },
      imageIsIllustration() {
        const image = this.page.image
        return (image && image.format === 'svg')
      },
      formattedDate() {
        return formatDate({
          date: this.page.date,
          locale: this.$i18n.locale,
          format: 'DD MMM HH:mm'
        })
      }
    },
    head,
  }
</script>

<style>
  .page-event-detail__header,
  .page-event-detail__aside,
  .page-event-detail__button {
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail__main > * {
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail__image {
    justify-content: space-between;
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail__image .image-with-description__description {
    margin-left: 0;
    margin-right: 0;
  }

  .page-event-detail__title {
    margin-bottom: var(--spacing-smaller);
  }

  .page-event-detail__aside {
    grid-row: 2;
  }

  .page-event-detail__aside > * {
    margin-bottom: var(--spacing-medium);
  }

  .page-event-detail__link-container {
    grid-row: 4;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-event-detail__label {
    display: inline-block;
    margin-bottom: var(--spacing-medium);
    padding: 3px 8px;
    padding-top: 6px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--white);
    background-color: var(--html-blue);
  }

  .page-event__detail__label--alt {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .page-event-detail__main {
    grid-row: 3;
    max-width: 100%;
  }

  .page-event-detail__main .responsive-video {
    width: 100%;
    max-width: var(--case-content-max-width-l);
  }

  @media (min-width: 520px) {
    .page-event-detail__aside {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  @media (min-width: 720px) {
    .page-event-detail__main > * {
      margin-bottom: var(--spacing-larger);
      padding: 0 var(--spacing-larger);
    }

    .page-event-detail__main > .page-event-detail__main--not-indented {
      padding: 0;
    }

    .page-event-detail__header,
    .page-event-detail__button {
      margin-bottom: var(--spacing-larger);
    }

    .page-event-detail__main {
      grid-row: 2;
      grid-column-start: 10;
      grid-column-end: 50;
    }

    .page-event-detail__aside {
      display: block;
      grid-column-start: 2;
      grid-column-end: 9;
    }

    .page-event-detail__cta {
      position: relative;
    }

    .page-event-detail__cta .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 3;
    }

    .page-event-detail__pivot-section {
      grid-column-start: 8;
      grid-column-end: 44;
    }

    .page-event-detail__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }

  @media (min-width: 1100px) {
    .page-event-detail__main > * {
      padding: 0 var(--spacing-big);
    }

    .page-event-detail__main {
      grid-column-start: 12;
      grid-column-end: 46;
    }

    .page-event-detail__aside {
      grid-column-start: 4;
      grid-column-end: 11;
    }

    .page-event-detail__pivot-section {
      grid-column-start: 14;
      grid-column-end: 38;
    }

    .page-event-detail__cta .scroll-to {
      bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1440px) {
    .page-event-detail__main > * {
      padding: 0 var(--spacing-bigger);
    }

    .page-event-detail__main {
      grid-column-start: 12;
      grid-column-end: 44;
    }
  }
</style>
