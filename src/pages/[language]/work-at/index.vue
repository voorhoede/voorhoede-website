<template>
  <main class="page-work-at grid">
    <page-header
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />

    <image-with-text-block
      :title="data.page.introTitle"
      :body="data.page.introBody"
      :image="data.page.introImage"
    />

    <interstitial-cta
      :cta="data.page.interstitialCta.title"
      :buttons="[
        { label: data.page.interstitialCta.callUsTitle, to: data.page.interstitialCta.callUsNumber, external: true },
        { label: data.page.interstitialCta.mailUsTitle, to: data.page.interstitialCta.mailUsAddress, external: true },
      ]"
    />

    <image-with-text-block
      v-if="data.page.middleTitle || data.page.middleBody || data.page.middleImage"
      :title="data.page.middleTitle"
      :body="data.page.middleBody"
      :image="data.page.middleImage"
      :inverse="true"
    />

    <div class="usps">
      <h2 class="h3 page-work-at__layout">
        {{ data.page.uspsTitle }}
      </h2>
      <div class="usps__items">
        <div
          class="usps__item"
          v-for="usp in data.page.usps"
          :key="usp.title"
        >
          <dato-image
            class="usps__item-image"
            :src="usp.image.url"
            alt=""
            :width="usp.image.width"
            :height="usp.image.height"
            loading="eager"
          />
          <h3 class="h4 usps__item-heading">
            {{ usp.title }}
          </h3>
          <div
            v-html="usp.body"
            class="body"
          />
        </div>
      </div>
    </div>

    <div
      class="body-big font-html-blue page-work-at__layout rich-text"
      v-html="data.page.uspsAfter"
    />

    <div class="page-work-at__quote grid">
      <cta-block :item="data.page.quote[0]" />
    </div>

    <div class="page-work-at__layout rich-text">
      <h2 class="h2">
        {{ data.page.jobsTitle }}
      </h2>
      <div
        class="body-big font-html-blue"
        v-html="data.page.jobsBody"
      />
    </div>

    <div class="page-work-at__layout page-work-at__job-buttons">
      <app-button
        v-for="job in data.page.jobs"
        :key="job.title"
        :label="job.title"
        :to="$localeUrl({ name: 'jobs-slug', params: { slug: job.job.slug } })"
      />
    </div>

    <div
      class="body-big font-html-blue page-work-at__layout rich-text"
      v-html="data.page.jobsAfter"
    />

    <!-- We had to combine the ImageWithText with
      the RichTextBlock to get the desired 'custom' layout -->
    <div class="image-with-text">
      <dato-image
        class="image-with-text__image"
        :src="data.page.endImage.url"
        alt=""
        :width="data.page.endImage.width"
        :height="data.page.endImage.height"
        sizes="(min-width: 1100px) 730px, (min-width: 720px) 40vw, 90vw"
        loading="lazy"
      />
      <div class="image-with-text__body">
        <h2 class="image-with-text__body-title h3">
          {{ data.page.endTitle }}
        </h2>
        <rich-text-block
          class="image-with-text__body-text generic-text-block__body"
          :text="data.page.endBody"
        />
      </div>
    </div>

    <image-grid
      :title="data.page.teamGridTitle"
      :items="data.page.teamGrid"
    />

    <div
      class="pullquote page-work-at__layout rich-text"
      v-html="data.page.stayInTouch"
    />
    <newsletter-form />
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);
</script>

<style>
  .page-work-at {
    background-color: var(--bg-pastel);
  }

  .page-work-at > * {
    margin-bottom: var(--spacing-big);
  }

  .page-work-at__layout {
    text-align: center;
    grid-column: var(--grid-content);
  }

  @media (min-width: 720px) {
    .page-work-at__layout {
      grid-column-start: 6;
      grid-column-end: 44;
    }
  }

  @media (min-width: 1100px) {
    .page-work-at__layout {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }

  .page-work-at__layout > * + * {
    margin-top: var(--spacing-small);
  }

  .page-work-at__job-buttons > .app-button {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  .usps {
    grid-column: var(--grid-page);
    margin-left: auto;
    margin-right: auto;
  }

  .usps__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .usps__item {
    flex: 0 1 300px;
    padding: var(--spacing-medium);
    margin-top: 150px;
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
    background-color: var(--white);
  }

  @media (min-width: 1200px) {
    .usps__item {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
      flex: 0 1 320px;
    }
  }

  .usps__item-heading {
    text-align: center;
    margin-top: var(--spacing-small);
    margin-bottom: var(--spacing-small);
  }

  .usps__item-image {
    max-width: 200px;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    margin-top: -150px;
    padding: var(--spacing-small);
  }

  .page-work-at__quote {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .page-work-at__quote {
      margin-top: var(--spacing-large);
    }
  }

  @media (min-width: 1200px) {
    .page-work-at__quote {
      margin-top: var(--spacing-larger);
    }
  }
</style>
