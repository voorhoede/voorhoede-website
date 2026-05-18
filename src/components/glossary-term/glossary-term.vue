<template>
  <button
    type="button"
    class="glossary-term__toggle"
    :aria-expanded="isOpen"
    :aria-controls="contentId"
    @click="isOpen = !isOpen"
  >
    <span class="glossary-term__label"><slot /></span>
    <span class="glossary-term__icon" aria-hidden="true">&#9662;</span>
  </button>
  <rich-text-block
    v-show="isOpen"
    :id="contentId"
    class="glossary-term__definition"
    :text="definition"
  />
</template>

<script setup>
import { ref, useId } from "vue";

defineProps({
  definition: { type: String, required: true },
});

const isOpen = ref(false);
const contentId = useId();
</script>

<style>
.glossary-term__toggle {
  background: transparent;
  border: 0;
  color: var(--html-blue);
  cursor: pointer;
  display: inline;
  font: inherit;
  padding: 0;
  text-align: left;
}

.glossary-term__label {
  background: transparent
    linear-gradient(
      to top,
      transparent 1px,
      var(--html-blue) 1px,
      var(--html-blue) 2px,
      transparent 2px
    );
  padding-bottom: 0.15rem;
}

.glossary-term__toggle:hover,
.glossary-term__toggle:focus-visible {
  color: var(--active-blue);
}

.glossary-term__toggle:hover .glossary-term__label,
.glossary-term__toggle:focus-visible .glossary-term__label {
  background: transparent
    linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
}

.glossary-term__icon {
  display: inline-block;
  font-size: 1.2em;
  line-height: 0.5;
  margin-left: 0.25em;
  transition: transform 0.15s ease;
  vertical-align: middle;
}

.glossary-term__toggle[aria-expanded="true"] .glossary-term__icon {
  transform: rotate(180deg);
}

.glossary-term__definition {
  border-left: 2px solid var(--html-blue);
  margin: var(--spacing-tiny) 0 var(--spacing-small);
  padding: var(--spacing-tiny) var(--spacing-small);
}
</style>
