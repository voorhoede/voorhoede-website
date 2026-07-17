<template>
  <NewsletterForm />
</template>

<script setup lang="ts">
import NewsletterForm from "~/components/newsletter-form/newsletter-form.vue";
import type { NewsletterBlockFragment } from "./NewsletterBlock.query";
import type { FragmentOf } from "~/utils/graphql";

// The form takes no props; backgroundColor is read by the Blocks wrapper.
defineProps<{
  data: FragmentOf<typeof NewsletterBlockFragment>;
}>();
</script>
