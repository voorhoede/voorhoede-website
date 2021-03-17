<template>
  <div>
    <main class="page-cases">
      <div class="grid page-cases__top">
        <page-header
          heading="byline"
          :byline="page.title"
          :headline="page.subtitle"
        />

        <image-with-text-block
          v-if="page.introTitle && page.introBody && page.introImage"
          :title="page.introTitle"
          :body="page.introBody"
          :image="page.introImage"
          :inverse="true"
          class="page-cases__intro"
        />

        <div v-if="page.contactBody" class="page-cases__contact">
          <p class="pullquote">{{ page.contactBody }}</p>
          <AppButton
            :aria-label="$t('get_in_touch')"
            :label="$t('get_in_touch')"
            :to="localeUrl('contact')"
          />
        </div>
      </div>

      <section class="grid page-case__overview">
        <h2 class="h2 page-case__overview-title">{{ $t('all_cases') }}</h2>
        <ul class="page-case__grid">
          <li v-for="caseItem in items" :key="caseItem.slug">
            <case-excerpt
              :slug="caseItem.slug"
              :image="caseItem.caseTeaser.image"
              :title="caseItem.title"
              :body="caseItem.subtitle"
            />
          </li>
        </ul>
      </section>

      <pivot-list
        class="page-cases__pivots"
        v-if="page.pivots && page.pivots.length"
        :pivots="page.pivots"
      />
    </main>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    head,
  }
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

  .page-case__overview {
    background-image: linear-gradient(var(--bg-pastel), var(--bg-pastel));
    background-size: 100% 150px;
    background-repeat: no-repeat;
    background-position: 50% 0;
  }

  .page-case__overview-title {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .page-case__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-medium);
  }

  .page-case__grid .case-excerpt {
    height: 100%;
  }

  @media (min-width: 400px) {
    .page-case__overview {
      background-size: 100% 200px;
    }
  }

  @media (min-width: 720px) {
    .page-cases__intro {
      grid-column: var(--grid-content);
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
  }

  @media (min-width: 1000px) {
    .page-cases__top {
      padding-bottom: var(--spacing-big);
    }

    .page-cases__top > *:not(:last-child) {
      margin-bottom: var(--spacing-big);
    }

    .page-case__overview {
      background-size: 100% 250px;
    }

    .page-case__overview-title {
      margin-bottom: var(--spacing-larger);
    }

    .page-case__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .page-case__overview {
      background-size: 100% 300px;
    }

    .page-case__grid {
      gap: var(--spacing-large);
    }
  }
</style>
