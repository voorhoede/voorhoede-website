<template>
  <ul class="highlighted-clients">
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
</template>

<script>
import { FixedRatio } from '~/components'

export default {
  components: { FixedRatio },
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
  },
}
</script>

<style>
.highlighted-clients {
  display: flex;
  flex-wrap: wrap;
}

.highlighted-clients__image {
  height: 100%;
}

.highlighted-clients__client {
  margin-top: calc(var(--spacing-medium) / 2);
  margin-bottom: calc(var(--spacing-medium) / 2);
  filter: grayscale(100%);
  background: var(--very-dim);
}

@media screen and (max-width: 719px) {
  .highlighted-clients__client {
    margin-left: calc(var(--spacing-tiny) / 2);
    margin-right: calc(var(--spacing-tiny) / 2);
    width: calc(50% - var(--spacing-medium) / 2);
  }

  .highlighted-clients__client:nth-child(2n - 1) {
    margin-left: 0;
  }

  .highlighted-clients__client:nth-child(2n) {
    margin-right: 0;
  }
}


@media screen and (min-width: 720px) {
  .highlighted-clients__client {
    margin-left: calc(var(--spacing-big) / 2);
    margin-right: calc(var(--spacing-big) / 2);  width: calc(25% - var(--spacing-big) * 3 / 4);
  }

  .highlighted-clients__client:nth-child(4n - 3) {
    margin-left: 0;
  }

  .highlighted-clients__client:nth-child(4n) {
    margin-right: 0;
  }
}
</style>
