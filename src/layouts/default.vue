<template>
  <div id="top">
    <div class="layout-default">
      <div tabindex="-1" ref="skipLink" />
      <a
        href="#content"
        class="skip-link app-button app-button--small body font-bold"
        :inert="focusTrapMobileMenu"
      >
        <span>{{ $t('skip_link') }}</span>
      </a>
      <nav :aria-label="data.menu.title">
        <app-header
          :links="data.menu.links"
          :call-to-action="data.menu.callToAction"
          :inert="focusTrapMobileMenu"
        />
        <app-mobile-menu
          :links="[].concat(data.menu.links, data.menu.callToAction)"
          :isOpen="mobileMenuIsOpen"
          @open-menu="mobileMenuIsOpen = true"
          @close-menu="mobileMenuIsOpen = false"
        />
      </nav>
      <div id="content" :inert="focusTrapMobileMenu" class="layout-default__content">
        <slot />
        <app-footer
          class="layout-default__footer"
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
  const { afterEach } = useRouter();
  const skipLink = ref(null);
  const mobileMenuIsOpen = ref(false);
  const focusTrapMobileMenu = computed(() => mobileMenuIsOpen.value ? true : null);

  afterEach((from, to) => {
    mobileMenuIsOpen.value = false;

    if (from.path !== to.path) {
      skipLink.value.focus();
    }
  });

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
    min-height: 100vh;
    background-color: var(--brand-yellow);
  }

  .layout-default__content {
    background-color: var(--white);
  }
</style>
