<template>
  <LinkWithTrailingSlash
    :class="{
      body: Boolean(variant),
      'app-link--underline': variant === 'underline',
    }"
  >
    <span
      v-if="variant === 'underline'"
      class="app-link__icon"
    >
      <slot />
    </span>
    <template v-else>
      <slot />
    </template>
  </LinkWithTrailingSlash>
</template>

<script lang="ts" setup>
const LinkWithTrailingSlash = defineNuxtLink({
  trailingSlash: 'append',
});

defineProps<{
  variant?: 'underline';
}>();
</script>

<style>
.app-link--underline {
  display: inline-block;
  color: var(--html-blue);
  line-height: 1.18;
}

.app-link--underline::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--html-blue);
  transition: transform 0.15s ease-in-out;
  transform-origin: 0% 50%;
}

.app-link--underline:hover::after,
.app-link--underline:focus::after,
.app-link--underline:active::after {
  transform: scaleX(0);
  transform-origin: 100% 50%;
}

.app-link__icon::after {
  content: '→';
  content: '→' / '';
  margin-left: var(--spacing-tiny);
  vertical-align: text-top;
}
</style>
