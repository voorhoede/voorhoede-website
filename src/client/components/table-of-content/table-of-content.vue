<template>
  <div class="table-of-content">
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
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      }
    },
    computed: {},
  }
</script>

<style>
  .table-of-content {
    display: none;
    margin: var(--spacing-large) 0;
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
