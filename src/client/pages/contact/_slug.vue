<template>
  <main
    id="content"
    tabindex="-1"
  >
    <section class="page-contact-confirmation">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <div class="page-contact-confirmation__backdrop grid">
        <div class="page-contact-confirmation__content body">
          {{ page.body }}
        </div>
      </div>
    </section>
    <pivot-list
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
      :last-item-has-background="false"
      :can-have-border-top="false"
    />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    head,
  }
</script>

<style>
  .page-contact-confirmation {
    background-color: var(--bg-pastel);
  }

  .page-contact-confirmation__backdrop {
    margin-bottom: var(--spacing-large);
    background-color: var(--white);
  }

  .page-contact-confirmation__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--white);
  }

  @media screen and (min-width: 720px) {
    .page-contact-confirmation__backdrop {
      margin-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .page-contact-confirmation__content {
      flex-direction: row;
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact-confirmation__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }
</style>
