<script setup lang="ts">
import { type FragmentOf, readFragment } from '~/utils/graphql'
import { LinkFragment } from './AppLink.query'

const props = defineProps<{
  /** A CMS link record (InternalLinkRecord / ExternalLinkRecord). */
  link: FragmentOf<typeof LinkFragment>
}>()

const resolved = computed(() => {
  const link = readFragment(LinkFragment, props.link)

  if (link.__typename === 'ExternalLinkRecord') {
    return { to: link.url, external: true, label: link.title, style: link.style }
  }
  if (link.__typename === 'InternalLinkRecord') {
    return { to: useDatoNuxtRoute(link.link) ?? '/', external: false, label: link.title, style: link.style }
  }
  return { to: '/', external: false, label: '', style: null }
})

// The button variant is derived from the record's `style`.
const buttonClass = computed(() => [
  'app-button',
  'body',
  resolved.value.style === 'secondary' ? 'app-button--secondary' : 'app-button--primary font-bold',
])

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
    :class="buttonClass"
    :href="(resolved.to as string)"
    target="_blank"
    rel="noopener noreferrer"
    @click="trackExternalLink"
  >
    <span>{{ resolved.label }}</span>
  </a>
  <LinkWithTrailingSlash
    v-else
    v-bind="$attrs"
    :class="buttonClass"
    :to="resolved.to"
  >
    <span>{{ resolved.label }}</span>
  </LinkWithTrailingSlash>
</template>

<style>
.app-button--secondary > span::after {
  content: '\00a0\2192';
}
</style>
