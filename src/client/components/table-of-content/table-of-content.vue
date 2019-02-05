<template>
  <section
    class="toc-section"
    :class="{ 
      'toc-section--sticky' : sticky,
      'toc-section--to-bottom' : bottomBoundaryExceeded }">
    <h3 class="body-big font-html-blue">{{ $t('table_of_content') }}</h3>
    <ul class="flat-list">
      <li 
        class="toc-section__list-item"
        v-for="(item, index) in items" :key="index"> 
        <a :href="slugify(item.title)" v-if="item.title" class="body">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      bottomBoundary: {
        type: Number,
        default: null
      },
      asideOffsetTop: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        sticky: false,
        bottomBoundaryExceeded: false,
      }
    },
    mounted () {
      window.addEventListener('scroll', () => this.setStickyState())
    },
    beforeDestroy () {
      window.removeEventListener('scroll', () => this.setStickyState())
    },
    methods: {
      setStickyState() {
        this.sticky = window.scrollY >= (this.asideOffsetTop + this.$el.offsetHeight),
        this.bottomBoundaryExceeded = window.scrollY >= (this.bottomBoundary - this.$el.offsetHeight)
        if (this.bottomBoundaryExceeded) this.sticky = false
      },
      slugify(title) {
        //remove spaces and lowercase titles
        return `#${title.replace(/\s+/g, '').toLowerCase()}`
      }
    }
  }
</script>

<style>
  :root {
    --max-width-toc: 200px;
  }

  .toc-section {
    position: relative;
    margin: var(--spacing-large) 0;
  }

  .toc-section--sticky {
    position: fixed;
    top: var(--spacing-large);
    max-width: var(--max-width-toc);
  }

  .toc-section--to-bottom {
    position: absolute;
    bottom: 0;
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