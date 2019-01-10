<template>
  <div class="page-event-detail grid" lang="en">
    <page-header
      class="page-event-detail__header"
      :text="page.title"
      :title="page.label.label"
      :image="page.image" />

    <main class="page-event-detail__list">
      <template v-for="item in page.items">
        <image-with-description
          v-if="item.__typename === 'ImageWithTextRecord'"
          :key="item.description"
          :image="item.imageWithDescription.image"
          :inverse="item.imageWithDescription.inverse"
          :description="item.imageWithDescription.description" />

        <quote-block
          v-if="item.quote"
          :key="item.quote"
          :quote="item.quote"
          :cite="item.author" />

        <responsive-image
          :class="{ 'page-event-detail__image--not-indented' : item.fullWidth}"
          v-if="item.__typename === 'ImageRecord' && item.image"
          :key="item.image.url"
          :image="item.image" />

        <responsive-video
          v-if="item.__typename === 'ResponsiveVideoRecord'"
          :key="item.video.title"
          :video="item.video"
          :autoplay="item.autoplay"
          :loop="item.loop"
          :mute="item.autoplay" />

        <text-block
          v-if="item.__typename === 'TextSectionRecord' && item.title"
          :key="item.title">
          <h2 class="h3 font-html-blue">{{ item.title }}</h2>
        </text-block>

        <rich-text-block
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
      <nuxt-link
        class="app-button app-button--secondary body font-bold"
        :to="`/${currentLocale}/${alternateParent.slug}`">
        &larr; See all events
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    AppButton,
    PageHeader,
    ImageWithDescription,
    QuoteBlock,
    ResponsiveImage,
    ResponsiveVideo,
    RichTextBlock,
    TextBlock } from '../../../components'

  export default {
    async asyncData({ store, route, error }) {
      try {
        return await store.dispatch('getData', { route })
      } catch (err) {
        return error({ statusCode: 404, message: err.message })
      }
    },
    components: {
      AppButton,
      PageHeader,
      ImageWithDescription,
      QuoteBlock,
      ResponsiveImage,
      ResponsiveVideo,
      RichTextBlock,
      TextBlock
    },
    computed: {
      ...mapState(['currentLocale']),
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
    }
  }
</script>

<style>
  .page-event-detail__header {
    grid-column: var(--grid-page);
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail__aside {
    grid-row: 2;
    margin-bottom: var(--spacing-larger);
  }

  .page-event-detail__aside > * {
    margin-bottom: var(--spacing-large);
  }

  .page-event-detail__list {
    grid-row: 3;
    max-width: 100%;
  }

  .page-event-detail__list > * {
    margin-bottom: var(--spacing-large);
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

  @media (min-width: 720px) {
    .page-event-detail__list > * {
      margin-bottom: var(--spacing-larger);
      padding: 0 var(--spacing-larger);
    }

    .page-event-detail__list {
      grid-row: 2;
      grid-column-start: 10;
      grid-column-end: 50;
    }

    .page-event-detail__aside {
      display: block;
      grid-column-start: 2;
      grid-column-end: 9;
    }

    .page-event-detail__header {
      margin-bottom: var(--spacing-larger);
    }

    .page-event-detail__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }

  @media (min-width: 1100px) {
    .page-event-detail__list > * {
      padding: 0 var(--spacing-big);
    }

    .page-event-detail__aside {
      grid-column-start: 4;
      grid-column-end: 11;
    }

    .page-event-detail__list {
      grid-column-start: 12;
      grid-column-end: 46;
    }
  }

  @media (min-width: 1440px) {
    .page-blog-post-list {
      grid-column-start: 12;
      grid-column-end: 44;
    }
  }
</style>
