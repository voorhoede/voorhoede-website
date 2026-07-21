<template>
  <ImageWithTextBlock
    :title="data.title"
    :body="data.body"
    :image="data.image"
    :inverse="data.imagePosition === 'right'"
    :background-color="data.backgroundColor"
    :paragraph-variant="data.fontSize === 'small' ? 'body' : 'body-big'"
  />
</template>

<script setup lang="ts">
import { type FragmentOf, readFragment } from "~/utils/graphql";
import { SectionImageTextRecordFragment } from "./SectionImageTextRecord.query";
import ImageWithTextBlock from "~/components/image-with-text-block/image-with-text-block.vue";

const props = defineProps<{
  data: FragmentOf<typeof SectionImageTextRecordFragment>;
}>();

const data = readFragment(SectionImageTextRecordFragment, props.data);
</script>
