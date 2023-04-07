<script setup>
  import { withTrailingSlash } from 'ufo';

  const props = defineProps({
    to: {
      type: [String, Object],
      required: true,
    },
  });
  const router = useRouter();

  const normalizedPath = withTrailingSlash(
    typeof props.to === 'object' ? router.resolve(props.to).path : props.to
  );

  const normalizedTo = computed(() =>
    typeof props.to === "object"
      ? {
          ...props.to,
          path: normalizedPath,
        }
      : normalizedPath
  );
</script>

<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>
