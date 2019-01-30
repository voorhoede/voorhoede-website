<template>
  <div class="table-of-content">
    <div :class="{ 'table-of-content--sticky' : this.sticky }">
      <h3 class="body-big font-html-blue">Table of content</h3>
      <ul class="flat-list">
        <li 
          class="table-of-content__list-item"
          v-for="item in items" :key="item.title"> 
          <a 
            :href="`#${item.title.replace(/\s+/g, '').toLowerCase()}`"
            v-if="item.title" 
            class="body">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import debounce from '../../lib/debounce-helper'

  export default {
    props: {
      items: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        sticky: null,
      }
    },
    mounted () {
      window.addEventListener('scroll', debounce(() => {
        (window.scrollY >= this.$el.offsetTop) ? this.sticky = true : this.sticky = false
      }, 25))
    },
    beforeDestroy () {
      window.removeEventListener('scroll', debounce)
    },
  }
</script>

<style>
  :root {
    --max-width-toc: 200px;
  }

  .table-of-content {
    display: none;
    position: relative;
    margin: var(--spacing-large) 0;
  }

  .table-of-content--sticky {
    position: fixed;
    top: 0;
    max-width: var(--max-width-toc);
  }

  @media (min-width: 720px) {
    .table-of-content {
      display: block;
    }

    .table-of-content__list-item {
      text-decoration: underline;
      margin-bottom: var(--spacing-small);
    }
  }
</style>
