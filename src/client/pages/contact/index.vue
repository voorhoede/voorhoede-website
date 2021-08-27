<template>
  <main class="page-contact grid">
    <section class="page-contact__header-wrapper grid">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
        class="page-contact__header"
      />
      <div class="page-contact__contacts">
        <div class="page-contact__contact" v-for="contact in page.contacts" :key="contact.title">
          <responsive-image :image="contact.image" class="page-contact__contact-image"/>
          <div class="page-contact__contact-body">
            <a :href="contactType(contact.contactType, contact.body)" class="page-contact__contact-link">
              <span class="h4 page-contact__contact-title page-contact-z-index--high">{{ contact.title }}</span>
              <p class="h3 page-contact-z-index--high">{{ contact.body }}</p>
            </a>
          </div>
        </div>
      </div>
    </section>

    <div class="page-contact__form-container rich-text grid">
      <div class="page-contact__form-header grid">
        <h2 class="h2 page-contact__body-title">{{ page.introTitle }}</h2>
        <p class="sub-title page-contact__body-subtitle">{{ page.introBody }} </p>
      </div>
      <div class="page-contact__backdrop grid">
        <contact-page-form
          class="page-contact__form-body"
          :aria-label="$t('lets_discuss')"
        />
      </div>
    </div>

    <div class="page-contact__visit grid">
      <div class="page-contact__visit-header rich-text grid">
        <h2 class="h2">{{ page.locationTitle }}</h2>
        <p class="body-big font-html-blue page-contact__visit-body">{{ page.locationBody }}</p>
      </div>
      <ul class="page-contact__grid page-contact__locations">
        <li class="page-contact__location" v-for="location in page.addresses" :key="location.title">
          <link-card
            :image="location.image"
            :title="location.title"
            :body="location.body"
            :external-link="location.googleMaps"
            class="page-contact__location-card"
          />
        </li>
      </ul>
    </div>

    <newsletter-form :has-background="true" />
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
    methods: {
      contactType(type, body) {
        if(type === 'email') {
          return `mailto:${ body }`
        } else {
          return `tel:${ body }`
        }
      }
    },
    head,
  }
</script>

<style>
  :root {
    --page-contact-brand-bg: linear-gradient(180deg, transparent 15%, var(--brand-yellow) 0%, var(--brand-yellow) 95%, transparent 0%);
    --page-contact-brand-bg--small: linear-gradient(180deg, transparent 0%, var(--brand-yellow) 0%, var(--brand-yellow) 95%, transparent 0%);
    --page-contact-white-overlap: linear-gradient(var(--white), var(--white));
  }

  .page-contact {
    background-color: var(--bg-pastel);
  }

  .page-contact__header {
    grid-column: var(--grid-page);
  }

  @media screen and (min-width: 720px) {
    .page-contact__header {
      grid-row-start: 1;
      grid-row-end: 2;
    }

    .page-contact__header-wrapper .page-contact__header .page-header__text {
      grid-column-start: var(--grid-content-start);
      grid-column-end: 21;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__header-wrapper .page-contact__header .page-header__text {
      grid-column-start: 3;
    }
  }

  .page-contact__contacts {
    position: relative;
    margin-top: var(--spacing-big);
    margin-bottom: var(--spacing-big);
    text-align: center;
  }

  @media screen and (min-width: 720px) {
    .page-contact__contacts {
      margin-top: 10rem;
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 27;
      grid-column-end: var(--grid-content-end);
    }
  }

  .page-contact__contacts .page-contact__contact-image {
    position: absolute;
    width: 7rem;
  }

  .page-contact__contact:nth-child(1) > .page-contact__contact-image {
    transform: translate(0, -5rem);
  }

  .page-contact__contact:nth-child(2) > .page-contact__contact-image {
    display: block;
    transform: translate(0, 6rem);
    z-index: var(--z-index-high);
  }

  .page-contact__contact:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .page-contact__contact {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: var(--spacing-medium);
  }

  .page-contact__contact-body {
    position: relative;
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-medium);
    flex: 1;
  }

  .page-contact-z-index--high {
    position: relative;
    z-index: var(--z-index-high);
  }

  .page-contact__contact-link::before {
    content: '';
    z-index: var(--z-index-low);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--white);
    border-radius: var(--border-radius);
    transition: .15s;
  }

  .page-contact__contact-link:hover::before,
  .page-contact__contact-link:active::before {
    transform: scaleX(1.05) scaleY(1.05);
  }

  .page-contact__contact-title {
    color: var(--black);
  }

  .page-contact__backdrop {
    margin-right: calc(-1 * var(--spacing-large));
    background-color: var(--white);
    position: relative;
  }

  @media screen and (min-width: 720px) {
    .page-contact .page-contact__backdrop {
      display: block;
      margin-right: 0;
      width: 58%;
    }
  }

  .page-contact .contact-form {
    margin-bottom: var(--spacing-larger);
  }

  .page-contact__form-body {
    padding-top: var(--spacing-large);
  }

  @media screen and (min-width: 720px) {
    .page-contact__body-subtitle,
    .page-contact__body-title {
      grid-column-start: 2;
      grid-column-end: 19;
    }

    .page-contact__form-body {
      flex-direction: row;
      justify-content: space-between;
      padding: var(--spacing-larger) var(--spacing-large);
    }

    .page-contact__form-header {
      width: 40%;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__form-body {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }

  .page-contact__form-container {
    margin-top: var(--spacing-small);
    margin-bottom: var(--spacing-big);
    padding-top: var(--spacing-medium);
    background-image: var(--page-contact-brand-bg--small);
  }

  @media screen and (min-width: 720px) {
    .page-contact__form-container {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      margin-top: var(--spacing-bigger);
      background: var(--page-contact-brand-bg);
    }

    .page-contact__form-container::after,
    .page-contact__form-container::before {
      content: '';
      position: absolute;
      width: 3rem;
      height: 100%;
      right: -3rem;
      top: 0;
      background: var(--page-contact-brand-bg);
      z-index: var(--z-index-low);
    }

    .page-contact__form-container::before {
      left: -3rem;
    }
  }

  .page-contact__form-header {
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

  .page-contact__visit {
    grid-column: var(--grid-page);
    background-image: var(--page-contact-white-overlap);
    padding-bottom: var(--spacing-large);
    background-size: 100% 65%;
    background-repeat: no-repeat;
    background-position: 0 100%;
  }

  .page-contact__visit-header {
    grid-column: var(--grid-page-start) / var(--grid-page-end);
    margin-top: 0;
    margin-bottom: var(--spacing-medium);
    padding-bottom: var(--spacing-larger);
    text-align: center;
  }

  @media screen and (min-width: 720px) {
    .page-contact__visit-header .page-contact__visit-body {
      grid-column: var(--grid-content-smallest);
    }
  }

  .page-contact__grid {
    display: grid;
  }

  @media screen and (min-width: 720px) {
    .page-contact__grid {
      justify-self: center;
      grid-template-columns: repeat(2, 1fr);
      row-gap: var(--spacing-large);
      column-gap: var(--spacing-large);
    }
  }

  .page-contact__locations {
    margin-bottom: var(--spacing-large);
  }

  .page-contact__location {
    margin-bottom: var(--spacing-large);
  }

  .page-contact__location-card {
    height: 100%;
  }

  @media screen and (min-width: 720px) {
    .page-contact__location {
      margin-bottom: 0;
    }
  }
</style>
