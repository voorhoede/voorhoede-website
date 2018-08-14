<template>
  <div class="page-index">
    <div class="page-index__header">
      <page-header brick curly-bracket>
        <template slot="title">
          <h1 v-html="headerTitle"/>
        </template>
        <template slot="subTitle">
          <h2 v-html="subtitle"/>
        </template>
        <template slot="image">
          <img :src="headerImage" alt="image">
        </template>
      </page-header>
      <scroll-highlighted-text :text-lines="usps"/>
    </div>
    <section class="page-index__services grid">
      <h2 class="page-index__section-title h1">{{ servicesHeader }}</h2>
      <services-list
        :services="services"
      />
    </section>
    <section class="page-index__cases">
      <div class="grid">
        <h2 class="page-index__section-title page-index__section-title--cases h1">{{ casesTitle }}</h2>
      </div>
      <horizontal-carousel>
        <template slot="slides">
          <div
            v-for="item in 3"
            :key="item"
          >
            <span class="body-big">Let's wait for Jesse's component</span>
          </div>
        </template>
      </horizontal-carousel>
    </section>
    <section class="page-index__clients grid">
      <h2 class="page-index__section-title page-index__section-title--clients h3 font-normal">{{ clientsTitle }}</h2>
      <highlighted-clients :clients="clientsList" :cta-label="clientsButtonLabel"/>
    </section>
    <div class="page-index__academy">
      <academy-excerpt
        :date-string="allEvents[0].date"
        :title="allEvents[0].title"
        :description="allEvents[0].description"
        :cta-primary-label="academyPrimaryButtonLabel"
        :cta-primary-to="allEvents[0].url"
        :cta-secondary-label="academySecondaryButtonLabel"
        cta-secondary-to="/en/academy"
        :current-locale="currentLocale"
        :image="academyImage"
      />
    </div>
  </div>
</template>

<script>
import {
  AcademyExcerpt,
  HighlightedClients,
  PageHeader,
  HorizontalCarousel,
  ScrollHighlightedText,
  ServicesList,
} from '~/components'

export default {
  components: {
    AcademyExcerpt,
    HighlightedClients,
    PageHeader,
    HorizontalCarousel,
    ScrollHighlightedText,
    ServicesList,
  },
  layout: 'landing',
  data() {
    return {
      currentLocale: 'en',
    }
  },
  asyncData() {
    return {
      headerTitle: 'We are <br/> De Voorhoede',
      subtitle: 'How can we help?',
      seoTitle: 'We are De Voorhoede how can we help?',
      headerImage: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
      usps: [
        'We work lean and agile.',
        'Start small and iterate fast',
        'to help you from an idea,',
        'to an amazing product.',
      ],
      servicesHeader: 'What can we do for you?',
      services: [
        {
          tagline: 'We learn, we train',
          title: 'Kick-start your project',
          teaser: 'A dedicated team\nScrum master, developers and optional designers\nOn-site or at our office\nYou stay in charge',
          slug: 'project-kick-start',
        },
        {
          tagline: 'Need a team?',
          title: 'Your own agile team',
          teaser: 'Get a roadmap\nBudget indication for your project\nTest your idea using a prototype\nWith our input, you decide the next step',
          slug: 'agile-team',
        },
        {
          tagline: 'Need developers?',
          title: 'Front-end specialists',
          teaser: 'Experts in JavaScript (frameworks), HTML and CSS\nWho quickly get the hang of your project\nBack-up of 20 colleagues\nImmediately available',
          slug: 'front-end-specialists',
        }
      ],
      casesTitle: 'Just few brands we\'ve helped over the years',
      cases: [
        {
          slug: 'a-brand-new-funda',
          title: 'A brand new Funda',
          published: true,
          social: {
            image: {
              url: 'https://www.datocms-assets.com/2651/1501159248-funda_highlight.jpg'
            }
          }
        },
        {
          slug: 'drop-and-fly',
          title: 'Drop & Fly',
          published: true,
          social: {
            image: null
          }
        }
      ],
      clientsTitle: 'We are proud to have worked with these leading companies',
      clientsList: [
        { logoSrc: '/client-logos/olx.svg', name: 'OLX' },
        { logoSrc: '/client-logos/hyperloop.svg', name: 'Delft Hyperloop' },
        { logoSrc: '/client-logos/funda.svg', name: 'Funda' },
        { logoSrc: '/client-logos/npo.svg', name: 'NPO' },
        { logoSrc: '/client-logos/abn-amro.svg', name: 'ABN AMRO' },
        { logoSrc: '/client-logos/hotelspecials.svg', name: 'HotelSpecials' },
        { logoSrc: '/client-logos/2dehands.svg', name: '2dehands.be' },
        { logoSrc: '/client-logos/ziggo.svg', name: 'Ziggo' },
        { logoSrc: '/client-logos/sita.svg', name: 'Sita' },
        { logoSrc: '/client-logos/trouw.svg', name: 'Trouw' },
        { logoSrc: '/client-logos/hva.svg', name: 'Hogeschool van Amsterdam' },
        { logoSrc: '/client-logos/grandvision.svg', name: 'GrandVision' }
      ],
      clientsButtonLabel: 'Get your name on the list',
      allEvents: [{
        'date': '2018-10-19T09:00:00+02:00',
        'title': 'Performance Masterclass #2',
        'description': 'Performance matters. Research shows performance has a huge impact on conversion and user retention. You — as a front-end developer — can make a big difference! In this full day masterclass you will learn how to boost performance to the max.',
        'url': 'https://www.eventbrite.nl/e/tickets-front-end-performance-master-class-42671692180'
      }],
      academyPrimaryButtonLabel: 'Sign up',
      academySecondaryButtonLabel: 'All events',
      academyImage: {
        format: 'jpeg',
        width: 1500,
        height: 582,
        url: 'https://www.voorhoede.nl/assets/images/team-xl.jpg',
      },
    }
  }
}
</script>

<style>
.page-index__header {
  margin-bottom: var(--spacing-larger);
  background: var(--bg-pastel);
}

.page-index .scroll-highlighted-text {
  padding: var(--spacing-larger) 0;
}

.page-index__section-title {
  margin-bottom: var(--spacing-large);
  text-align: center;
}

.page-index__section-title--clients {
  color: var(--dim);
}

.page-index__cases {
  margin-bottom: var(--spacing-bigger);
  text-align: center;
}

.page-index__clients {
  margin-bottom: var(--spacing-larger);
  padding-top: var(--spacing-large);
  padding-bottom: var(--spacing-larger);
  background: var(--fog);
}

.page-index__academy {
  padding: var(--spacing-larger) 0;
  background: var(--bg-pastel);
}

@media (min-width: 720px) {
  .page-index .page-header {
    margin-bottom: var(--spacing-big);
    height: 100vh;
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-big) 0;
  }

  .page-index__section-title {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__services {
    margin-bottom: var(--spacing-bigger);
  }

  .page-index__clients {
    margin-bottom: var(--spacing-bigger);
    padding-top: var(--spacing-larger);
  }
}

@media (min-width: 1100px) {
  .page-index__header {
    margin-bottom: var(--spacing-bigger);
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-bigger) 0;
  }

  .page-index__section-title--cases {
    grid-column-start: 6;
    grid-column-end: -6;
  }

  .page-index__services > *,
  .page-index__clients > * {
    grid-column-start: 4;
    grid-column-end: -4;
  }

  .page-index__section-title {
    margin-bottom: var(--spacing-big);
  }

  .page-index__clients {
    margin-bottom: var(--spacing-huge);
  }
}

</style>
