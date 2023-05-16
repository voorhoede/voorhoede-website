<template>
  <aside class="structured-text__aside">
    <toc-section
      v-if="toc"
      :items="tocItems"
    />
  </aside>
  <DatocmsStructuredText
    v-bind="$attrs"
    :data="content"
    :render-block="renderBlock"
    :custom-node-rules="customNodeRules"
    class="structured-text"
    :class="{
      'structured-text--center-grid': gridAlignment === 'center',
      'structured-text--with-toc': toc,
    }"
  />
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
  import slugify from '../../lib/slugify';
  import { h } from 'vue'
  import { StructuredText as DatocmsStructuredText, renderNodeRule } from 'vue-datocms'
  import { isHeading, isParagraph, isList  } from 'datocms-structured-text-utils'
  import AppButton from '../app-button/app-button.vue'
  import TagList from '../tag-list/tag-list.vue'
  import StructuredTextBlock from './structured-text-block.vue'

  const props = defineProps({
    content: {
      type: Object,
      default: null
    },
    gridAlignment: {
      type: String,
      default: 'left'
    },
    paragraphVariant: {
      type: String,
      default: 'body',
      validator: (variant) => ['body', 'body-big'].includes(variant),
    },
    toc: {
      type: Boolean,
      default: false,
    },
    root: {
      type: Boolean,
      default: false,
    }
  });
  const emit = defineEmits(['update-toc-items']);

  const tocItems = ref([]);

  const customNodeRules = [
    renderNodeRule(isHeading, ({ node, key, children }) => {
      const slug = slugify(node.children[0].value)
      updateTocItems({
        slug,
        title: node.children[0].value,
      })
      return h(`h${node.level}`, {
        key,
        class: `h${node.level} structured-text__title`,
        id: slug
      }, children)
    }),
    renderNodeRule(isParagraph, ({ key, children }) => {
      return h(
        'p',
        {
          key,
          class: props.paragraphVariant,
        },
        children
      );
    }),
    renderNodeRule(isList, ({ node, key, children }) => {
      return h(node.style === 'numbered' ? 'ol' : 'ul', { key, class: 'structured-text__list' }, children)
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
          onUpdateTocItems: (item) => updateTocItems(item),
        }))))
      }
      case 'StructuredTextBlueTextRecord': {
        return h(StructuredTextBlock, {
          key,
          content: record.body,
          paragraphVariant: props.paragraphVariant,
          class: 'structured-text__blue-text',
          onUpdateTocItems: (item) => updateTocItems(item),
        })
      }
      case 'StructuredTextButtonsListRecord': {
        return h('div', {
          key,
          class: 'structured-text__buttons-list',
        }, record.buttons.map((button) => {
          return h(AppButton, {
            key: button.id,
            label: button.title,
            to: button.url || button.link,
            external: button.__typename === 'ExternalLinkRecord',
          })
        }))
      }
      case 'StructuredTextTagListRecord': {
        return h(TagList, {
          key: record.id,
          items: record.items
        })
      }
      default: {
        return null
      }
    }
  }

  function updateTocItems(item) {
    if (props.root) {
      if (!tocItems.value.find((tocItem) => tocItem.slug === item.slug)) {
        tocItems.value.push(item)
      }
    } else {
      emit('update-toc-items', item)
    }
  }
</script>

<style>
  .structured-text__aside {
    grid-column-end: 10;
    grid-column-start: 3;
  }

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

    .structured-text--with-toc,
    .structured-text--with-toc.structured-text--center-grid {
      grid-column-start: 13;
    }
  }

  @media (min-width: 1100px) {
    .structured-text--center-grid {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }

  .structured-text__title:not(:last-child) {
    margin-bottom: var(--spacing-medium);
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

  .structured-text__buttons-list {
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

  .structured-text__list {
    padding-left: var(--spacing-medium);
  }

  ul.structured-text__list {
    list-style: initial;
  }

  ol.structured-text__list {
    list-style: decimal;
    font-family: var(--font-sans);
    font-weight: 700;
  }

  .structured-text__list li + li {
    margin-top: var(--spacing-medium);
  }
</style>
