<template>
  <div
    class="structured-text"
    :class="{
      'structured-text--center-grid': gridAlignment === 'center',
    }"
  >
    <template v-for="(child, index) in props.content.value.document.children">
      <p
        v-if="child.type === 'paragraph'"
        :key="index"
        class="body-big"
      >
        <template v-for="(paragraphChild, paragraphIndex) in child.children">
          <template v-if="paragraphChild.type === 'span'">
            <strong
              v-if="paragraphChild.marks?.includes('strong')"
              :key="`${paragraphIndex}-strong`"
              :class="{
                'font-italic': paragraphChild.marks?.includes('emphasis'),
              }"
            >
              {{ paragraphChild.value }}
            </strong>
            <em
              v-else-if="paragraphChild.marks?.includes('emphasis')"
              :key="`${paragraphIndex}-em`"
            >
              {{ paragraphChild.value }}
            </em>
            <span
              v-else
              :key="paragraphIndex"
            >
              {{ paragraphChild.value }}
            </span>
          </template>
          <template v-else-if="paragraphChild.type === 'link'">
            <a
              :key="paragraphIndex"
              :href="paragraphChild.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ paragraphChild.children[0].value }}
            </a>
          </template>
        </template>
      </p>

      <component
        :is="`h${child.type}`"
        v-else-if="child.type === 'heading'"
        :key="`${index}-h${child.level}`"
        :class="`h${child.level}`"
      >
        {{ child.children[0].value }}
      </component>

      <structured-text-block
        v-else-if="child.type === 'block' && getBlock(child.item)?.__typename === 'StructuredTextBlueTextRecord'"
        :key="`${index}-blue-text`"
        :content="getBlock(child.item).body"
        class="structured-text__blue-text"
      />

      <div
        v-else-if="child.type === 'block' && getBlock(child.item)?.__typename === 'StructuredTextCtaListRecord'"
        class="structured-text__cta-list"
        :key="`${index}-cta-list`"
      >
        <app-button
          v-for="(cta, ctaIndex) in getBlock(child.item).ctas.map((cta) => ({
            label: cta.title,
            to: cta.url || cta.link,
            external: cta.__typename === 'ExternalLinkRecord',
          }))"
          :key="ctaIndex"
          :label="cta.label"
          :to="cta.to"
          :external="cta.external"
        />
      </div>

      <ul
        v-else-if="child.type === 'block' && getBlock(child.item)?.__typename === 'StructuredTextHighlightedListRecord'"
        class="structured-text__highlighted-list"
        :key="`${index}-highlighted-list`"
      >
        <li
          v-for="(listItem, listItemIndex) in getBlock(child.item).items"
          :key="listItemIndex"
          class="structured-text__highlighted-list-item"
        >
          <structured-text-block :content="listItem.body" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      default: null
    },
    gridAlignment: {
      type: String,
      default: 'left'
    },
  });

  function getBlock(blockId) {
    return props.content.blocks.find((block) => block.id === blockId);
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
