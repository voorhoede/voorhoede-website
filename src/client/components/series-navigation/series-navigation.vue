<template>
  <nav class="series-navigation">
    <header class="series-navigation__header">
      <component
        :is="isActive(titleRoute) ? 'span' : 'nuxt-link'"
        :to="!isActive(titleRoute) && titleRoute.route"
        :class="{
          'series-navigation__link': !isActive(titleRoute)
        }"
      >
        <h2 class="series-navigation__title h4">{{ titleRoute.title }}</h2>
      </component>
    </header>
    <ul class="series-navigation__child-list">
      <li
        v-for="childRoute in childRoutes"
        :key="childRoute.routePath"
        class="series-navigation__item"
      >
        <component
          :is="isActive(childRoute) ? 'span' : 'nuxt-link'"
          :to="!isActive(childRoute) && childRoute.route"
          class="body"
          :class="{
            'series-navigation__link': !isActive(childRoute)
          }"
        >
          {{ childRoute.title }}
        </component>
      </li>
    </ul>
  </nav>
</template>

<script>
  function isValidItem(item) {
    return (
      typeof(item.title) === 'string'
      && typeof(item.routePath === 'string')
    )
  }

  export default {
    props: {
      titleRoute: {
        type: Object,
        required: true,
        validator: isValidItem
      },
      childRoutes: {
        type: Array,
        required: true,
        validator(children) {
          return children.every(isValidItem)
        }
      }
    },
    methods: {
      isActive(item) {
        return item.route === this.localeUrl(this.$route)
      }
    }
  }
</script>

<style>
  .series-navigation {
    padding-bottom: var(--spacing-tiny);
    border-bottom: 1px solid var(--very-dim);
  }

  .series-navigation__header {
    margin-bottom: var(--spacing-smaller);
  }

  .series-navigation__title {
    display: inline;
  }

  .series-navigation__child-list {
    margin-left: var(--spacing-medium);
  }

  .series-navigation__item {
    margin-bottom: var(--spacing-tiny);
  }

  .series-navigation__item:last-child {
    margin-bottom: 0;
  }

  .series-navigation__link {
    color: var(--html-blue);
    padding-bottom: .15rem;
    background: transparent linear-gradient(to top, transparent 1px, var(--html-blue) 1px, var(--html-blue) 2px, transparent 2px);
  }

  .series-navigation__link:hover,
  .series-navigation__link:focus {
    color: var(--active-blue);
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
  }
</style>
