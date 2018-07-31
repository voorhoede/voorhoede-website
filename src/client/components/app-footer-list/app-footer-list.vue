<template>
  <div>
    <h5 class="footer-list__title">{{title}}</h5>
    <ul class="footer-list">
      <li  v-for="({target, title}, index) in links"
            :key="index">
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
        target: '/services'
      },{
        title: 'Cases',
        target: '/cases'
      }],
      validator: (links) => {
        return links.every(link => {
          return link instanceof Object &&
            typeof link.title === 'string' &&
            typeof link.target === 'string'
        })
      }
    }
  }
}
</script>


<style>
.footer-list {
  display: flex;
  flex-direction: column;
}

.footer-list__title {
  font-family: var(--font-sans);
  font-weight: 700;
  color: var(--html-blue);
}

.footer-list__link {
  font-family: var(--font-sans);
  text-decoration: none;
}
</style>
