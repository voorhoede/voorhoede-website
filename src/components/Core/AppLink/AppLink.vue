<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { type FragmentOf, readFragment } from '~/utils/graphql'
import { LinkFragment } from './AppLink.query'

const props = defineProps<{
  /** A CMS link record (InternalLinkRecord / ExternalLinkRecord). */
  link: FragmentOf<typeof LinkFragment>
}>()

// Resolve the destination and external-ness from the record's `__typename`.
const resolved = computed<{ to: string | RouteLocationRaw; external: boolean }>(() => {
  const link = readFragment(LinkFragment, props.link)

  if (link.__typename === 'ExternalLinkRecord') {
    return { to: link.url, external: true }
  }
  if (link.__typename === 'InternalLinkRecord') {
    return { to: useDatoNuxtRoute(link.link) ?? '/', external: false }
  }
  return { to: '/', external: false }
})

// Two root branches (v-if/v-else) disable automatic attribute fallthrough,
// so class/listeners are bound explicitly via `$attrs` on each branch.
defineOptions({ inheritAttrs: false })

const LinkWithTrailingSlash = defineNuxtLink({ trailingSlash: 'append' })

function trackExternalLink() {
  if (typeof resolved.value.to === 'string' && resolved.value.to.startsWith('tel:')) {
    useTrackEvent('Click on phone number')
  }
}
</script>

<template>
  <a
    v-if="resolved.external"
    v-bind="$attrs"
    :href="(resolved.to as string)"
    target="_blank"
    rel="noopener noreferrer"
    @click="trackExternalLink"
  >
    <slot />
  </a>
  <LinkWithTrailingSlash
    v-else
    v-bind="$attrs"
    :to="resolved.to"
  >
    <slot />
  </LinkWithTrailingSlash>
</template>
