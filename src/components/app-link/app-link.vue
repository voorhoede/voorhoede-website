<script setup>
  import { withTrailingSlash } from 'ufo';

  const props = defineProps({
    to: {
      type: [String, Object],
      required: true,
    },
  });
  const router = useRouter();

  const resolvedRoute = computed(() => router.resolve(props.to));
  const normalizedPath = computed(() =>  withTrailingSlash(
    typeof props.to === 'object' ? resolvedRoute.value.path : props.to
  ));
  const normalizedTo = computed(() =>
    typeof props.to === "object"
      ? {
          ...resolvedRoute.value,
          path: normalizedPath.value,
        }
      : normalizedPath.value
  );
</script>

<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>
