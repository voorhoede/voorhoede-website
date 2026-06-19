<template>
  <div class="cta-block">
    <CtaImageBlock
      v-if="data.person"
      :key="data.id"
      :title="data.title"
      :body="data.body"
      :link-label="data.linkLabel"
      :link-url="data.linkUrl"
      :link-is-external="data.linkIsExternal"
      :secondary-link-label="data.secondaryLinkLabel"
      :secondary-link-url="data.secondaryLinkUrl"
      :secondary-link-is-external="data.secondaryLinkIsExternal"
      :person-image="data.person.image"
      :person-name="data.person.name"
    />

    <BlockquoteBlock
      v-else
      :key="'else' + data.id"
      :title="data.title"
      :body="data.body"
      :link-label="data.linkLabel"
      :link-url="data.linkUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { type CtaBlockFragment } from "./CtaBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import CtaImageBlock from "~/components/cta-image-block/cta-image-block.vue";
import BlockquoteBlock from "~/components/blockquote-block/blockquote-block.vue";

const props = defineProps<{
  data: FragmentOf<typeof CtaBlockFragment>;
}>();

const data = readFragment<typeof CtaBlockFragment>(props.data);
</script>

<style scoped>
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
