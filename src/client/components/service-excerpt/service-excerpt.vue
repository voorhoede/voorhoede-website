<template>
  <article class="service-excerpt">
    <div class="service-excerpt__content">
      <h3 class="service-excerpt__title h5">{{ tagline }}</h3>
      <h4 class="service-excerpt__sub-title h3">{{ title }}</h4>
      <div class="service-excerpt__divider"/>
      <ul class="list">
        <li v-for="line in summary" :key="line.title">
          {{ line.title }}
        </li>
      </ul>
    </div>
    <AppButton
      secondary
      :label="cta"
      :to="{
        name: 'locale-services-slug',
        params: { slug },
      }"
    />
  </article>
</template>

<script>
import { AppButton } from '~/components'

export default {
  components: { AppButton },
  props: {
    tagline: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: Array,
      required: true,
      validator(summary) {
        return summary.every(line => 'title' in line)
      }
    },
    slug: {
      type: String,
      required: true,
    },
    cta: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.service-excerpt {
  position: relative;
}

.service-excerpt__title {
  margin-bottom: var(--spacing-medium);
  padding-top: .125rem; /* 2px */
  padding-left: var(--spacing-smaller);
  background-color: var(--brand-yellow);
}

.service-excerpt__sub-title {
  margin-bottom: var(--spacing-small);
}

.service-excerpt__divider {
  margin-bottom: var(--spacing-small);
  width: var(--spacing-medium);
  height: 2px;
  background-color: var(--html-blue);
}

.service-excerpt .app-button {
  margin-top: var(--spacing-small);
  margin-left: var(--spacing-small);
}

.service-excerpt .app-button::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@media (min-width: 720px) {
  .service-excerpt__title {
    padding-top: .25rem; /* 4px */
    padding-bottom: .125rem; /* 2px */
  }

  .service-excerpt__divider {
    margin-bottom: var(--spacing-medium);
    width: var(--spacing-large);
  }

  .service-excerpt .app-button {
    margin-top: var(--spacing-large);
    margin-left: 0;
  }
}

@media (min-width: 1100px) {
  .service-excerpt__title {
    padding-top: .375em; /* 6px */
    padding-bottom: .25rem; /* 4px */
  }
}
</style>
