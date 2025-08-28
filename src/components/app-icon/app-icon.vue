<template>
  <svg :class="['app-icon', `app-icon--${props.size}`]" :aria-label="alt">
    <use :href="`/icon-sprite.svg#${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  alt?: string;
  size?: "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  size: "medium",
});
</script>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease-in-out;
}

.app-icon--medium {
  width: 1rem;
  height: 1rem;
}

.app-icon--large {
  width: 1.5rem;
  height: 1.5rem;
}

.app-icon:hover {
  transform: scale(1.05);
}
</style>
