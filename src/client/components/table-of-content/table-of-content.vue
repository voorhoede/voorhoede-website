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
      bottombound: {
        type: Number,
        default: null
      },
      asideoffsettop: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        sticky: null,
        bottomLimit: null,
        bottomLimitExceeded: false,
        elementSpacing: 75,
        elementHeight: null,
      }
    },
    mounted () {
      // track scroll position table of content
      window.addEventListener('scroll', () => this.checkOffsetTOC())
      this.elementHeight = this.$el.offsetHeight
    },
    updated() {
      this.bottomLimit = this.bottombound - (this.elementHeight - this.elementSpacing) 
    },
    beforeDestroy () {
      window.removeEventListener('scroll', () => this.checkOffsetTOC())
    },
    methods: {
      checkOffsetTOC() {
        const elementOffset = (this.$el.offsetTop + this.elementHeight)
        //top bounds
        window.scrollY > (elementOffset - this.asideoffsettop)
          ? this.sticky = true
          : this.sticky = false
        
        window.scrollY < (elementOffset + this.asideoffsettop)
          ? this.sticky = false
          : this.sticky = true
        //bottom bounds
        if (window.scrollY >= elementOffset && this.bottomLimit) {
          // if scroll position is equal or greater than position link container then stop being sticky
          window.scrollY >= this.bottomLimit
            ? this.sticky = false
            : this.sticky = true
        }

        window.scrollY < this.bottomLimit
        ? this.bottomLimitExceeded = false
        : this.bottomLimitExceeded = true
      },
      simpleTitle(title) {
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