<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to: string | RouteLocationRaw
}>()

const isExternal = computed(
  () => typeof props.to === 'string' && /^(https?:|tel:|mailto:)/.test(props.to),
)

// Two root branches (v-if/v-else) disable automatic attribute fallthrough,
// so class/listeners are bound explicitly via `$attrs` on each branch.
defineOptions({ inheritAttrs: false })

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: 'append' })

function trackExternalLink() {
  if (typeof props.to === 'string' && props.to.startsWith('tel:')) {
    useTrackEvent('Click on phone number')
  }
}
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="$attrs"
    :href="(to as string)"
    target="_blank"
    rel="noopener noreferrer"
    @click="trackExternalLink"
  >
    <slot />
  </a>
  <LinkWithTrailingSlash
    v-else
    v-bind="$attrs"
    :to="to"
  >
    <slot />
  </LinkWithTrailingSlash>
</template>
