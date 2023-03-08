// these route are static and will not need any further processing
const staticRoutesConfig = [
    '/',
    '/blog/',
    '/services/',
    '/contact/',
    '/cases/',
    '/jobs/',
    '/work-at/',
    '/lustrum/',
    '/events/',
    '/faq/'
]

// these routes are generated dynamically by fetching all slugs for each page type
// the slugs are appended to the value of the 'baseRoute' property
const dynamicRoutesConfig = [
    {
        modelName: 'CustomPages',
        path: '/'
    },
    {
        modelName: 'Services',
        path: '/services/'
    },
    {
        modelName: 'BlogPosts',
        path: '/blog/'
    },
    {
        modelName: 'CaseItems',
        path: '/cases/'
    },
    {
        modelName: 'People',
        path: '/people/'
    },
    {
        modelName: 'EventItems',
        path: '/events/'
    }
]

// fetches data from DatoCMS using the GraphQL API
const fetchDatoQuery = async ({ query, variables = {} }) => {
    return fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': process.env.DATO_API_TOKEN,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    }).then(res => res.json())
        .then(({ data, errors }) => {
            if (errors) {
                console.log(errors)
            }

            return data
        })
}

// fetches a paginated list of slugs for a given model
const fetchPaginatedSlugsForModel = async ({ model, locale, skip }) => {
    return fetchDatoQuery({
        query: `
                query ${model}($skip: IntType, $locale: SiteLocale) {
                    all${model}(first: 100, skip: $skip, locale: $locale) {
                        slug
                    }
                }
            `,
        variables: {
            locale,
            skip
        }
    }).then(data => data[`all${model}`])
}

// fetches the total number of items for a given model
const fetchMetaForModel = async ({ model, locale }) => {
    return fetchDatoQuery({
        query: `
            query Meta ($locale: SiteLocale) {
                _all${model}Meta(locale: $locale) {
                    count
                }
            }
        `,
        variables: {
            locale
        }
    })
}

// fetches all slugs for model
const fetchSlugsForModel = async ({ model, locale }) => {
    const meta = await fetchMetaForModel({ model, locale })
    const { count } = meta[`_all${model}Meta`]
    const pages = Math.ceil(count / 100)

    return Promise.all(
        [...Array(pages)].map((_, index) => fetchPaginatedSlugsForModel({ model, locale, skip: index * 100 }))
    ).then(data => data.flat().map(data => data.slug))
}

// fetches all routes for a given locale
const fetchDynamicRoutes = async ({ locale, dynamicRoutesConfig }) => {
    return Promise.all(dynamicRoutesConfig.map(async ({ modelName, path }) => {
        const slugs = await fetchSlugsForModel({ model: modelName, locale })

        return slugs.map(slug => `/${locale}${path}${slug}/`)
    })).then(data => data.flat())
}

/**
 * Fetches all slugs that should be prerendered
 * 
 * @returns {Promise<Array<string>>} - an array of routes 
 */
export const fetchRoutes = async () => (
    Promise.all(['en', 'nl'].map(async (locale) => {
        const dynamicRoutes = await fetchDynamicRoutes({ locale, dynamicRoutesConfig })

        return [
            ...staticRoutesConfig.map(route => `/${locale}${route}`),
            ...dynamicRoutes
        ]
    })).then(data => data.flat())
)
