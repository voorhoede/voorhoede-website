<template>
  <div class="highlighted-clients">
    <ul class="highlighted-clients__list">
      <li
        v-for="{ icon } in clients"
        :key="icon.alt"
        class="highlighted-clients__client"
      >
        <fixed-ratio :width="5" :height="2">
          <lazy-load>
            <app-icon :name="icon.name" :alt="icon.alt"/>
          </lazy-load>
        </fixed-ratio>
      </li>
    </ul>
  </div>
</template>

<script>
import AppIcon from '../app-icon'
import FixedRatio from '../fixed-ratio'
import LazyLoad from '../lazy-load'

export default {
  components: {
    AppIcon,
    FixedRatio,
    LazyLoad,
  },
  data() {
    return {
      clients: [
        { icon: { name: 'client-logos/pathe-thuis', alt: 'Pathé Thuis' } },
        { icon: { name: 'client-logos/geldmaat', alt: 'Geldmaat' } },
        { icon: { name: 'client-logos/qutech', alt: 'QuTech' } },
        { icon: { name: 'client-logos/deltares', alt: 'Deltares' } },
        { icon: { name: 'client-logos/heineken', alt: 'Heineken' } },
        { icon: { name: 'client-logos/tu-delft', alt: 'TU Delft' } },
        { icon: { name: 'client-logos/funda', alt: 'Funda' } },
        { icon: { name: 'client-logos/npo', alt: 'NPO' } },
        { icon: { name: 'client-logos/unilever', alt: 'Unilever' } },
        { icon: { name: 'client-logos/abn-amro', alt: 'ABN AMRO' } },
        { icon: { name: 'client-logos/hotelspecials', alt: 'HotelSpecials' } },
        { icon: { name: 'client-logos/philips', alt: 'Philips' } },
        { icon: { name: 'client-logos/ziggo', alt: 'Ziggo' } },
        { icon: { name: 'client-logos/sita', alt: 'Sita' } },
        { icon: { name: 'client-logos/trouw', alt: 'Trouw' } },
        { icon: { name: 'client-logos/hva', alt: 'Hogeschool van Amsterdam' } },
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

  .highlighted-clients .app-icon {
    width: 100%;
    height: 100%;
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
