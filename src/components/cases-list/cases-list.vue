<template>
  <ul
    class="cases-list"
    :class="{'cases-list--three-columns': maxColumns >= 3}"
  >
    <li
      v-for="caseItem in cases"
      :key="caseItem.slug"
    >
      <link-card
        :internal-link="
          $localeUrl({ name: 'cases-slug', params: { slug: caseItem.slug } })
        "
        :image="caseItem.caseTeaser.image"
        :title="caseItem.title"
        :body="caseItem.caseTeaser.title"
      />
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      cases: {
        type: Array,
        required: true,
      },
      maxColumns: {
        type: Number,
        validator: (value) => [2, 3].includes(value),
        default: 3,
      },
    },
  };
</script>

<style>
  .cases-list {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--spacing-medium);
    column-gap: var(--spacing-medium);
  }

  .cases-list .link-card {
    height: 100%;
  }

  @media (min-width: 720px) {
    .cases-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .cases-list.cases-list--three-columns {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .cases-list {
      row-gap: var(--spacing-large);
      column-gap: var(--spacing-large);
    }
  }
</style>
