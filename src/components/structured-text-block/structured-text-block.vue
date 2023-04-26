<template>
  <div
    class="structured-text"
    :class="{
      'structured-text--center-grid': gridAlignment === 'center',
      'structured-text--center-text': textAlignment === 'center',
      'structured-text--blue-text': textColor === 'blue'
    }"
  >
    <template v-for="(child, index) in props.value.document.children">
      <p
        v-if="child.type === 'paragraph'"
        :key="index"
        :class="bodySize === 'regular' ? 'body' : `body-${bodySize}`"
      >
        <template v-for="(paragraphChild, paragraphIndex) in child.children">
          <template v-if="paragraphChild.type === 'span'">
            <strong
              v-if="paragraphChild.marks?.includes('strong')"
              :key="`${paragraphIndex}-strong`"
            >
              {{ paragraphChild.value }}
            </strong>
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
      <h2
        v-else-if="child.type === 'heading' && child.level === 2"
        :key="`${index}-h2`"
        class="h2"
      >
        {{ child.children[0].value }}
      </h2>
      <h3
        v-else-if="child.type === 'heading' && child.level === 3"
        :key="`${index}-h3`"
        class="h3"
      >
        {{ child.children[0].value }}
      </h3>
      <h4
        v-else-if="child.type === 'heading' && child.level === 4"
        :key="`${index}-h4`"
        class="h4"
      >
        {{ child.children[0].value }}
      </h4>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    value: {
      type: Object,
      default: null
    },
    gridAlignment: {
      type: String,
      default: 'left'
    },
    textAlignment: {
      type: String,
      default: 'left'
    },
    textColor: {
      type: String,
      default: 'default'
    },
    bodySize: {
      type: String,
      default: 'regular'
    },
  });
</script>

<style>
  .structured-text {
    grid-column: var(--grid-content);
    word-wrap: break-word;
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

  .structured-text--center-text {
    text-align: center;
  }

  .structured-text--blue-text {
    color: var(--html-blue);
  }

  .structured-text p:not(:last-child) {
    margin-bottom: var(--spacing-medium);
  }

  .structured-text a {
    color: var(--html-blue);
    padding-bottom: .15rem;
    background: transparent linear-gradient(to top, transparent 1px, var(--html-blue) 1px, var(--html-blue) 2px, transparent 2px);
  }

  .structured-text a:hover,
  .structured-text a:focus {
    color: var(--active-blue);
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
  }
</style>
