<template>
  <section class="reach-out-block grid">
    <div
      class="reach-out-block__content"
      :class="{ 'reach-out-block__content--full-width': itemContentIsFullWidth }"
    >
      <contact-form
        v-if="isContactForm"
        :contact-person="data.contactPerson ?? undefined"
        :title="data.title || $t('lets_discuss')"
      >
        <app-button
          v-for="(cta, index) in ctas"
          :key="index"
          :label="cta.label"
          :to="cta.to"
          :external="cta.external"
          :primary="cta.style === 'primary'"
          :secondary="cta.style === 'secondary'"
        />
      </contact-form>

      <div
        v-else-if="isNewsletterForm"
        class="reach-out-block__text"
      >
        <h2
          v-if="data.title"
          class="reach-out-block__heading h3"
        >
          {{ data.title }}
        </h2>

        <div
          v-if="data.body"
          class="rich-text body-big list reach-out-block__body"
          v-html="data.body"
        />

        <div
          v-if="ctas.length"
          class="reach-out-block__ctas"
        >
          <app-button
            v-for="(cta, index) in ctas"
            :key="index"
            :label="cta.label"
            :to="cta.to"
            :external="cta.external"
            :primary="cta.style === 'primary'"
            :secondary="cta.style === 'secondary'"
          />
        </div>

        <newsletter-form />
      </div>

      <div
        v-else-if="isPersonLayout"
        class="reach-out-block__person"
      >
        <div class="reach-out-block__image">
          <dato-image
            :src="data.contactPerson!.image.url"
            alt=""
            :width="200"
            :height="200"
            loading="eager"
            :quality="75"
          />
        </div>
        <div>
          <h2
            v-if="data.title"
            class="reach-out-block__title h4"
          >
            {{ data.title }}
          </h2>
          <div
            v-if="data.body"
            class="reach-out-block__body body-big"
            v-html="data.body"
          />
          <div
            v-if="ctas.length"
            class="reach-out-block__ctas"
          >
            <app-button
              v-for="(cta, index) in ctas"
              :key="index"
              :label="cta.label"
              :to="cta.to"
              :external="cta.external"
              :primary="cta.style === 'primary'"
              :secondary="cta.style === 'secondary'"
            />
          </div>
        </div>
      </div>

      <div
        v-else
        class="reach-out-block__text"
      >
        <h2
          v-if="data.title"
          class="reach-out-block__heading h3"
        >
          {{ data.title }}
        </h2>

        <div
          v-if="data.body"
          class="rich-text body-big list reach-out-block__body"
          v-html="data.body"
        />

        <div
          v-if="ctas.length"
          class="reach-out-block__ctas"
        >
          <app-button
            v-for="(cta, index) in ctas"
            :key="index"
            :label="cta.label"
            :to="cta.to"
            :external="cta.external"
            :primary="cta.style === 'primary'"
            :secondary="cta.style === 'secondary'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ReachOutBlockFragment } from "./ReachOutBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import type { LinkToRecordFragment } from "~/components/Core/LinkToRecord/LinkToRecord.query";

const props = defineProps<{
  data: FragmentOf<typeof ReachOutBlockFragment>;
}>();

const data = readFragment<typeof ReachOutBlockFragment>(props.data);

const isContactForm = computed(() => data.formType === "contact");
const isNewsletterForm = computed(() => data.formType === "newsletter");
const isPersonLayout = computed(() => data.formType === "none" && !!data.contactPerson);
const itemContentIsFullWidth = computed(() => isContactForm.value || isNewsletterForm.value);

type ReachOutCta = {
  label: string;
  to: string | object;
  external: boolean;
  style: string | null;
};

const ctas = computed((): ReachOutCta[] => {
  const resolved: ReachOutCta[] = [];

  for (const cta of data.cta ?? []) {
    const link = readFragment<typeof LinkToRecordFragment>(cta);

    if (link.__typename === "ExternalLinkRecord") {
      resolved.push({
        label: link.title,
        to: link.url,
        external: true,
        style: link.style,
      });
      continue;
    }

    if (link.__typename === "InternalLinkRecord") {
      resolved.push({
        label: link.title,
        to: useDatoNuxtRoute(link.link) ?? "/",
        external: false,
        style: link.style,
      });
    }
  }

  return resolved;
});
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

  .reach-out-block__person .reach-out-block__body > p > a {
    background: transparent linear-gradient(to top, transparent 1px, var(--html-blue) 1px, var(--html-blue) 2px, transparent 2px);
    color: var(--html-blue);
    padding-bottom: .15rem;
  }

  .reach-out-block__person .reach-out-block__body > p > a:hover {
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
