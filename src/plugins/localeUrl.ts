export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      localeUrl: ({ name = '', params = {}, ...other } = {}) => {
        return {
          name: ['language', name].filter(Boolean).join('-'),
          params: {
            language: nuxtApp.$i18n.locale(),
            ...params,
          },
          ...other
        };
      },
    },
  };
});
