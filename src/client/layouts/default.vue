<template>
  <div id="top">
    <div class="layout-default">
      <nav :aria-label="data.menu.title">
        <app-header
          :links="data.menu.links"
          :call-to-action="data.menu.callToAction"
          :inert="focusTrapMobileMenu"
        />
        <app-mobile-menu
          :links="[].concat(data.menu.links, data.menu.callToAction)"
          @toggle-mobile-menu="mobileMenuIsOpen = !mobileMenuIsOpen"
        />
      </nav>
      <div :inert="focusTrapMobileMenu">
        <slot />
        <app-footer
          :app="data.app"
          :links="[].concat(data.menu.links, data.menu.callToAction)"
          :footer="data.footer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import query from './default.query.graphql?raw';

  const mobileMenuIsOpen = ref(false);
  const focusTrapMobileMenu = computed(() => mobileMenuIsOpen.value ? true : null);
  const { params } = useRoute();

  const { data } = await useFetchContent({
    key: `DefaultLayout${params.language}`,
    query,
    variables: {
      locale: params.language,
    },
  });
</script>

<style>
  .layout-default {
    position: relative;
  }
</style>
