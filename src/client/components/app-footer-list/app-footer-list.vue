<template>
  <div>
    <h5 class="body footer-list__title">{{ title }}</h5>
    <ul class="footer-list">
      <li v-for="({target, title}, index) in links"
          :key="index"
          class="footer-list__item body-detail">
        <nuxt-link :to="slug" class="footer-list__link">
          {{ title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Explore',
    },
    links: {
      type: Array,
      default: () => [{
        title: 'Services',
        slug: '/nl/services',
      },{
        title: 'Cases',
        slug: '/nl/cases',
      },{
        title: 'Academy',
        slug: '/nl/academy',
      },{
        title: 'About us',
        slug: '/nl/about-us',
      },{
        title: 'FAQs',
        slug: '/nl/faq',
      }],
      validator: (links) => {
        return links.every(link => {
          return link instanceof Object &&
            typeof link.title === 'string' &&
            typeof link.target === 'string'
        })
      },
    },
  },
}
</script>

<style>
.footer-list {
  display: flex;
  flex-flow: wrap;
  border-bottom: 1px solid var(--black);
  justify-content: center;
  padding-bottom: calc(var(--spacing-smaller) * 2);
}

.footer-list__item {
  margin: 0 var(--spacing-smaller);
}

.footer-list__title {
  font-weight: 700;
  color: var(--html-blue);
  margin-bottom: calc(var(--spacing-small) / 2);
}

.footer-list__link {
  font-family: var(--font-sans);
  text-decoration: none;
}

@media (min-width: 720px) {
  .footer-list {
    display: flex;
    flex-direction: column;
    border-bottom: 0;
    padding-bottom: 0;
  }

  .footer-list__item {
    margin: 0 0 var(--spacing-small) 0;
  }

  .footer-list__item:last-of-type {
    margin: 0 0 0 0;
  }

  .footer-list__title {
    margin-bottom: calc(var(--spacing-smaller) * 2 );
  }
}
</style>
