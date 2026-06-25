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
import type { ImageTextBlockFragment } from "./ImageTextBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof ImageTextBlockFragment>;
}>();

const data = readFragment<typeof ImageTextBlockFragment>(props.data);
</script>
