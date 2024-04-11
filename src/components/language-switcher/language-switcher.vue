<template>
  <div class="language-switcher">
    <template
      :key="code"
      v-for="{ code, name } in $i18n.locales"
    >
      <span
        class="language-switcher__language language-switcher__language--highlighted"
        v-if="code === $i18n.locale()"
        aria-hidden="true"
      >
        {{ code }}
      </span>
      <div
        v-else
        class="language-switcher__language"
      >
        <app-link
          external
          :aria-label="$t('switch_to__language_', { language: name }, code)"
          :lang="code"
          :to="getLocaleRoute(code)"
          @click="saveLocale(code)"
        >
          {{ code }}
        </app-link>
      </div>
    </template>
  </div>
</template>

<script setup>
const i18nSlugs = await useI18nSlugs();
const route = useRoute();

const getLocaleRoute = (code) => {
  const isDynamicRoute = Boolean(i18nSlugs.value)
  const isTranslationSlugAvailable = Boolean(i18nSlugs.value?.filter((i18nSlug) => i18nSlug.locale === code).length);

  const localeSlug = i18nSlugs.value?.find((i18nSlug) => i18nSlug.locale === code);
  const routeName = (isDynamicRoute && !isTranslationSlugAvailable) ? 'language' : route.name;

  return {
    name: routeName,
    params: {
      ...route.params,
      language: code,
      slug: localeSlug?.value || route.params.slug,
    },
  }
}

const saveLocale = (code) => {
  const cookie = document.cookie;
  const langKey = "nf_lang"; // @See https://www.netlify.com/docs/redirects/#geoip-and-language-based-redirects
  if (cookie.match(new RegExp(langKey) !== null)) {
    document.cookie = cookie.replace(
      new RegExp(`${langKey}=[A-Za-z-]+;`),
      `${langKey}=${code};`
    );
  } else {
    document.cookie = `${langKey}=${code}; path=/; ${cookie}`;
  }
};
</script>

<style>
  .language-switcher {
    align-items: center;
    display: flex;
    text-transform: uppercase;
    gap: var(--spacing-tiny);
    margin-left: var(--spacing-tiny);
  }

  .language-switcher__language {
    color: var(--html-blue);
    font-family: var(--font-sans);
  }

  .language-switcher__language--highlighted {
    font-weight: 700;
  }

  .language-switcher__language + .language-switcher__language::before {
    content: '|';
    color: var(--html-blue);
    font-weight: 400;
    margin-right: var(--spacing-tiny);
  }

</style>
