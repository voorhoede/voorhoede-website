<template>
  <DatocmsStructuredText
    :data="content"
    :render-block="renderBlock"
    :custom-node-rules="customNodeRules"
    class="structured-text"
    :class="{
      'structured-text--center-grid': gridAlignment === 'center',
    }"
  />
</template>

<script setup>
  import { h } from 'vue'
  import { StructuredText as DatocmsStructuredText, renderNodeRule } from 'vue-datocms'
  import { isHeading, isParagraph } from 'datocms-structured-text-utils'
  import AppButton from '../app-button/app-button.vue'
  import StructuredTextBlock from './structured-text-block.vue'

  defineProps({
    content: {
      type: Object,
      default: null
    },
    gridAlignment: {
      type: String,
      default: 'left'
    },
  });

  const customNodeRules = [
    renderNodeRule(isHeading, ({ node, key, children }) => {
      return h(`h${node.level}`, { key, class: `h${node.level}` }, children)
    }),
    renderNodeRule(isParagraph, ({ key, children }) => {
      return h('p', { key, class: 'body-big' }, children)
    }),
  ]

  function renderBlock({ record, key }) {
    switch (record.__typename) {
      case 'StructuredTextHighlightedListRecord': {
        return h('ul', {
          key,
          class: 'structured-text__highlighted-list',
        }, record.items.map((listItem, listItemIndex) => h('li', {
          key: listItemIndex,
          class: 'structured-text__highlighted-list-item',
        }, h(StructuredTextBlock, {
          content: listItem.body,
        }))))
      }
      case 'StructuredTextBlueTextRecord': {
        return h(StructuredTextBlock, {
          key,
          content: record.body,
          class: 'structured-text__blue-text',
        })
      }
      case 'StructuredTextCtaListRecord': {
        return h('div', {
          key,
          class: 'structured-text__cta-list',
        }, record.ctas.map((cta, ctaIndex) => {
          return h(AppButton, {
            key: ctaIndex,
            label: cta.title,
            to: cta.url || cta.link,
            external: cta.__typename === 'ExternalLinkRecord',
          })
        }))
      }
      default: {
        return null
      }
    }
  }
</script>

<style>
  .structured-text {
    grid-column: var(--grid-content);
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 720px) {
    .structured-text--center-grid {
      grid-column-start: 6;
      grid-column-end: 44;
    }
  }

  @media (min-width: 1100px) {
    .structured-text--center-grid {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }

  .structured-text p:not(:last-child) {
    margin-bottom: var(--spacing-medium);
  }

  .structured-text p a {
    color: var(--html-blue);
    padding-bottom: .15rem;
    background: transparent linear-gradient(to top, transparent 1px, var(--html-blue) 1px, var(--html-blue) 2px, transparent 2px);
  }

  .structured-text p a:hover,
  .structured-text p a:focus {
    color: var(--active-blue);
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
  }

  .structured-text__blue-text {
    color: var(--html-blue);
    text-align: center;
    margin-bottom: var(--spacing-medium);
  }

  .structured-text__cta-list {
    margin-top: var(--spacing-medium);
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    align-self: center;
  }

  .structured-text__highlighted-list-item {
    padding: var(--spacing-medium);
    background-color: var(--white);
  }

  .structured-text__highlighted-list-item + .structured-text__highlighted-list-item {
    margin-top: var(--spacing-medium);
  }
</style>
