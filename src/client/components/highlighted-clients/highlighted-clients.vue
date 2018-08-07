<template>
  <div class="highlighted-clients">
    <ul class="highlighted-clients__list">
      <li
        v-for="({ name, logoSrc }) in clients"
        :key="logoSrc"
        class="highlighted-clients__client"
      >
        <fixed-ratio :width="5" :height="2">
          <img class="highlighted-clients__image" :src="logoSrc" :alt="name">
        </fixed-ratio>
      </li>
    </ul>
    <div class="highlighted-clients__call-to-action">
      <app-button
        primary
        :label="ctaLabel"
        :to="ctaLink"
      />
    </div>
  </div>
</template>

<script>
import { AppButton, FixedRatio } from '~/components'

export default {
  components: { AppButton, FixedRatio },
  props: {
    clients: {
      type: Array,
      required: true,
      validator(clients) {
        return clients.length === 12 && clients.every(client => (
          typeof client === 'object'
          && 'name' in client
          && 'logoSrc' in client
        ))
      },
    },
    ctaLabel: {
      type: String,
      required: true,
    },
    ctaLink: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
:root {
  --highlighted-clients-gap: calc(var(--spacing-tiny) / 2);
  --highlighted-clients-width: calc(100% / 2 - var(--highlighted-clients-gap));
}

.highlighted-clients__list {
  margin-bottom: var(--spacing-medium);
  display: flex;
  flex-wrap: wrap;
}

.highlighted-clients__image {
  height: 100%;
}

.highlighted-clients__client {
  margin-bottom: var(--spacing-medium);
  margin-right: var(--highlighted-clients-gap);
  margin-left: var(--highlighted-clients-gap);
  width: var(--highlighted-clients-width);
  filter: grayscale(100%);
}

@media (max-width: 719px) {
  .highlighted-clients__client:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }

  .highlighted-clients__client:nth-child(2n - 1) {
    margin-left: 0;
  }

  .highlighted-clients__client:nth-child(2n) {
    margin-right: 0;
  }
}

@media (min-width: 720px) {
  :root {
    --highlighted-clients-gap: calc(var(--spacing-big) / 2);
    --highlighted-clients-width: calc(25% - var(--highlighted-clients-gap) * 2 * 3 / 4);
  }

  .highlighted-clients__client:nth-last-child(-n + 4) {
    margin-bottom: 0;
  }

  .highlighted-clients__client:nth-child(4n - 3) {
    margin-left: 0;
  }

  .highlighted-clients__client:nth-child(4n) {
    margin-right: 0;
  }

  .highlighted-clients__call-to-action {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1100px) {
  :root {
    --highlighted-clients-gap: calc(var(--spacing-bigger) / 2);
  }
}
</style>
