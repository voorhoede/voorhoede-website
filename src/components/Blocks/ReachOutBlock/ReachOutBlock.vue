<template>
  <section class="reach-out-block block grid">
    <div
      class="reach-out-block__content"
      :class="{
        'reach-out-block__content--full-width': itemContentIsFullWidth,
      }"
    >
      <div
        v-if="structuredBody && isContactForm"
        class="reach-out-block__body body-big"
      >
        <StructuredText :data="structuredBody" />
      </div>
      <ContactForm
        v-if="isContactForm"
        :contact-person="data.contactPerson ?? undefined"
        :title="data.title || $t('lets_discuss')"
      >
        <ActionBlock v-if="data.cta" :data="data.cta" />
      </ContactForm>

      <NewsletterForm
        v-else-if="isNewsletterForm"
        :title="data.title || undefined"
      >
        <template v-if="structuredBody" #body>
          <StructuredText :data="structuredBody" />
        </template>
        <ActionBlock v-if="data.cta" :data="data.cta" />
      </NewsletterForm>

      <div v-else-if="isPersonLayout" class="reach-out-block__person">
        <div class="reach-out-block__image">
          <DatoImage
            :src="data.contactPerson!.image.url"
            alt=""
            :width="200"
            :height="200"
            loading="eager"
            :quality="75"
          />
        </div>
        <div>
          <h2 v-if="data.title" class="reach-out-block__title h4">
            {{ data.title }}
          </h2>
          <div
            v-if="structuredBody"
            class="reach-out-block__body body-big"
          >
            <StructuredText :data="structuredBody" />
          </div>
          <div v-if="data.cta" class="reach-out-block__ctas">
            <ActionBlock :data="data.cta" />
          </div>
        </div>
      </div>

      <div v-else class="reach-out-block__text">
        <h2 v-if="data.title" class="reach-out-block__heading h3">
          {{ data.title }}
        </h2>

        <div
          v-if="structuredBody"
          class="rich-text body-big list reach-out-block__body"
        >
          <StructuredText :data="structuredBody" />
        </div>

        <div v-if="data.cta" class="reach-out-block__ctas">
          <ActionBlock :data="data.cta" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ReachOutBlockFragment } from "./ReachOutBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { CdaStructuredTextValue } from "datocms-structured-text-utils";
import ActionBlock from "~/components/Blocks/ActionBlock/ActionBlock.vue";
import ContactForm from "~/components/contact-form/contact-form.vue";
import DatoImage from "~/components/Core/DatoImage/DatoImage.vue";
import NewsletterForm from "~/components/newsletter-form/newsletter-form.vue";
import StructuredText from "~/components/Core/StructuredText/StructuredText.vue";

const props = defineProps<{
  data: FragmentOf<typeof ReachOutBlockFragment>;
}>();

const data = readFragment<typeof ReachOutBlockFragment>(props.data);

const structuredBody = computed(() =>
  data.body
    ? (data.body as unknown as CdaStructuredTextValue)
    : null,
);

const isContactForm = computed(() => data.formType === "contact");
const isNewsletterForm = computed(() => data.formType === "newsletter");
const isPersonLayout = computed(
  () => data.formType === "none" && !!data.contactPerson,
);
const itemContentIsFullWidth = computed(
  () => isContactForm.value || isNewsletterForm.value,
);
</script>

<style>
.reach-out-block {
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

.reach-out-block__content > .reach-out-block__body {
  padding-inline: var(--grid-margin);
}

@media (min-width: 720px) {
  .reach-out-block__content > .reach-out-block__body {
    padding-inline: calc(2 * var(--grid-margin));
  }
}

@media (min-width: 1100px) {
  .reach-out-block__content > .reach-out-block__body {
    padding-inline: calc(3 * var(--grid-margin));
  }
}

.reach-out-block__person {
  display: flex;
  flex-direction: column;
  gap: clamp(var(--spacing-medium), 8%, var(--spacing-larger));
}

.reach-out-block__title {
  margin-bottom: var(--spacing-tiny);
}

.reach-out-block__image {
  width: 200px;
  height: 200px;
  align-self: center;
  overflow: hidden;
  border-radius: 50%;
}

.reach-out-block__image > * {
  object-fit: cover;
  object-position: top;
}

.reach-out-block__person .reach-out-block__body {
  margin-bottom: var(--spacing-small);
  max-width: 55ch;
}

.reach-out-block__person .reach-out-block__body a {
  background: transparent
    linear-gradient(
      to top,
      transparent 1px,
      var(--html-blue) 1px,
      var(--html-blue) 2px,
      transparent 2px
    );
  color: var(--html-blue);
  padding-bottom: 0.15rem;
}

.reach-out-block__person .reach-out-block__body a:hover {
  opacity: 0.8;
}

.reach-out-block__ctas {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-small);
}

@media (min-width: 600px) {
  .reach-out-block__person {
    flex-direction: row;
    align-items: center;
  }

  .reach-out-block__image {
    flex-shrink: 0;
  }
}

@media (min-width: 1000px) {
  .reach-out-block__person {
    grid-column-start: 8;
    grid-column-end: 47;
  }
}
</style>
