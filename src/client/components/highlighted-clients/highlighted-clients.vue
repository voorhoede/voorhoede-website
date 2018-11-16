<template>
  <div class="highlighted-clients">
    <ul class="highlighted-clients__list">
      <li
        v-for="{ image } in clients"
        :key="image.alt"
        class="highlighted-clients__client"
      >
        <no-script>
          <img :src="image.url" :alt="image.alt" class="highlighted-clients__image">
        </no-script>
        <fixed-ratio :width="5" :height="2">
          <lazy-load>
            <img :src="image.url" :alt="image.alt">
          </lazy-load>
        </fixed-ratio>
      </li>
    </ul>
  </div>
</template>

<script>
import { FixedRatio, LazyLoad, NoScript } from '~/components'

export default {
  components: {
    FixedRatio,
    LazyLoad,
    NoScript,
  },
  data() {
    return {
      clients: [
        { image: { url: '/client-logos/olx.svg', alt: 'OLX' } },
        { image: { url: '/client-logos/hyperloop.svg', alt: 'Delft Hyperloop' } },
        { image: { url: '/client-logos/funda.svg', alt: 'Funda' } },
        { image: { url: '/client-logos/npo.svg', alt: 'NPO' } },
        { image: { url: '/client-logos/abn-amro.svg', alt: 'ABN AMRO' } },
        { image: { url: '/client-logos/hotelspecials.svg', alt: 'HotelSpecials' } },
        { image: { url: '/client-logos/2dehands.svg', alt: '2dehands.be' } },
        { image: { url: '/client-logos/ziggo.svg', alt: 'Ziggo' } },
        { image: { url: '/client-logos/sita.svg', alt: 'Sita' } },
        { image: { url: '/client-logos/trouw.svg', alt: 'Trouw' } },
        { image: { url: '/client-logos/hva.svg', alt: 'Hogeschool van Amsterdam' } },
        { image: { url: '/client-logos/grandvision.svg', alt: 'GrandVision' } },
      ]
    }
  },
}
</script>

<style>
@import '../app-core/variables.css';

:root {
  --highlighted-clients-width-small: 1fr;
  --highlighted-clients-width-medium: 150px;
  --highlighted-clients-width-large: 210px;
}

.highlighted-clients__list {
  display: grid;
  grid-template-columns: repeat(2, var(--highlighted-clients-width-small));
  grid-row-gap: var(--spacing-medium);
  justify-content: space-between;
}

.highlighted-clients__client:nth-child(1),
.highlighted-clients__client:nth-child(2) {
  grid-row: 1;
}

.highlighted-clients__client:nth-child(3),
.highlighted-clients__client:nth-child(4) {
  grid-row: 2;
}

.highlighted-clients__client:nth-child(5),
.highlighted-clients__client:nth-child(6) {
  grid-row: 3;
}

.highlighted-clients__client:nth-child(7),
.highlighted-clients__client:nth-child(8) {
  grid-row: 4;
}

.highlighted-clients__client:nth-child(9),
.highlighted-clients__client:nth-child(10) {
  grid-row: 5;
}

.highlighted-clients__client:nth-child(11),
.highlighted-clients__client:nth-child(12) {
  grid-row: 6;
}

.highlighted-clients__client:nth-child(13),
.highlighted-clients__client:nth-child(14) {
  grid-row: 7;
}

.highlighted-clients__client:nth-child(15),
.highlighted-clients__client:nth-child(16) {
  grid-row: 8;
}

.highlighted-clients__client:nth-child(2n - 1) {
  grid-column: 1;
}

.highlighted-clients__client:nth-child(2n) {
  grid-column: 2;
}

.highlighted-clients .lazy-load {
  width: 100%;
  height: 100%;
}

.highlighted-clients__image {
  width: 100%;
}

@media (min-width: 720px) {
  .highlighted-clients__list {
    grid-template-columns: repeat(4, var(--highlighted-clients-width-medium));
  }

  .highlighted-clients__client:nth-child(1),
  .highlighted-clients__client:nth-child(2),
  .highlighted-clients__client:nth-child(3),
  .highlighted-clients__client:nth-child(4) {
    grid-row: 1;
  }

  .highlighted-clients__client:nth-child(5),
  .highlighted-clients__client:nth-child(6),
  .highlighted-clients__client:nth-child(7),
  .highlighted-clients__client:nth-child(8) {
    grid-row: 2;
  }

  .highlighted-clients__client:nth-child(9),
  .highlighted-clients__client:nth-child(10),
  .highlighted-clients__client:nth-child(11),
  .highlighted-clients__client:nth-child(12) {
    grid-row: 3;
  }

  .highlighted-clients__client:nth-child(13),
  .highlighted-clients__client:nth-child(14),
  .highlighted-clients__client:nth-child(15),
  .highlighted-clients__client:nth-child(16) {
    grid-row: 4;
  }

  .highlighted-clients__client:nth-child(4n - 3) {
    grid-column: 1;
  }

  .highlighted-clients__client:nth-child(4n - 2) {
    grid-column: 2;
  }

  .highlighted-clients__client:nth-child(4n - 1) {
    grid-column: 3;
  }

  .highlighted-clients__client:nth-child(4n) {
    grid-column: 4;
  }
}

@media (min-width: 1100px) {
  .highlighted-clients__list {
    grid-template-columns: repeat(4, var(--highlighted-clients-width-large));
  }
}
</style>
