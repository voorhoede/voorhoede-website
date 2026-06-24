<template>
  <StructuredTextDatocms :data="props.data" :render-block="renderBlock" />
</template>

<script setup lang="ts">
import {
  StructuredText as StructuredTextDatocms,
  type RenderBlockContext,
} from "vue-datocms";
import {
  type CdaStructuredTextValue,
  type CdaStructuredTextRecord,
} from "datocms-structured-text-utils";
import { type FragmentOf } from "~/utils/graphql";
import { type LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";

const props = defineProps<{
  data: CdaStructuredTextValue;
}>();

function renderBlock({
  record,
}: RenderBlockContext<
  FragmentOf<typeof LinkToRecordFragment> & CdaStructuredTextRecord
>) {
  switch (record.__typename) {
    case "ExternalLinkRecord":
    case "InternalLinkRecord": {
      return h(LinkToRecord, {
        link: record,
      });
    }
    default:
      return null;
  }
}
</script>
