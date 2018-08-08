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
      <app-button :label="ctaLabel" :to="ctaLink"/>
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
  --highlighted-clients-columns: 2;
  --highlighted-clients-width: calc((100% / var(--highlighted-clients-columns)) - (var(--spacing-tiny) / var(--highlighted-clients-columns)));
}

.highlighted-clients__list {
  margin-bottom: var(--spacing-large);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.highlighted-clients__client {
  margin-bottom: var(--spacing-medium);
  width: var(--highlighted-clients-width);
}

.highlighted-clients__image {
  height: 100%;
}

@media (min-width: 720px) {
  :root {
    --highlighted-clients-width: 150px;
  }

  .highlighted-clients__list {
    margin-bottom: var(--spacing-larger);
  }

  .highlighted-clients__call-to-action {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1100px) {
  :root {
    --highlighted-clients-width: 210px;
  }

  .highlighted-clients__list {
    margin-bottom: var(--spacing-big);
  }
}

@supports (display: grid) {
  .highlighted-clients__list {
    display: grid;
    grid-template-columns: repeat(var(--highlighted-clients-columns), var(--highlighted-clients-width));
    row-gap: var(--spacing-medium);
  }

  .highlighted-clients__client {
    margin-bottom: 0;
    width: auto;
  }

  @media (min-width: 720px) {
    :root {
      --highlighted-clients-columns: 4;
    }
  }
}
</style>
