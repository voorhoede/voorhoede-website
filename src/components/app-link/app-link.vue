<script setup>
  import { withTrailingSlash } from 'ufo';

  const props = defineProps(['to']);
  const router = useRouter();

  const normalizedTo = withTrailingSlash(
    typeof props.to === 'object' ? router.resolve(props.to).path : props.to
  );
</script>

<template>
 	<nuxt-link :to="normalizedTo">
 	 	<slot />
 	</nuxt-link>
</template>
