<template>
  <main class="page-contact">
    <section class="grid">
      <!-- <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      /> -->
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="dummyContent.title"
        :image="page.headerIllustration"
      />
    
      <section class="page-contact__contacts">
        <div v-for="contact in contacts" :key="contact.title">
          <section class="page-contact__contact">
            <img :src="contact.image.url" class="page-contact__contact-image" alt="">
            <section class="page-contact__contact-body">
              <h3 class="h4 subtitle page-contact__contact-title">{{ contact.title }}</h3>
              <div v-html="contact.body" class="body h2 font-bold " />
            </section>
          </section>
        </div>
      </section>
    </section>

    <section class="page-contact__form-container rich-text grid">
      <div class="page-contact__form-header">
        <h2 class="h2 page-contact__body-title">{{ form.title }}</h2>
        <p class="sub-title page-contact__body-subtitle">{{ form.subtitle }} </p>
      </div>
      <!-- <img src="https://i.imgur.com/2GjGyOX.png" alt="" class="usps__item-image page-contact__usps-item-image"> -->
      <div class="page-contact__backdrop grid">
   
        <!-- <contact-sidebar
            :email-label="page.emailLabel"
            :phone-label="page.phoneLabel"
            :address-label="page.addressLabel"
            :addresses="app.addresses"
          /> -->
    
        <contact-page-form
          class="page-contact__form page-contact__content"
          :aria-label="$t('lets_discuss')"
        />
      </div>

    </section>
    
    <section class="page-contact__visit grid">
      <div class="page-contact__visit-header">
        <h2 class="h2">{{ visit.title }}</h2>
        <p class="pullquote ">{{ visit.body }}</p>
      </div>

      <ul class="page-contact__grid page-contact__locations">
        <li class="page-contact__location" v-for="location in visit.location" :key="location.title">
          <article class="case-excerpt">
            <picture class="case-excerpt__media"><img :src="location.image" class="case-excerpt__image" alt=""></picture>
            <div class="case-excerpt__caption">
              <a href="" class="case-except__link"><h3 class="h4 case-excerpt__title">{{ location.title }} </h3></a>
              <p class="case-excerpt__body body">{{ location.address }}</p>
            </div>
          </article>  
        </li>
      </ul>
    </section>
    
    <newsletter-form :has-background="true" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  export default {
    asyncData,
    data(){
      return {
        dummyContent: {
          title: 'Tell us all about your awesome project!',
          subtitle: 'Are you excited to start your project but dont’t know where to begin? We are all ears, let’s build it together!',
          introTitle: 'call us',
          introBody: '0112343203',
          image: 'https://i.imgur.com/Ccgdl26.png'
        },
        form: {
          title: 'Say Hello!',
          subtitle: 'We would like to hear something from you!'
        },
        visit: {
          title: 'Coffee?',
          body: 'We too love coffee! Head over to one of our location!',
          location: [{
            title: 'Amsterdam',
            address: 'Rijnsburgstraat 9-11 1059 AT Amsterdam',
            image: 'https://imgur.com/pfUlN9C.png'
            },
            {
            title: 'Delft',
            address: 'Koornmarkt 22 2611 EG Delft',
            image: 'https://imgur.com/dRWZrhX.png'
          }]
        },
        contacts: [{
          title: 'Give us a call at',
          body: '<a href="tel:+31 (0)20 2610954" class="body"> <h3 class="h3"> +31 (0)20 2610954 </h3> </a>',
          image: {
            url:'https://i.imgur.com/OdQfz5J.png',
            alt:'icon-one',
            width: '40px',
            height: '40px',
            format: ''
            },
        },{
          title: '...or mail us',
          body: '<a href="mailto:post@voorhoede.nl" class="body"> <h3 class="h3"> post@voorhoede.nl </h3> </a>',
          image: {
            url:'https://imgur.com/zgRP4L5.png',
            alt:'icon-two',
            width: '40px',
            height: '40px',
            format: ''
            },
        }],
      }
    },
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    head,
  }
</script>

<style>
  .page-contact {
    background-color: var(--bg-pastel);
    overflow-x: hidden;
  }

  .page-contact__content {
    padding-top: var(--spacing-large);
  }

  .page-contact__contact {
    display: block;
    position: relative;
  }

  .page-contact__contact-title {
    color: var(--black);
  }

  /* remove when illustrations are in datocms */
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
    z-index: var(--z-index-overlay);
  }

  .page-contact__contacts {
    margin-top: var(--spacing-big);
    margin-bottom: var(--spacing-big);
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
    z-index: var(--z-index-high);
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

  .page-contact .contact-sidebar {
    margin-bottom: var(--spacing-larger);
  }

  .page-contact .contact-sidebar dd {
    margin-bottom: var(--spacing-small);
  }

  .page-contact .contact-form {
    margin-bottom: var(--spacing-larger);
  }

  @media screen and (min-width: 720px) {
    .page-contact__content {
      flex-direction: row;
      justify-content: space-between;
      padding: var(--spacing-larger) var(--spacing-large);
    }

    .page-contact .contact-sidebar {
      width: 30%;
    }

    .page-contact .contact-form {
      /* width: 65%; */
    }

    .page-contact__form-container {
      display: flex;
      align-items: center;
    }

    .page-contact__form-header {
      height: 20rem;
      width: 40%;
    }

    .page-contact__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: var(--spacing-large);
      column-gap: var(--spacing-large);
    }
  }

  @media screen and (min-width: 1100px) {
    .page-contact__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
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
      padding-top: var(--spacing-bigger);
      margin-top: var(--spacing-big);
    }

    .page-contact__form-container {
      display: flex;
      position: relative;
      justify-content: center;
      /* margin: auto; */
      /* width: 70%; */
      height: 90vh;
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

  .page-contact__form-header {
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }
  
  .page-contact__visit {
    background-image: linear-gradient(var(--white), var(--white));
  }

  .page-contact__visit-header {
    text-align: center;
    margin: var(--spacing-large);
    background-color: var(--bg-pastel);
  }

  .page-contact__visit-header {
    grid-column: var(--grid-page-start) / var(--grid-page-end);
    background-color: var(--bg-pastel);
    margin: 0;
    padding-bottom: var(--spacing-big)
  }

  .page-contact__locations {
    padding-left: 0;
    margin-top: -1rem;
    margin-bottom: var(--spacing-large);
  }

  .page-contact__location {
    margin-bottom: var(--spacing-large);
  }
</style>
