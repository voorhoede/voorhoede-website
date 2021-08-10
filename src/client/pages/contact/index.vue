<template>
  <main class="page-contact grid">
    <section>
      <!-- <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      /> -->
      <page-header
        heading="byline"
        :byline="dummyContent.subtitle"
        :headline="dummyContent.title"
        :image="page.headerIllustration"
      />
      
      <div class="usps">
        <!-- <h2 class="h3 page-work-at__layout">{{ dummyContent.subtitle }}</h2> -->
        <div class="usps__items page-contact__usps-items">
          <div class="usps__item page-contact__usps-item" v-for="usp in usps" :key="usp.title">
            <section class="page-contact__usps-item-body rich-text">
              <img :src="usp.image.url" class="usps__item-image page-contact__usps-item-image" alt="">
              <h3 class="h4 subtitle page-contact__usps-title">{{ usp.title }}</h3>
              <div v-html="usp.body" class="body h2 font-bold" />
            </section>
          </div>
        </div>
      </div>
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
    
    <section class="rich-text page-contact__visit">
      <h2 class="h2">{{ visit.title }}</h2>
      <p class="body">{{ visit.body }}</p>
      <ul>
        <li v-for="location in visit.location" :key="location.title">
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
        usps: [{
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
  }

  .page-contact__content {
    padding-top: var(--spacing-large);
  }

  .page-contact .page-contact__backdrop {
    background-color: var(--white);
    position: relative;
  }
  
  .page-contact .page-contact__backdrop::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    right: -2rem;
    background: var(--white);
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
    .page-contact .page-contact__backdrop {
      display: block;
      width: 58%;
    }

    .page-contact .page-contact__backdrop::after {
      width: 0;
      height: 0;
    }

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
  }

  @media screen and (min-width: 1100px) {
    .page-contact__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }

  .page-contact .page-contact__usps-title {
    color: var(--black);
  }

  .page-contact .page-contact__usps-items {
    position: relative;
  }
  
  .page-contact .page-contact__usps-item-body {
    display: block;
  }

  .page-contact .page-contact__usps-item-image {
    display: block;
    width: 60%;
  }

  .page-contact .page-contact__form-container {
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
    .page-contact .page-contact__form-container {
      padding-top: var(--spacing-bigger);
      margin-top: var(--spacing-big);
    }

    .page-contact .page-contact__form-container {
      display: flex;
      position: relative;
      background: linear-gradient(180deg, transparent 30%, var(--brand-yellow) 0%, var(--brand-yellow) 80%, transparent 0%);
    }

    .page-contact .page-contact__form-container::after, 
    .page-contact .page-contact__form-container::before {
      content: "";
      position: absolute;
      width: 3rem;
      height: 100%;
      right: -2rem;
      top: 0;
      background: linear-gradient(180deg, transparent 30%, var(--brand-yellow) 0%, var(--brand-yellow) 80%, transparent 0%);
      z-index: var(--z-index-low);
    }

    .page-contact .page-contact__form-container::before {
      left: -3rem;
    }
  }

  .page-contact__form-header {
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

</style>
