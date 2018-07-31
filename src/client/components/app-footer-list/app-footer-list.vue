<template>
  <div>
    <h5 class="footer-list__title">{{ title }}</h5>
    <ul class="footer-list">
      <li v-for="({target, title}, index) in links"
          :key="index"
          class="footer-list__item">
        <nuxt-link :to="target" class="footer-list__link">
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
        target: '/services',
      },{
        title: 'Cases',
        target: '/cases',
      },{
        title: 'Academy',
        target: '/academy',
      },{
        title: 'About us',
        target: '/about-us',
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
  flex-direction: row;
  border-bottom: 1px solid var(--black);
  justify-content: center;
  padding-bottom: 20px;
}

.footer-list__item {
  margin: 0 20px;
}

.footer-list__title {
  font-family: var(--font-sans);
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--html-blue);
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
  }

  .footer-list__item {
    margin: 0 0;
  }
}
</style>
