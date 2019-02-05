<template>
  <section class="toc-section">
    <h3 class="body-big font-html-blue">{{ $t('table_of_content') }}</h3>
    <nav>
      <ul class="flat-list">
        <li 
          class="toc-section__list-item"
          v-for="(item, index) in items" :key="index"> 
          <a :href="slugify(item.title)" v-if="item.title" class="body">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    methods: {
      slugify(title) {
        //remove spaces and lowercase titles
        return `#${title.replace(/\s+/g, '').toLowerCase()}`
      },
    }
  }
</script>

<style>
  .toc-section {
    top: var(--spacing-large);
    position: sticky;
    margin: var(--spacing-large) 0;
  }

  @media (min-width: 720px) {
    .toc-section {
      display: block;
    }

    .toc-section__list-item {
      text-decoration: underline;
      margin-bottom: var(--spacing-small);
    }
  }
</style>