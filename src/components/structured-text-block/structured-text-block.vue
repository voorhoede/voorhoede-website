<template>
  <toc-section
    v-if="hasToc"
    :items="tocItems"
    class="structured-text__toc"
    :class="{
      'structured-text__toc--center-grid': gridAlignment === 'center',
    }"
  />
  <DatocmsStructuredText
    v-bind="$attrs"
    :data="content"
    :render-block="renderBlock"
    :custom-node-rules="customNodeRules"
    class="structured-text"
    :class="{
      'structured-text--center-grid': gridAlignment === 'center',
      'structured-text--with-toc': hasToc,
    }"
  />
</template>

<script setup>
  import slugify from '../../lib/slugify';
  import { h } from 'vue'
  import { StructuredText as DatocmsStructuredText, renderNodeRule } from 'vue-datocms'
  import { isHeading, isParagraph, isList  } from 'datocms-structured-text-utils'
  import AppButton from '../app-button/app-button.vue'
  import TagList from '../tag-list/tag-list.vue'
  import ImageWithCaption from '../image-with-caption/image-with-caption.vue'
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
      validator: (variant) => ['body', 'body-big', 'testimonial'].includes(variant),
    },
    hasToc: {
      type: Boolean,
      default: false,
    },
    isRoot: {
      type: Boolean,
      default: true,
    }
  });

  const tocItems = ref([]);
  const emit = defineEmits(['update-toc-items']);
  defineOptions({ inheritAttrs: false });

  const customNodeRules = [
    renderNodeRule(isHeading, ({ node, key, children }) => {
      const slug = slugify(node.children[0].value)
      updateTocItems({
        titleId: slug,
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
      return h(node.style === 'numbered' ? 'ol' : 'ul', {
        key,
        class: `structured-text__list ${props.paragraphVariant}`
      }, children)
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
          isRoot: false,
          onUpdateTocItems: updateTocItems,
        }))))
      }
      case 'StructuredTextBlueTextRecord': {
        return h(StructuredTextBlock, {
          key,
          content: record.body,
          paragraphVariant: record.variant === 'intro' ? 'testimonial' : props.paragraphVariant,
          isRoot: false,
          class: {
            'structured-text__blue-text': true,
            'structured-text__blue-text--center': record.textAlignment === 'center'
          },
          onUpdateTocItems: updateTocItems,
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
      case 'ImageRecord': {
        return h(ImageWithCaption, {
          class: 'structured-text__image-with-caption',
          caption: record.caption,
          image: record.image,
        })
      }
      default: {
        return null
      }
    }
  }

  function updateTocItems(item) {
    if (props.isRoot) {
      if (!tocItems.value.find((tocItem) => tocItem.titleId === item.titleId)) {
        tocItems.value.push(item)
      }
    } else {
      emit('update-toc-items', item)
    }
  }
</script>

<style>
  .structured-text__toc {
    margin-top: 0;
    grid-column-start: 3;
    grid-column-end: 10;
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

    .structured-text--with-toc {
      grid-column-start: 13;
    }


    .structured-text--with-toc.structured-text--center-grid {
      grid-column-start: 18;
    }

    .structured-text__toc--center-grid {
      grid-column-start: 8;
      grid-column-end: 15;
    }
  }

  @media (min-width: 1100px) {
    .structured-text--center-grid {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }

  .structured-text > *:not(:last-child) {
    margin-bottom: var(--spacing-medium);
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
    margin-bottom: var(--spacing-medium);
  }

  .structured-text__blue-text--center {
    text-align: center;
  }

  .structured-text__buttons-list {
    margin-top: var(--spacing-medium);
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--spacing-small);
  }

  .structured-text__blue-text--center .structured-text__buttons-list {
    align-self: center;
  }

  .structured-text__image-with-caption {
    margin: var(--spacing-big) 0;
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
