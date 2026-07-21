<template>
  <section class="reach-out-block grid">
    <div
      class="reach-out-block__content"
      :class="{ 'reach-out-block__content--full-width': itemContentIsFullWidth }"
    >
      <ContactForm
        v-if="isContactForm"
        :contact-person="data.contactPerson ?? undefined"
        :title="data.title || $t('lets_discuss')"
      />
      <div
        v-else
        class="reach-out-block__text"
      >
        <h2
          v-if="data.title && !isNewsletterForm"
          class="reach-out-block__heading h3"
        >
          {{ data.title }}
        </h2>

        <div
          v-if="data.body"
          class="rich-text body-big list reach-out-block__body"
          v-html="data.body"
        />

        <LinkToRecord
          v-if="data.cta[0]"
          :link="data.cta[0]"
        />

        <NewsletterForm
          v-if="isNewsletterForm"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ReachOutBlockFragment } from "./ReachOutBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import LinkToRecord from "~/components/Core/LinkToRecord/LinkToRecord.vue";
import ContactForm from "~/components/contact-form/contact-form.vue";
import NewsletterForm from "~/components/newsletter-form/newsletter-form.vue";

const props = defineProps<{
  data: FragmentOf<typeof ReachOutBlockFragment>;
}>();

const data = readFragment<typeof ReachOutBlockFragment>(props.data);

const isContactForm = computed(() => data.formType === "contact");
const isNewsletterForm = computed(() => data.formType === "newsletter");
const itemContentIsFullWidth = computed(() => isContactForm.value || isNewsletterForm.value);
</script>

<style>
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
