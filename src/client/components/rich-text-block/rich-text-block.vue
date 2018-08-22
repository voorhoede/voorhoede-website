<template>
  <div class="rich-text" v-html="text" />
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
  .rich-text {
    font-family: var(--font-sans);
    font-size: .875rem; /* 14px */
    margin-bottom: var(--spacing-larger);
  }

  .rich-text p {
    margin-bottom: var(--spacing-medium);
  }

  .rich-text a {
    color: var(--html-blue);
  }

  .rich-text table {
    margin: 0 auto;
    max-width: 500px;
    margin-bottom: var(--spacing-medium);
  }

  .rich-text td {
    padding: var(--spacing-small) 0;
    text-align: center;
  }

  .rich-text tr {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .rich-text tr:first-child {
    font-size: .75rem; /* 12px */
    font-weight: 700;
    line-height: 1.3333333333; /* 16px */
    text-transform: uppercase;
    letter-spacing: .1375rem; /* 2.2px */
    color: var(--html-blue);
    border-bottom: 2px solid var(--very-dim);
  }

  .rich-text ul,
  .rich-text ol {
    font-size: 1rem;
    margin-left: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
  }

  .rich-text li {
    margin-bottom: var(--spacing-tiny);
  }

  @media (min-width: 720px) {
    .rich-text p {
      margin-bottom: var(--spacing-large);
    }

    .rich-text tr:first-child {
      font-size: .8125rem; /* 13px */
      line-height: 1.3076923077; /* 17px */
      letter-spacing: .15rem; /* 2.4px */
    }

    .rich-text ul,
    .rich-text ol {
      font-size: 1.0625rem; /* 17px */
      line-height: 1.5882352941; /* 27px */
    }
  }
</style>
