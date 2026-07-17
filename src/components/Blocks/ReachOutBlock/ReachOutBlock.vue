<template>
  <section class="reach-out-block grid">
    <div
      class="reach-out-block__content"
      :class="{
        'reach-out-block__content--full-width': itemContentIsFullWidth,
      }"
    >
      <ContactForm
        v-if="isContactForm"
        :contact-person="data.pivot.contactPerson ?? undefined"
        :title="data.pivot.title || $t('lets_discuss')"
      />
      <div v-else class="reach-out-block__text">
        <h2
          v-if="data.pivot.title && !isNewsletterForm"
          class="reach-out-block__heading h3"
        >
          {{ data.pivot.title }}
        </h2>

        <RichTextBlock
          v-if="data.pivot.body"
          :text="data.pivot.body"
          :large-text="true"
          class="reach-out-block__body"
        />

        <AppButton
          v-if="data.pivot.links[0]?.__typename === 'ExternalLinkRecord'"
          @click="trackLink(data.pivot.links[0].url)"
          :label="data.pivot.links[0].title"
          :to="data.pivot.links[0].url"
          external
        />

        <AppButton
          v-else-if="data.pivot.links[0]?.__typename === 'InternalLinkRecord'"
          :label="data.pivot.links[0].title"
          :to="useDatoNuxtRoute(data.pivot.links[0].link)"
        />

        <NewsletterForm v-if="isNewsletterForm" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ContactForm from "~/components/contact-form/contact-form.vue";
import RichTextBlock from "~/components/rich-text-block/rich-text-block.vue";
import AppButton from "~/components/app-button/app-button.vue";
import NewsletterForm from "~/components/newsletter-form/newsletter-form.vue";
import type { ReachOutBlockFragment } from "./ReachOutBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof ReachOutBlockFragment>;
}>();

const data = readFragment<typeof ReachOutBlockFragment>(props.data);

const isContactForm = computed(() => data.pivot.formType === "contact");
const isNewsletterForm = computed(() => data.pivot.formType === "newsletter");
const itemContentIsFullWidth = computed(
  () => isContactForm.value || isNewsletterForm.value,
);

function trackLink(href: string) {
  useTrackEvent("Click on Schedule Meeting", { props: { url: href } });
}
</script>

<style scoped>
.reach-out-block {
  background-color: var(--bg-pastel);
  position: relative;
  grid-column: var(--grid-page);
}

.reach-out-block__content--full-width {
  grid-column: var(--grid-page);
}

.reach-out-block__content {
  padding-top: var(--spacing-large);
  padding-bottom: var(--spacing-big);
}

.reach-out-block .newsletter-form {
  padding: 0;
}

.reach-out-block__text {
  text-align: center;
}

.reach-out-block__heading {
  margin-bottom: var(--spacing-medium);
}

.reach-out-block__body {
  margin-top: 0;
  margin-bottom: var(--spacing-large);
}
</style>
