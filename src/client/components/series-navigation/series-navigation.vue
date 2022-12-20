<template>
  <nav
    class="series-navigation"
    aria-labelledby="series-navigation-title"
  >
    <header class="series-navigation__header">
      <h2 id="series-navigation-title" class="series-navigation__title h3">
        {{ titleRoute.title }}
      </h2>
    </header>
    <ul class="series-navigation__child-list">
      <li
        v-for="childRoute in childRoutes"
        :key="childRoute.routePath"
        class="series-navigation__item"
      >
        <nuxt-link
          v-if="!isActive(childRoute.route)"
          :to="!isActive(childRoute) && childRoute.route"
          class="body-big"
          :class="{
            'series-navigation__link': !isActive(childRoute)
          }"
        >
          {{ childRoute.title }}
        </nuxt-link>
        <span class="body-big" v-else>
          {{childRoute.title}}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
  function isValidItem(item) {
    return (
      typeof(item.title) === 'string'
      && typeof(item.slug === 'string')
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
        return this.$route.params.slug === item?.params?.slug
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
    text-decoration: underline;
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
