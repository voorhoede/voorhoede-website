<template>
  <main class="page-contact grid">
    <section class="page-contact__header grid">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
    
      <div class="page-contact__contacts">
        <div v-for="contact in page.contacts" :key="contact.title">
          <div class="page-contact__contact">
            <responsive-image :image="contact.image" class="page-contact__contact-image" alt=""/>
            <div class="page-contact__contact-body">
              <h3 class="h4 subtitle page-contact__contact-title">{{ contact.title }}</h3>
              <a :href="contactType(contact.body)">
                <h3 class="h3 font-bold">{{ contact.body }}</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="page-contact__form-container rich-text grid">
      <div class="page-contact__form-header">
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
      <div class="page-contact__visit-header">
        <h2 class="h2">{{ page.locationTitle }}</h2>
        <p class="pullquote ">{{ page.locationBody }}</p>
      </div>
      <ul class="page-contact__grid page-contact__locations">
        <li class="page-contact__location" v-for="location in page.addresses" :key="location.title">
          <link-card
            :image="location.image"
            :title="location.title"
            :body="location.body"
            :external-link="location.googleMaps"
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
      contactType(value) {
        if(value.includes('@')) {
          return `mailto:${ value }`
        } else {
            return `tel:${ value }`
        }
      }
    },
    head,
  }
</script>

<style>
  .page-contact {
    background-color: var(--bg-pastel);
    overflow-x: hidden;
  }
  
  .page-contact__header, 
  .page-contact__header .page-header {
    grid-column: var(--grid-page);
  }

  @media screen and (min-width: 720px) {
    .page-contact__header .page-header {
      grid-row-start: var(--grid-page-start);
      grid-row-end: var(--grid-content-start);
    }

    .page-contact__header .page-header__text {
      grid-column-start: var(--grid-content-start);
      grid-column-end: var(--grid-center);
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__header .page-header__text {
      grid-column-start: 3;
      grid-column-end: var(--grid-center);
    }
  }

  .page-contact__contacts {
    position: relative;
    margin-top: var(--spacing-big);
    margin-bottom: var(--spacing-big);
  }

  @media screen and (min-width: 720px) {
    .page-contact__contacts {
      transform: translate(0, 5rem);
      grid-row-start: var(--grid-page-start);
      grid-row-end: var(--grid-content-start);
      grid-column-start: var(--grid-center);
      grid-column-end: var(--grid-content-end);
      text-align: center;
    }
  }

  .page-contact__contact-title {
    color: var(--black);
  }

  .page-contact__contacts div:nth-child(1) >
  .page-contact__contact .page-contact__contact-image {
    position: absolute;
    width: 7rem;
    transform: translate(0, -5rem);
  }

  .page-contact__contacts div:nth-child(2) >
  .page-contact__contact .page-contact__contact-image {
    display: block;
    position: absolute;
    width: 10rem;
    transform: translate(0, 7rem);
  }

  .page-contact__contact {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: var(--spacing-medium);
  }

  .page-contact__contacts div:nth-child(odd) > 
  .page-contact__contact {
    flex-direction: row-reverse;
  }

  .page-contact__contact-body {
    display: block;
    width: 100%;
    padding: var(--spacing-medium);
    background: var(--white);
    z-index: var(--z-index-low);
  }

  .page-contact__backdrop {
    background-color: var(--white);
    position: relative;
  }
  
  .page-contact__backdrop::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    right: -2rem;
    background: var(--white);
  }

  @media screen and (min-width: 720px) {
    .page-contact .page-contact__backdrop {
      display: block;
      width: 58%;
    }

    .page-contact .page-contact__backdrop::after {
      width: 0;
      height: 0;
    }
  }

  .page-contact .contact-form {
    margin-bottom: var(--spacing-larger);
  }

  .page-contact__form-body {
    padding-top: var(--spacing-large);
  }

  @media screen and (min-width: 720px) {
    .page-contact__form-body {
      flex-direction: row;
      justify-content: space-between;
      padding: var(--spacing-larger) var(--spacing-large);
    }

    .page-contact .contact-sidebar {
      width: 30%;
    }

    .page-contact__form-header {
      height: 20rem;
      width: 40%;
    }
  }

  .page-contact__form-container {
    margin-top: var(--spacing-small);
    margin-bottom: var(--spacing-big);
    padding-top: var(--spacing-medium);
    background: linear-gradient(180deg, transparent 0%, var(--brand-yellow) 0%, var(--brand-yellow) 95%, transparent 0%);

  }

  .page-contact__form-header {
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-medium);
  }

  @media screen and (min-width: 720px) {
    .page-contact__form-container {
      display: flex;
      align-items: center;
      padding-top: var(--spacing-bigger);
      margin-top: var(--spacing-big);
    }

    .page-contact__form-container {
      display: flex;
      position: relative;
      justify-content: center;
      background: linear-gradient(180deg, transparent 30%, var(--brand-yellow) 0%, var(--brand-yellow) 80%, transparent 0%);
    }

    .page-contact__form-container::after, 
    .page-contact__form-container::before {
      content: "";
      position: absolute;
      width: 3rem;
      height: 100%;
      right: -3rem;
      top: 0;
      background: linear-gradient(180deg, transparent 30%, var(--brand-yellow) 0%, var(--brand-yellow) 80%, transparent 0%);
      z-index: var(--z-index-low);
    }

    .page-contact__form-container::before {
      left: -3rem;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__form-body {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }

  .page-contact__form-header {
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }
  
  .page-contact__visit {
    grid-column: var(--grid-page);
    background-color: var(--white);
  }

  .page-contact__visit-header {
    text-align: center;
    margin: var(--spacing-large);
    padding-top: var(--spacing-medium);
  }

  .page-contact__visit-header {
    grid-column: var(--grid-page-start) / var(--grid-page-end);
    background-color: var(--bg-pastel);
    margin: 0;
    padding-bottom: var(--spacing-big)
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
    padding-left: 0;
    margin-top: -1rem;
    margin-bottom: var(--spacing-large);
  }

  .page-contact__location {
    margin-bottom: var(--spacing-large);
  }

  .page-contact__location .link-card {
    height: 100%;
  }
  
  @media screen and (min-width: 720px) {
    .page-contact__location {
      margin-bottom: 0;
    }  
  }
</style>
