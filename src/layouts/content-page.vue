<template>
  <div id="top">
    <div class="layout-content-page">
      <div
        tabindex="-1"
        ref="skipLink"
      />
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
          :call-to-action="data.menu.callToActions[0]"
          :inert="focusTrapMobileMenu"
        />
        <app-mobile-menu
          :links="[].concat(data.menu.links, data.menu.callToActions[0])"
          :is-open="mobileMenuIsOpen"
          @open-menu="openMenu"
          @close-menu="closeMenu"
        />
      </nav>
      <div
        id="content"
        :inert="focusTrapMobileMenu"
        class="layout-content-page__content"
      >
        <slot />
        <app-footer
          v-if="!hideFooter"
          class="layout-content-page__footer"
          :app="data.app"
          :footer="data.footer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import query from './content-page.query.graphql?raw';

  const { $i18n } = useNuxtApp();
  const { afterEach } = useRouter();
  const skipLink = ref(null);
  const mobileMenuIsOpen = ref(false);
  const focusTrapMobileMenu = computed(() => mobileMenuIsOpen.value ? true : null);

  defineProps({
    hideFooter: {
      type: Boolean,
      default: false,
    },
  });

  afterEach((from, to) => {
    closeMenu()

    if (from.path !== to.path) {
      skipLink.value.focus();
    }
  });

  const { data } = await useFetchContent({
    key: `DefaultLayout${$i18n.locale()}`,
    query,
    variables: {
      locale: $i18n.locale(),
    },
  });

  function openMenu() {
    mobileMenuIsOpen.value = true;
    document.body.classList.add("scroll-lock")
  }

  function closeMenu() {
    mobileMenuIsOpen.value = false;
    document.body.classList.remove("scroll-lock")
  }
</script>

<style>
  .layout-content-page {
    position: relative;
    min-height: 100vh;
    background-color: var(--brand-yellow);
  }

  .layout-content-page__content {
    background-color: var(--white);
  }
</style>
