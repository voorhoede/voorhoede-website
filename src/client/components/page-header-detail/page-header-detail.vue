<template>
  <header class="page-header grid" :class="{ 'page-header--brick' : hasBrick }">
    <div class="container">
      <div class="page-header__text">
        <h1 class="page-header__title" :class="hasBrick ? 'hero' : 'h1'">{{ title }}</h1>
        <span class="page-header__subtitle sub-title">{{ subTitle }}</span>
      </div>

      <div v-if="hasImage" class="page-header__image">
        <slot name="image"/>
      </div>
    </div>
  </header>
</template>

<script>
  import { ScrollTo } from '~/components'

  export default {
    components: {
      ScrollTo,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: true,
      },
      hasBrick: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      hasImage() {
        return 'image' in this.$slots
      },
    },
  }
</script>

<style scoped>
  .page-header {
    grid-column: page;
    background-color: var(--bg-pastel);
  }

  .container {
    grid-column: content;
    display: flex;
    position: relative;
    justify-content: space-between;
  }

  .page-header__text {
    display: flex;
    flex-direction: column;
    padding-top: calc(var(--app-header-height) + var(--spacing-medium));
    padding-bottom: var(--spacing-large);
  }

  .page-header__title {
    order: 2;
  }

  .page-header__subtitle {
    order: 1;
    margin-bottom: var(--spacing-smaller);
  }

  .page-header__image {
    display: none;
  }

  .page-header__image img {
    width: auto;
    max-height: 60%;
  }

  .page-header--brick {
    grid-column: page;
    background-image: linear-gradient(
      to bottom,
      var(--bg-pastel),
      var(--bg-pastel) 50%,
      var(--brand-yellow) 50%,
      var(--brand-yellow) 90%
    );
  }

  .page-header--brick .container {
    flex-direction: column;
  }

  .page-header--brick .page-header__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: var(--spacing-medium);
    max-width: 100%;
    height: 40vh;
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: var(--spacing-large);
      width: 20%;
    }

    .page-header--brick .page-header__image {
      justify-content: center;
      width: 100%;
    }
  }

  @media screen and (min-width: 720px) {
    .container {
      flex-direction: row;
    }

    .page-header__text {
      width: 45%;
    }

    .page-header--brick {
      height: 76.5vh;
      background-image: linear-gradient(
        to right,
        var(--bg-pastel),
        var(--bg-pastel) 50%,
        var(--brand-yellow) 50%,
        var(--brand-yellow) 100%
      );
    }

    .page-header--brick .page-header__image {
      align-self: flex-end;
      justify-content: flex-end;
      margin-top: auto;
      padding-bottom: var(--spacing-large);
      width: 70%;
      height: auto;
    }

    .page-header--brick .page-header__image img {
      max-height: 100%;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header--brick .container {
      flex-direction: row;
    }
  }
</style>
