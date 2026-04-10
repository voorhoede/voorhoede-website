<template>
  <div class="grouping-block" v-for="item in items">
    <div v-for="section in item.sections">
      <text-image-block
        v-if="section.__typename === 'SectionTextImageRecord'"
        :text="section.text"
        :layout="section.layout"
        :image="section.image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: unknown;
}>();
console.log(props);
</script>
