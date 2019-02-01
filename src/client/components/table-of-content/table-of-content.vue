<template>
  <div
    class="table-of-content"
    :class="{ 
      'table-of-content--sticky' : sticky,
      'table-of-content--to-bottom' : bottomBoundaryExceeded }">
    <h3 class="body-big font-html-blue">Table of content</h3>
    <ul class="flat-list">
      <li 
        class="table-of-content__list-item"
        v-for="(item, index) in items" :key="index"> 
        <a :href="stripTitle(item.title)" v-if="item.title" class="body">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      bottomBound: {
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
        this.bottomBoundaryExceeded = window.scrollY >= (this.bottomBound - this.$el.offsetHeight)
        if (this.bottomBoundaryExceeded) this.sticky = false
      },
      stripTitle(title) {
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

  .table-of-content {
    position: relative;
    margin: var(--spacing-large) 0;
  }

  .table-of-content--sticky {
    position: fixed;
    top: var(--spacing-large);
    max-width: var(--max-width-toc);
  }

  .table-of-content--to-bottom {
    position: absolute;
    bottom: 0;
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