<template>
  <div>
    <main class="page-cases">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
      />

      <introduction-block
        v-if="page.introductionBlock"
        :title="page.introductionBlock.title"
        :body="page.introductionBlock.body"
        class="page-cases__introduction grid"
      />

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
  .page-cases__introduction {
    margin-top: var(--spacing-larger);
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
    .page-cases__introduction > * {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
    }

    .page-case__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
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
