<template>
  <div class="page-event-detail grid" lang="en">
    <page-header
      class="page-event-detail__header"
      :title="page.label.label"
      :text="page.title"
      :image="page.image" />

    <article class="page-event-detail-list">
      <template v-for="item in page.items">
        <image-with-description
          class="page-event-detail-list__image page-event-detail-list--not-indented"
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
          class="page-event-detail-list__image"
          :class="{ 'page-event-detail-list--not-indented' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image" />

        <text-block
          v-if="item.__typename === 'TextSectionRecord' && item.title"
          :key="item.title">
          <h2 class="page-event-detail-list__title h3 font-html-blue">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
          class="page-event-detail-list__rich-text"
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
    </article>

    <aside class="page-event-detail__aside">
      <div>
        <p class="body font-bold">Date</p>
        <div class="body">{{ day }} {{ month }} {{ hours }}:{{ minutes }}</div>
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
      <nuxt-link class="app-button app-button--secondary body font-bold" :to="`/${currentLocale}/${alternateParent.slug}`">
        &larr; See all {{ alternateParent.slug }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

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
    computed: {
      isMeetup() {
          return this.page.label.label.toLowerCase() === 'meet-up'
        },
        dateString() {
          return new Date(this.page.date)
        },
        day() {
          return this.dateString.toLocaleDateString(this.currentLocale, {
            day: 'numeric',
          })
        },
        month() {
          return this.dateString.toLocaleDateString(this.currentLocale, {
            month: 'short',
          })
        },
        hours() {
          const hour = this.dateString.getHours()
          if (hour < 10) {
            return `0${hour}`
          }
          return hour
        },
        minutes() {
          const min = this.dateString.getMinutes()
          if (min < 10) {
            return `0${min}`
          }
          return min
        }
    },
    head,
  }
</script>

<style>
  .page-event-detail__header {
    grid-column: var(--grid-page);
  }

  .page-event-detail__header,
  .page-event-detail__aside,
  .page-event-detail__button {
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail-list > * {
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail-list__image {
    justify-content: space-between;
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail-list__image .image-with-description__description {
    margin-left: 0;
    margin-right: 0;
  }

  .page-event-detail-list__title {
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

  .page-event-detail-list {
    grid-row: 3;
    max-width: 100%;
  }

  .page-event-detail-list .responsive-video {
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
    .page-event-detail-list > * {
      margin-bottom: var(--spacing-larger);
      padding: 0 var(--spacing-larger);
    }

    .page-event-detail-list > .page-event-detail-list--not-indented {
      padding: 0;
    }

    .page-event-detail__header,
    .page-event-detail__button {
      margin-bottom: var(--spacing-larger);
    }

    .page-event-detail-list {
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

    .page-event-detail__cta-block {
      grid-column-start: 8;
      grid-column-end: 44;
    }

    .page-event-detail__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }

  @media (min-width: 1100px) {
    .page-event-detail-list > * {
      padding: 0 var(--spacing-big);
    }

    .page-event-detail-list {
      grid-column-start: 12;
      grid-column-end: 46;
    }

    .page-event-detail__aside {
      grid-column-start: 4;
      grid-column-end: 11;
    }

    .page-event-detail__cta-block {
      grid-column-start: 14;
      grid-column-end: 38;
    }

    .page-event-detail__cta .scroll-to {
      bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1440px) {
    .page-event-detail-list > * {
      padding: 0 var(--spacing-bigger);
    }

    .page-event-detail-list {
      grid-column-start: 12;
      grid-column-end: 44;
    }
  }
</style>
