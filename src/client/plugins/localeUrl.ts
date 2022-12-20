export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      localeUrl: ({ name = '', params = {} } = {}) => {
        return {
          name: ['language', name].filter(Boolean).join('-'),
          params: {
            language: nuxtApp._route.params.language || 'en',
            ...params,
          },
        };
      },
    },
  };
});
