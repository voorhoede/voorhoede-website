<template>
  <div v-if="largeText" class="rich-text body-big list" v-html="text" />
  <div v-else class="rich-text body list" v-html="text" />
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
      largeText: {
        type: Boolean,
        default: false,
        required: false,
      }
    }
  }
</script>

<style>
  .rich-text {
    word-wrap: break-word;
  }

  .rich-text table,
  .rich-text ul:not(:last-child),
  .rich-text ol:not(:last-child),
  .rich-text p:not(:last-child) {
    margin-bottom: var(--spacing-medium);
  }

  .rich-text a {
    color: var(--html-blue);
    padding-bottom: .15rem;
    position: relative;
  }

  .rich-text a::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--html-blue);
  }

  .rich-text a:hover,
  .rich-text a:focus {
    color: var(--active-blue);
  }

  .rich-text a:hover::after,
  .rich-text a:focus::after {
    height: 2px;
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
    padding-left: var(--spacing-medium);
  }

  /* Paragraph followed by a list? Pull them closer together! */
  .rich-text p + ul,
  .rich-text p + ol {
    margin-top: calc(-1 * var(--spacing-small));
  }

  .rich-text :not(pre) > code {
    font-family: var(--font-code);
    padding: .1em .25rem;
    font-size: .8em;
    color: var(--dark-blue);
    background: var(--paper);
    outline: 1px solid var(--bg-pastel);
  }

  @media (min-width: 720px) {
    .rich-text table,
    .rich-text ul:not(:last-child),
    .rich-text ol:not(:last-child),
    .rich-text p:not(:last-child) {
      margin-bottom: var(--spacing-large);
    }
  }
</style>
