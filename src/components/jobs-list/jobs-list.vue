<template>
  <ul class="jobs-list grid">
    <li
      class="jobs-list__item"
      v-for="item in jobs.filter(job => !job.isClosed)"
      :key="item.slug"
    >
      <jobs-excerpt
        class="jobs-list__excerpt"
        :is-nested="true"
        :title="item.title"
        :image="item.jobImage"
        :slug="item.slug"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    jobs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  .jobs-list {
    grid-column-start: 1;
    grid-column-end: 51;
    background-color: var(--white);
  }

  .jobs-list__item {
    grid-column: var(--grid-content);
  }

  @media (min-width: 1100px) {
    .jobs-list__item {
      grid-column: var(--grid-content-narrow);
    }
  }
</style>
