<template>
  <div 
    class="table-of-content"
    :class="{ 'table-of-content--to-bottom' : this.bottomLimitExceeded }">
    <div :class="{ 'table-of-content--sticky' : this.sticky }">
      <h3 class="body-big font-html-blue">Table of content</h3>
      <ul class="flat-list">
        <li 
          class="table-of-content__list-item"
          v-for="(item, index) in items" :key="index"> 
          <a :href="simpleTitle(item.title)" v-if="item.title" class="body">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // track scroll position link container
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      bottomBound: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        sticky: null,
        bottomLimit: null,
        bottomLimitExceeded: false,
        elementSpacing: 75
      }
    },
    mounted () {
      // track scroll position table of content
      window.addEventListener('scroll', () => this.checkOffsetTOC())
    },
    updated() {
      if(this.$el.offsetHeight !== 0 && this.bottomLimitExceeded === false) {
        this.bottomLimit = this.bottomBound - (this.$el.offsetHeight - this.elementSpacing)
      }
    },
    beforeDestroy () {
      window.removeEventListener('scroll', () => this.checkOffsetTOC())
    },
    methods: {
      checkOffsetTOC() {
        let elementOffset = (this.$el.offsetTop + this.$el.offsetHeight)
        
        window.scrollY >= elementOffset
          ? this.sticky = true
          : this.sticky = false
        
        if(window.scrollY >= elementOffset && this.bottomLimit) {
          // if scroll position is equal or greater than position link container then stop being sticky
          window.scrollY >= this.bottomLimit
            ? this.sticky = false
            : this.sticky = true

          window.scrollY < this.bottomLimit
            ? this.bottomLimitExceeded = false
            : this.bottomLimitExceeded = true
        }
      },
      simpleTitle(title) {
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
    display: none;
    position: relative;
    margin: var(--spacing-large) 0;
  }

  .table-of-content--sticky {
    position: fixed;
    top: var(--spacing-large);
    max-width: var(--max-width-toc);
  }

  .table-of-content.table-of-content--to-bottom {
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