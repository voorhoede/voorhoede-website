<template>
  <article class="service-excerpt">
    <div class="service-excerpt__content">
      <h3 class="service-excerpt__title h5">{{ tagline }}</h3>
      <h4 class="service-excerpt__sub-title h3">{{ title }}</h4>
      <div class="service-excerpt__divider"/>
      <ul class="service-excerpt__characteristics-list">
        <li
          v-for="line in teaser.split('\n')"
          :key="line"
          class="service-excerpt__characteristic body"
        >{{ line }}</li>
      </ul>
    </div>
    <AppButton
      secondary
      label="Learn more"
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
    teaser: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
:root {
  --service-excerpt-bullet-size: 2px;
}

.service-excerpt__title {
  margin-bottom: var(--spacing-medium);
  padding-top: .125rem; /* 2px */
  padding-left: var(--spacing-smaller);
  background: var(--brand-yellow);
}

.service-excerpt__sub-title {
  margin-bottom: var(--spacing-small);
}

.service-excerpt__divider {
  margin-bottom: var(--spacing-small);
  width: var(--spacing-medium);
  height: 2px;
  background: var(--html-blue);
}

.service-excerpt__characteristic {
  padding-left: var(--spacing-small);
}

.service-excerpt__characteristic + .service-excerpt__characteristic {
  margin-top: var(--spacing-smaller);
}

.service-excerpt__characteristic::before {
  content: '';
  display: inline-block;
  background: var(--black);
  background: currentColor;
  height: var(--service-excerpt-bullet-size);
  width: var(--service-excerpt-bullet-size);
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  left: calc(-1 * var(--spacing-small));
}

.service-excerpt .app-button {
  margin-top: var(--spacing-small);
  margin-left: var(--spacing-small);
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
