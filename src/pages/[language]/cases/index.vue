<template>
  <main class="page-cases">
    <div class="grid page-cases__top">
      <page-header
        heading="byline"
        :byline="data.page.title"
        :headline="data.page.subtitle"
      />

      <image-with-text-block
        v-if="data.page.introTitle && data.page.introBody && data.page.introImage"
        :title="data.page.introTitle"
        :body="data.page.introBody"
        :image="data.page.introImage"
        :inverse="true"
        class="page-cases__intro"
        :background-color="BackgroundColor.PastelYellow"
      />

      <div
        v-if="data.page.contactBody"
        class="page-cases__contact"
      >
        <p class="pullquote">
          {{ data.page.contactBody }}
        </p>
        <app-button
          :aria-label="$t('get_in_touch')"
          :label="$t('get_in_touch')"
          :to="$localeUrl({ name: 'contact' })"
        />
      </div>
    </div>

    <section class="grid page-cases__overview">
      <h2 class="h2 page-cases__overview-title">
        {{ $t('all_cases') }}
      </h2>
      <ul class="page-case__grid">
        <li
          v-for="caseItem in data.page.projects"
          :key="caseItem.slug"
        >
          <link-card
            :internal-link="$localeUrl({ name: 'cases-slug', params: { slug: caseItem.slug} })"
            :image="caseItem.caseTeaser.image"
            :title="caseItem.title"
            :body="caseItem.caseTeaser.title"
          />
        </li>
      </ul>
    </section>

    <section class="page-cases__cta grid">
      <cta-block
        v-if="ctaSectionTop"
        :item="ctaSectionTop"
      />
    </section>

    <highlighted-clients
      class="page-cases__highlighted-clients"
      :title="data.page.clientsTitle"
    />

    <pivot-list
      class="page-cases__pivots"
      v-if="data.page.pivots?.length"
      :pivots="data.page.pivots"
      :can-have-border-top="false"
    />
  </main>
</template>

<script setup>
  import { BackgroundColor } from '~/types/index.d';
  import query from './index.query.graphql?raw';

  const { params } = useRoute();

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);

  const ctaSectionTop = computed(() => data.value?.page.pageCtaSection[0]);
</script>

<style>
  .page-cases__top {
    padding-bottom: var(--spacing-large);
    background-color: var(--bg-pastel);
  }

  .page-cases__top > *:not(:last-child) {
    margin-bottom: var(--spacing-large);
  }

  .page-cases__intro {
    grid-column: var(--grid-page);
  }

  .page-cases__contact {
    grid-column: var(--grid-content);
    padding-right: var(--spacing-medium);
    padding-left: var(--spacing-medium);
    text-align: center;
  }

  .page-cases__contact > * + * {
    margin-top: var(--spacing-small);
  }

  .page-cases__pivots .newsletter-form {
    background-color: var(--bg-pastel);
  }

  .page-cases__overview {
    margin-bottom: var(--spacing-larger);
    background-image: linear-gradient(var(--bg-pastel), var(--bg-pastel));
    background-size: 100% 150px;
    background-repeat: no-repeat;
    background-position: 50% 0;
  }

  .page-cases__overview-title {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .page-case__grid {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--spacing-medium);
    column-gap: var(--spacing-medium);
  }

  .page-case__grid .link-card {
    height: 100%;
  }

  .page-cases__cta {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-width: 400px) {
    .page-cases__overview {
      background-size: 100% 200px;
    }
  }

  @media (min-width: 720px) {
    .page-cases__intro {
      grid-column: var(--grid-content);
    }

    .page-cases__overview {
      margin-bottom: var(--spacing-bigger);
    }

    .page-cases__highlighted-clients.highlighted-clients {
      margin-bottom: var(--spacing-large);
    }

    .page-cases__contact {
      padding-left: var(--spacing-larger);
      text-align: left;
    }

    .page-cases__contact > p {
      max-width: 500px;
    }

    .page-case__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .page-cases__cta {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1000px) {
    .page-cases__top {
      padding-bottom: var(--spacing-big);
    }

    .page-cases__top > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-cases__overview {
      background-size: 100% 250px;
    }

    .page-cases__overview-title {
      margin-bottom: var(--spacing-larger);
    }

    .page-case__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1100px) {
    .page-cases__overview {
      margin-bottom: var(--spacing-huge);
    }

    .page-cases__highlighted-clients.highlighted-clients {
      margin-bottom: var(--spacing-larger);
    }
  }

  @media (min-width: 1200px) {
    .page-cases__overview {
      background-size: 100% 300px;
    }

    .page-case__grid {
      row-gap: var(--spacing-large);
      column-gap: var(--spacing-large);
    }
  }
</style>

