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
        <h2 class="series-navigation__title h3">
          <app-icon
            v-if="!isActive(titleRoute)"
            name="arrow-left"
            class="series-navigation__back-icon"
          />
          {{ titleRoute.title }}
        </h2>
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
          class="body-big"
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
  import AppIcon from '../app-icon'

  function isValidItem(item) {
    return (
      typeof(item.title) === 'string'
      && typeof(item.routePath === 'string')
    )
  }

  export default {
    components: { AppIcon },
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
    display: inline-flex;
    align-items: center;
  }
  
  .series-navigation__back-icon {
    margin-right: var(--spacing-tiny);
  }

  .series-navigation__item {
    margin-bottom: var(--spacing-tiny);
  }

  .series-navigation__item:last-child {
    margin-bottom: 0;
  }

  .series-navigation__link {
    color: var(--html-blue);
  }

  .series-navigation__link:hover,
  .series-navigation__link:focus {
    color: var(--active-blue);
  }

  @media (min-width: 720px) {
    .series-navigation__child-list {
      display: flex;
    }

    .series-navigation__item {
      margin-right: var(--spacing-medium);
      margin-bottom: 0;
    }

    .series-navigation__item:last-child {
      margin-right: 0;
    }
  }
</style>
