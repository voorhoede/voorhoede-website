<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  const route = useRoute();

  useHead({
    htmlAttrs: {
      'lang': route.params.language,
    },
    link: [
      { rel: 'icon', href: '/images/voorhoede-logo.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/images/voorhoede-favicon.png', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/images/voorhoede-apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
    meta: [
      { name: 'theme-color', content: '#ffe400' },
      { name: 'google-site-verification', content: 'wHLlpqy0uqVHxgo_Qlx40XID0ts7owLv1P7IWwtyzU8' },
    ],
  });
</script>
