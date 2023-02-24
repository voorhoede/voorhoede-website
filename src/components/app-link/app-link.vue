<script setup>
  import { withTrailingSlash } from 'ufo';

  const props = defineProps({
    to: {
      type: [String, Object],
      required: true,
    },
  });
  const router = useRouter();

  const normalizedTo = computed(() => withTrailingSlash(
    typeof props.to === 'object' ? router.resolve(props.to).path : props.to
  ));
</script>

<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>
