<template>
  <section class="page-index">
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
      <h2 class="page-index__services-title h1">{{ servicesHeader }}</h2>
      <services-list
        :services="services"
      />
    </section>
  </section>
</template>

<script>
import {
  PageHeader,
  ScrollHighlightedText,
  ServicesList,
} from '~/components'

export default {
  components: {
    PageHeader,
    ScrollHighlightedText,
    ServicesList,
  },
  layout: 'landing',
  asyncData() {
    return {
      headerTitle: 'We are <br/> De Voorhoede',
      subtitle: 'How can we help?',
      seoTitle: 'We are De Voorhoede - how can we help?',
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
          title: 'We learn, we train',
          subtitle: 'Kick-start your project',
          characteristics: [
            'Get a roadmap',
            'Budget indication for your project',
            'Test your idea using a prototype',
            'With our input, you decide the next step',
          ],
          href: '/services/project-kick-start',
        },
        {
          title: 'Need a team?',
          subtitle: 'Your own agile team',
          characteristics: [
            'A dedicated team',
            'Scrum master, developers and optional designers',
            'On-site or at our office',
            'You stay in charge',
          ],
          href: '/services/agile-team',
        },
        {
          title: 'Need developers?',
          subtitle: 'Front-end specialists',
          characteristics: [
            'Experts in JavaScript (frameworks), HTML and CSS',
            'Who quickly get the hang of your project',
            'Back-up of 20 colleagues',
            'Immediately available',
          ],
          href: '/services/front-end-specialists',
        }
      ]
    }
  }
}
</script>

<style>
.page-index__header {
  background: var(--bg-pastel);
}

.page-index .scroll-highlighted-text {
  padding: var(--spacing-larger) 0;
}

.page-index__services {
  margin: var(--spacing-larger) 0;
}

.page-index__services-title {
  margin-bottom: var(--spacing-large);
  text-align: center;
}

@media (min-width: 720px) {
  .page-index .page-header {
    height: 100vh;
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-big) 0;
  }

  .page-index__services-title {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__services {
    margin-top: var(--spacing-big);
    margin-bottom: var(--spacing-bigger);
  }
}

@media (min-width: 1100px) {
  .page-index .scroll-highlighted-text {
    padding: var(--spacing-bigger) 0;
  }

  .page-index__services-title {
    margin-bottom: var(--spacing-big);
  }

  .page-index__services {
    margin-top: var(--spacing-bigger);
  }
}

</style>
