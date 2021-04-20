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

      <section class="grid page-cases__overview">
        <h2 class="h2 page-cases__overview-title">{{ $t('all_cases') }}</h2>
        <ul class="page-case__grid">
          <li v-for="caseItem in page.projects" :key="caseItem.slug">
            <case-excerpt
              :slug="caseItem.slug"
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
        :title="page.clientsTitle"
      />

      <pivot-list
        class="page-cases__pivots"
        v-if="page.pivots && page.pivots.length"
        :pivots="page.pivots"
        :can-have-border-top="false"
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
    computed: {
      ctaSectionTop() {
        return this.page.pageCtaSection[0]
      },
    }
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
    gap: var(--spacing-medium);
  }

  .page-case__grid .case-excerpt {
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
      gap: var(--spacing-large);
    }
  }
</style>
