<template>
  <div class="cta-block">
  <CallToActionImageBlock
    v-if="person"
    :key="data.id"
    :title="data.title ?? undefined"
    :body="data.body ?? undefined"
    :link-label="data.linkLabel ?? undefined"
    :link-url="data.linkUrl ?? undefined"
    :link-is-external="data.linkIsExternal"
    :secondary-link-label="data.secondaryLinkLabel ?? undefined"
    :secondary-link-url="data.secondaryLinkUrl ?? undefined"
    :secondary-link-is-external="data.secondaryLinkIsExternal"
    :person-image="person.image"
    :person-name="person.name"
  />

  <BlockquoteBlock
    v-else
    :key="'else' + data.id"
    :title="data.title ?? undefined"
    :body="data.body ?? undefined"
    :link-label="data.linkLabel ?? undefined"
    :link-url="data.linkUrl ?? undefined"
  />
  </div>
</template>

<script setup lang="ts">
import CallToActionImageBlock from "./CallToActionImageBlock.vue";
import BlockquoteBlock from "~/components/blockquote-block/blockquote-block.vue";
import type { CallToActionBlockFragment } from "./CallToActionBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof CallToActionBlockFragment>;
}>();

const data = readFragment<typeof CallToActionBlockFragment>(props.data);
const person = computed(() => data.person);
</script>

<style>
.cta-block {
  margin-left: var(--spacing-small);
  margin-right: var(--spacing-small);
}
@media (min-width: 768px) {
  .cta-block {
    width: fit-content;
  }
}
</style>
