<template>
  <article class="service-excerpt">
    <div class="service-excerpt__content">
      <h3 class="service-excerpt__title h5">{{ title }}</h3>
      <h4 class="service-excerpt__sub-title h3">{{ subtitle }}</h4>
      <div class="service-excerpt__divider"/>
      <ul class="service-excerpt__characteristics-list">
        <li
          v-for="characteristic in characteristics"
          :key="characteristic"
          class="service-excerpt__characteristic body"
        >{{ characteristic }}</li>
      </ul>
    </div>
    <AppButton
      secondary
      label="Learn more"
      :to="href"
    />
  </article>
</template>

<script>
import { AppButton } from '~/components'

export default {
  components: { AppButton },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    characteristics: {
      type: Array,
      required: true,
      validator(characteristics) {
        return characteristics.every(characteristic => typeof characteristic === 'string')
      },
    },
    href: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.service-excerpt__title {
  margin-bottom: var(--spacing-medium);
  padding-left: var(--spacing-smaller);
  position: relative;
}

/* Putting the background on the title itself will make it a bit off aligned */
.service-excerpt__title::before {
  content: '';
  display: block;
  position: absolute;
  top: -1px;
  right: 0;
  bottom: 2px;
  left: 0;
  background: var(--brand-yellow);
  z-index: -1;
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

.service-excerpt__characteristics-list {
  list-style-type: disc;
  margin-left: var(--spacing-medium);
}

.service-excerpt .app-button {
  margin-top: var(--spacing-small);
  margin-left: var(--spacing-medium);
}

@media screen and (min-width: 720px) {
  .service-excerpt__divider {
    width: var(--spacing-large);
  }

  .service-excerpt .app-button {
    margin-top: var(--spacing-large);
  }
}
</style>
