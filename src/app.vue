<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig();

  useHead({
    htmlAttrs: {
      'lang': route.params.language,
    },
    link: [
      { rel: 'icon', href: '/images/voorhoede-logo.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/images/voorhoede-favicon.png', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/images/voorhoede-apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'alternate',
        title: 'Blog',
        type: 'application/feed+json',
        href: new URL('/blog/feed.json', config.public.baseUrl).toString(),
      },
    ],
    meta: [
      { name: 'theme-color', content: '#ffe400' },
      { name: 'google-site-verification', content: 'wHLlpqy0uqVHxgo_Qlx40XID0ts7owLv1P7IWwtyzU8' },
    ],
  });

  onMounted(async () => {
    const { onINP } = await import('web-vitals/attribution');

    onINP((data) => {
      console.log(data.navigationType)
      sendInpMetrics({ route, data })
    }, { reportAllChanges: true });
  });

  router.afterEach(async (to) => {
    const { onINP } = await import('web-vitals/attribution');

    try {
      onINP((data) => {
        console.log(data.navigationType)
        sendInpMetrics({ route: to, data });
      }, { reportAllChanges: true });
    } catch (error) {
      console.error('Error sending performance metrics: ', error);
    }
  });

  function sendInpMetrics({ route, data }) {
    let isMobile;

    if ('userAgentData' in navigator) {
      isMobile = navigator.userAgentData.mobile;
    } else {
      isMobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const loaf = data.attribution.longAnimationFrameEntries[-1]
    const longestAnimationFrame = loaf?.scripts.sort((a, b) => b.duration - a.duration)[0]

    if (longestAnimationFrame) {
      console.log('longestAnimationFrame', longestAnimationFrame)
    }

    const body = {
      page: route.fullPath,
      date: new Date().toISOString(),
      version: config.version,
      userAgent: navigator.userAgent,
      isMobile,
      name: data.name,
      value: data.value,
      rating: data.rating,
      interactionTarget: data.attribution.interactionTarget,
      interactionType: data.attribution.interactionType,
      processingDuration: data.attribution.processingDuration,
      inputDelay: data.attribution.inputDelay,
      presentationDelay: data.attribution.presentationDelay,
    }

    console.log('INP metrics', body);

    if ('sendBeacon' in navigator) {
      // navigator.sendBeacon('/web-vitals', JSON.stringify(body));
    }
  }
</script>
