<script setup>
  const LinkWithTrailingSlash = defineNuxtLink({
    trailingSlash: 'append'
  })
</script>

<template>
  <LinkWithTrailingSlash>
    <slot />
  </LinkWithTrailingSlash>
</template>
