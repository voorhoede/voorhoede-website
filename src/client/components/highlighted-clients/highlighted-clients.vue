<template>
  <section
    class="highlighted-clients grid"
    :class="{'highlighted-clients--light' : light}">
    <div class="highlighted-clients__content">
      <h2 class="highlighted-clients__title h3 font-normal">{{ title }}</h2>

      <ul class="highlighted-clients__list">
        <li
          v-for="{ icon } in clients"
          :key="icon.alt"
          class="highlighted-clients__client"
        >
          <fixed-ratio :width="5" :height="2">
            <vue-lazy-load>
              <app-icon :name="icon.name" :aria-label="icon.alt"/>
            </vue-lazy-load>
          </fixed-ratio>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import VueLazyLoad from '@voorhoede/vue-lazy-load'
export default {
  components: {
    VueLazyLoad,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clients: [
        { icon: { name: 'client-logos/abn-amro', alt: 'ABN AMRO' } },
        { icon: { name: 'client-logos/brainbay', alt: 'Brainbay' } },
        { icon: { name: 'client-logos/chargepoint', alt: 'ChargPoint' } },
        { icon: { name: 'client-logos/deltares', alt: 'Deltares' } },
        { icon: { name: 'client-logos/geldmaat', alt: 'Geldmaat' } },
        { icon: { name: 'client-logos/heineken', alt: 'Heineken' } },
        { icon: { name: 'client-logos/hva', alt: 'Hogeschool van Amsterdam' } },
        { icon: { name: 'client-logos/life-terra', alt: 'Life Terra' } },
        { icon: { name: 'client-logos/ns', alt: 'NS' } },
        { icon: { name: 'client-logos/pathe-thuis', alt: 'Pathé Thuis' } },
        { icon: { name: 'client-logos/postnl', alt: 'PostNL' } },
        { icon: { name: 'client-logos/qutech', alt: 'QuTech' } },
        { icon: { name: 'client-logos/sita', alt: 'Sita' } },
        { icon: { name: 'client-logos/startmail', alt: 'Start Mail' } },
        { icon: { name: 'client-logos/tech-me-up', alt: 'TechMeUp' } },
        { icon: { name: 'client-logos/tu-delft', alt: 'TU Delft' } },
      ]
    }
  },
}
</script>

<style>
  .vue-lazy-load {
    height: 100%;
  }

  :root {
    --highlighted-clients-columns: 2;

    /* Columns should be devided over the full width and have a bit of spacing between them. */
    --highlighted-clients-width: calc(
      (100% / var(--highlighted-clients-columns))
      - (var(--highlighted-clients-columns) - 1) / var(--highlighted-clients-columns) * var(--spacing-tiny)
    );
  }

  .highlighted-clients {
    margin-bottom: var(--spacing-larger);
    padding-top: var(--spacing-larger);
    padding-bottom: var(--spacing-larger);
    background-color: var(--fog);
    grid-template-rows: repeat(2, auto);
  }

  .highlighted-clients.highlighted-clients--light {
    background-color: var(--white);
  }

  .highlighted-clients__title {
    margin-bottom: var(--spacing-large);
    text-align: center;
    color: var(--dim);
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

    .highlighted-clients {
      margin-bottom: var(--spacing-bigger);
      padding-top: var(--spacing-larger);
    }

    .highlighted-clients__title {
      margin-bottom: var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    :root {
      --highlighted-clients-width: 210px;
    }

    .highlighted-clients {
      margin-bottom: var(--spacing-huge);
      padding-top: var(--spacing-big);
    }

    .highlighted-clients__title {
      margin-bottom: var(--spacing-big);
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

    @media (min-width: 1100px) {
      .highlighted-clients__content {
        grid-column-start: 4;
        grid-column-end: 47;
      }
    }
  }
</style>
