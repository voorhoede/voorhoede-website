<template>
  <div class="highlighted-clients">
    <ul class="highlighted-clients__list">
      <li
        v-for="{ image } in clients"
        :key="image.alt"
        class="highlighted-clients__client"
      >
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
import FixedRatio from '../fixed-ratio'
import LazyLoad from '../lazy-load'

export default {
  components: {
    FixedRatio,
    LazyLoad,
  },
  data() {
    return {
      clients: [
        { image: { url: '/client-logos/pathe-thuis.svg', alt: 'Pathé Thuis' } },
        { image: { url: '/client-logos/geldmaat.svg', alt: 'Geldmaat' } },
        { image: { url: '/client-logos/qutech.svg', alt: 'QuTech' } },
        { image: { url: '/client-logos/deltares.svg', alt: 'Deltares' } },
        { image: { url: '/client-logos/heineken.svg', alt: 'Heineken' } },
        { image: { url: '/client-logos/tu-delft.svg', alt: 'TU Delft' } },
        { image: { url: '/client-logos/funda.svg', alt: 'Funda' } },
        { image: { url: '/client-logos/unilever.svg', alt: 'Unilever' } },
        { image: { url: '/client-logos/abn-amro.svg', alt: 'ABN AMRO' } },
        { image: { url: '/client-logos/hotelspecials.svg', alt: 'HotelSpecials' } },
        { image: { url: '/client-logos/philips.svg', alt: 'Philips' } },
        { image: { url: '/client-logos/ziggo.svg', alt: 'Ziggo' } },
        { image: { url: '/client-logos/sita.svg', alt: 'Sita' } },
        { image: { url: '/client-logos/trouw.svg', alt: 'Trouw' } },
        { image: { url: '/client-logos/hva.svg', alt: 'Hogeschool van Amsterdam' } },
      ]
    }
  },
}
</script>

<style>
  :root {
    --highlighted-clients-columns: 2;

    /* Columns should be devided over the full width and have a bit of spacing between them. */
    --highlighted-clients-width: calc(
      (100% / var(--highlighted-clients-columns))
      - (var(--highlighted-clients-columns) - 1) / var(--highlighted-clients-columns) * var(--spacing-tiny)
    );
  }

  .highlighted-clients__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .highlighted-clients__client {
    margin-bottom: var(--spacing-medium);
    width: var(--highlighted-clients-width);
  }

  .highlighted-clients .lazy-load {
    width: 100%;
    height: 100%;
  }

  .highlighted-clients__image {
    width: 100%;
  }

  @media (min-width: 720px) {
    :root {
      --highlighted-clients-width: 150px;
    }
  }

  @media (min-width: 1100px) {
    :root {
      --highlighted-clients-width: 210px;
    }
  }

  @supports (display: grid) {
    .highlighted-clients__list {
      display: grid;
      grid-template-columns: repeat(var(--highlighted-clients-columns), var(--highlighted-clients-width));
      grid-row-gap: var(--spacing-medium);
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
