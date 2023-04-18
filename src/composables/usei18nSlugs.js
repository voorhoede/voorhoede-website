export async function useI18nSlugs() {
    const route = useRoute()

    const { data } = await useAsyncData(`${route.name}-${route.params.slug}-i18n-slugs`, async () => {
        const i18nRouteConfig = (await import('../../.cache/i18n-slugs.json')).default
        const i18nSlugs = i18nRouteConfig.find((i18nRoute) => i18nRoute.route === route.name)

        if (!i18nSlugs) {
            return null
        }

        return i18nSlugs.slugs.find(localeConfig => localeConfig.find(({ locale, value }) => value === route.params.slug && locale === route.params.language))
    })

    return data
}
