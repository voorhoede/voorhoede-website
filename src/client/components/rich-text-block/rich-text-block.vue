<template>
  <div class="rich-text body-big list" v-html="text" />
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style>
  .rich-text ul,
  .rich-text ol,
  .rich-text table,
  .rich-text p:not(:last-child) {
    margin-bottom: var(--spacing-medium);
  }

  .rich-text a {
    color: var(--html-blue);
  }

  .rich-text td {
    padding: var(--spacing-small) var(--spacing-tiny);
    text-align: center;
  }

  .rich-text tr {
    border-bottom: 1px solid var(--very-dim);
  }

  .rich-text tr:first-child {
    border-bottom: 2px solid var(--very-dim);
    color: var(--html-blue);
  }

  .rich-text tr:first-child td {
    padding: var(--spacing-medium) var(--spacing-tiny);
    font-weight: 700;
    vertical-align: bottom;
  }

  .rich-text ul,
  .rich-text ol {
    margin-left: var(--spacing-medium);
    font-size: 1rem;
  }

  .rich-text li {
    margin-bottom: var(--spacing-tiny);
  }

  @media (min-width: 720px) {
    .rich-text ul,
    .rich-text ol,
    .rich-text p:not(:last-child),
    .rich-text table {
      margin-bottom: var(--spacing-large);
    }

    .rich-text ul,
    .rich-text ol {
      font-size: 1.0625rem; /* 17px */
      line-height: 1.5882352941; /* 27px */
    }
  }
</style>
